import React, { useEffect, useState } from "react";
import "./adminCategories.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";
import api from "../../utils/api";
import { useTranslation } from "react-i18next";

const ProductsPage = () => {
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    dimensions: "",
    colors: "",
    photos: [],
    categoryId: ""
  });
  const [editId, setEditId] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
      if (res.data.length > 0 && !selectedCategory) {
        setSelectedCategory(res.data[0]._id);
        setForm((prev) => ({ ...prev, categoryId: res.data[0]._id }));
      }
    } catch (err) {
      toast.error(t("error_loading_categories"));
    }
  };

  const fetchProducts = async () => {
    if (selectedCategory) {
      try {
        const res = await api.get(`/products/category/${selectedCategory}`);
        setProducts(res.data);
      } catch (err) {
        toast.error(t("error_loading_products"));
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setForm({ ...form, categoryId: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photos") {
      setForm({ ...form, photos: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      toast.error(t("select_category_first"));
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("dimensions", form.dimensions);
    formData.append("category", selectedCategory);
    form.colors.split(",").forEach((color) => formData.append("colors", color.trim()));
    for (let i = 0; i < form.photos.length; i++) {
      formData.append("photos", form.photos[i]);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (editId) {
        await api.put(`/products/${editId}`, formData, config);
        toast.success(t("product_updated"));
      } else {
        await api.post("/products", formData, config);
        toast.success(t("product_added"));
      }
      setForm({
        name: "",
        description: "",
        price: "",
        dimensions: "",
        colors: "",
        photos: [],
        categoryId: selectedCategory,
      });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      toast.error(t("error_generic") + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price || "",
      dimensions: product.dimensions || "",
      colors: product.colors?.join(", ") || "",
      photos: [],
      categoryId: selectedCategory,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(t("product_deleted"));
      fetchProducts();
    } catch (err) {
      toast.error(t("error_deleting_product"));
    }
  };

  return (
    <div className="admin-categories">
      <ToastContainer />
      <h2>{t("manage_products")}</h2>

      <div className="form-section">
        <div className="category-selector">
          <label>{t("select_category")} : </label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          <span style={{ marginTop: "20px" }}>{t("product_name")}:</span>
          <input
            type="text"
            name="name"
            placeholder={t("product_name")}
            value={form.name}
            onChange={handleChange}
            required
          />
          <span style={{ marginTop: "20px" }}>{t("description")}:</span>
          <textarea
            name="description"
            placeholder={t("description")}
            value={form.description}
            onChange={handleChange}
            style={{ minHeight: "100px", width: "100%", maxHeight: "200px", resize: "none" }}
          />
          <span style={{ marginTop: "20px" }}>{t("price")}:</span>
          <input
            type="number"
            name="price"
            placeholder={t("price")}
            value={form.price}
            onChange={handleChange}
          />
          <span style={{ marginTop: "20px" }}>{t("dimensions")}:</span>
          <input
            type="text"
            name="dimensions"
            placeholder={t("dimensions")}
            value={form.dimensions}
            onChange={handleChange}
          />
          <span style={{ marginTop: "20px" }}>{t("colors")}:</span>
          <input
            type="text"
            name="colors"
            placeholder={t("colors_placeholder")}
            value={form.colors}
            onChange={handleChange}
          />
          <span style={{ marginTop: "20px" }}>{t("images")}:</span>
          <input
            type="file"
            name="photos"
            multiple
            accept="image/*"
            onChange={handleChange}
          />
          <button type="submit">
            {editId ? t("edit_product") : t("add_product")}
          </button>
        </form>
      </div>

      <div className="categories-list">
        {products.map((product) => (
          <div key={product._id} className="category-card">
            <strong>{product.name}</strong>
            <div className="image-grid">
              {product.photos.map((p, i) => (
                <img
                  key={i}
                  src={`${process.env.UPLOADS}/uploads/${p}`}
                  alt={product.name}
                  onClick={() => {
                    setLightboxImage(`${process.env.UPLOADS}/uploads/${p}`);
                    setLightboxOpen(true);
                  }}
                />
              ))}
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(product)}>✏️ {t("edit")}</button>
              <button onClick={() => handleDelete(product._id)}>🗑️ {t("delete")}</button>
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          mainSrc={lightboxImage}
          onCloseRequest={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
