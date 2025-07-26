
import React, { useContext, useEffect, useState } from "react";
import { cardActions, cardStore } from "../../context/CardContext";
import ProductBox from "../parts/productBox/ProductBox";
import "./order.scss";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import { AnimatePresence, motion } from "framer-motion";
import Transition2 from "../transition/Transtion2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import api from "../../utils/api";

const pageTransition = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

function Order() {
  const [user, setUser] = useState({});
  const { card, dispatchCard } = useContext(cardStore);
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  const totalPrice = card.items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleOrder = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/orders",
        {
          clientInfo: user,
          totalPrice: parseFloat(totalPrice),
        },
        { withCredentials: true }
      );

      if (res.data.status === "success") {
        await fetch("/auth/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "nouveau commande décoration",
            name: user.name + " " + user.lastName,
            email: user.phone,
          }),
        });

        toast.success(t("toast_order_success"), {
          position: "bottom-center",
          className: "toast-above-button",
        });

        dispatchCard(cardActions.clearCard());
      } else {
        toast.error(res.data.message || t("toast_order_error"), {
          position: "bottom-center",
          className: "toast-above-button",
        });
      }
    } catch (error) {
      toast.error(t("toast_order_error"), {
        position: "bottom-center",
        className: "toast-above-button",
      });
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart", {
          withCredentials: true,
        });
        dispatchCard(cardActions.setCart(res.data.cart));
      } catch (err) {
        console.error("Erreur chargement panier :", err);
      }
    };

    fetchCart();
  }, []);

  return (
    <Transition2>
      <motion.div
        initial="initial"
        animate="animate"
        variants={pageTransition}
        className="order-container order-theme"
      >
        <div className="order">
          <h2>{t("cart_title")}</h2>
          <p>
            {t("cart_items_count", { count: card.items.length })}
            <span className="total">{t("cart_total", { price: totalPrice })}</span>
          </p>
          {card.items.map((item) => (
            <ProductBox
              key={item._id}
              product={item}
              setOpenModal={setOpenModal}
              setProduct={setProduct}
            />
          ))}

          <AnimatePresence>
            {openModal && (
              <Modal
                openModal={openModal}
                product={product}
                setOpenModal={setOpenModal}
              />
            )}
          </AnimatePresence>
        </div>

        <form className="order-form">
          <div className="formHead">
            <h3>{t("form_title")}</h3>
            <p>{t("form_description")}</p>
            <hr />
          </div>

          <div className="nameInput">
            <label htmlFor="name">{t("label_name")}</label>
            <input
              type="text"
              id="name"
              placeholder={t("placeholder_name")}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div className="lastnameInput">
            <label htmlFor="lastname">{t("label_lastname")}</label>
            <input
              type="text"
              id="lastname"
              placeholder={t("placeholder_lastname")}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </div>

          {/* <div className="emailInput">
            <label htmlFor="email">{t("label_email")}</label>
            <input
              type="email"
              id="email"
              placeholder={t("placeholder_email")}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div> */}

          <div className="phoneInput">
            <label htmlFor="phone">{t("label_phone")}</label>
            <input
              type="tel"
              id="phone"
              placeholder={t("placeholder_phone")}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>

          <div className="addressInput">
            <label htmlFor="address">{t("label_address")}</label>
            <input
              type="text"
              id="address"
              placeholder={t("placeholder_address")}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
          </div>

          <div className="formvalidation">
            <hr />
            <div>
              <button
                type="submit"
                onClick={handleOrder}
                className="btn-order"
              >
                {t("btn_submit")}
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatchCard(cardActions.clearCard());
                  toast.info(t("toast_cart_cleared"), {
                    position: "bottom-center",
                    className: "toast-above-button",
                  });
                }}
                className="btn-cancel"
              >
                {t("btn_cancel")}
              </button>
            </div>

            <ToastContainer
              autoClose={3000}
              hideProgressBar
              closeOnClick
              pauseOnHover
              draggable
              theme="colored"
            />
          </div>
        </form>
      </motion.div>
    </Transition2>
  );
}

export default Order;
