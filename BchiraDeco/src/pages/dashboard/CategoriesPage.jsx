import React, { useEffect, useState } from "react";
import "./adminCategories.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";
import api from "../../utils/api";
import { useTranslation } from "react-i18next";

const CategoriesPage = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", photos: [] });
  const [editId, setEditId] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "photos") {
      setForm({ ...form, photos: e.target.files });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
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
        await api.put(`/categories/${editId}`, formData, config);
        toast.success(t("categories.successUpdate"));
      } else {
        await api.post("/categories", formData, config);
        toast.success(t("categories.successAdd"));
      }

      setForm({ name: "", photos: [] });
      setEditId(null);
      fetchCategories();
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      toast.error(t("categories.errorGeneral", { message }));
    }
  };

  const handleEdit = (category) => {
    setEditId(category._id);
    setForm({ name: category.name, photos: [] });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(t("categories.successDelete"));
      fetchCategories();
    } catch (err) {
      toast.error(t("categories.errorDelete"));
    }
  };

  return (
    <div className="admin-categories">
      <ToastContainer />
      <h2>{t("categories.manage")}</h2>

      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={t("categories.namePlaceholder")}
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="photos"
            multiple
            accept="image/*"
            onChange={handleChange}
          />
          <button type="submit">
            {editId ? t("categories.edit") : t("categories.add")}
          </button>
        </form>
      </div>

      <div className="categories-list">
        {categories.map((cat) => (
          <div key={cat._id} className="category-card">
            <strong>{cat.name}</strong>
            <div className="image-grid">
              {cat.photos.map((p, i) => (
                <img
                  key={i}
                  src={`${process.env.UPLOADS}/uploads/${p}`}
                  alt={cat.name}
                  onClick={() => {
                    setLightboxImage(`${process.env.UPLOADS}/uploads/${p}`);
                    setLightboxOpen(true);
                  }}
                />
              ))}
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(cat)}>✏️ {t("categories.edit")}</button>
              <button onClick={() => handleDelete(cat._id)}>🗑️ {t("categories.delete")}</button>
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

export default CategoriesPage;
