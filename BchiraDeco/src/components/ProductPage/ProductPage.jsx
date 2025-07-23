import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./productPage.scss";
import api from "../../utils/api";
import { useTranslation } from "react-i18next";

const ProductPage = () => {
  const { categoryId } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { t } = useTranslation();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);

        if (categoryId) {
          const found = res.data.find((cat) => cat._id === categoryId);
          setSelectedCategory(found || null);
        } else {
          setSelectedCategory(null);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
        setSelectedCategory(null);
      }
    };
    fetchCategories();
  }, [categoryId]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryId) return;
      try {
        const res = await api.get(`/products/category/${categoryId}`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [categoryId]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart", { withCredentials: true });
        setCartCount(res.data.items.length || 0);
      } catch (err) {
        console.error("Error loading cart:", err);
        setCartCount(0);
      }
    };
    fetchCart();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await api.post(
        "/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        { withCredentials: true }
      );

      setCartCount((prev) => prev + 1);

      toast.success(t("cart.productAdded"), {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(t("cart.errorAdd"));
    }
  };

  return (
    <div className="shop-page">
      <ToastContainer />
      <header className="hero-section">
        <img src="/images/hero.jpg" alt="hero background" className="hero-img" />

        <Link to="/" className="back-home">
          ← {t("navigation.backHome")}
        </Link>

        <Link to="/order" className="cart-icon">
          <FaCartPlus className="shiny-cart" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        <div className="hero-text">
          {selectedCategory && (
            <h2 className="category-title">{selectedCategory.name}</h2>
          )}
          <button className="cta-button">{t("hero.button")}</button>
        </div>
      </header>

      <section className="sets-section">
        <div className="sets-header">
          <p>{t("sets.title")}</p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image">
                <img
                  src={`${process.env.REACT_APP_UPLOADS}/uploads/${product.photos[0]}`}
                  alt={product.name}
                />
              </div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <p className="price">
                  {product.price?.toFixed(2)} {t("currency.dt")}
                </p>
                <p className="price">
                  {product.dimensions} {t("units.cm")}
                </p>
                <p className="price">{product.colors}</p>
                <p className="description">{product.description}</p>
              </div>
              <div className="product-footer">
                <button
                  onClick={() => handleAddToCart(product)}
                  title={t("product.addToCart")}
                  className="add-to-cart-button"
                >
                  <FaCartPlus /> {t("product.addToCart")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
