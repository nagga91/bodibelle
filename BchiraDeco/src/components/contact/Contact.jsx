import image from "../../assets/contact.png";
import avatar from "../../assets/avatar.webp";
import "./contact.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast(
          <div className="custom-toast">
            ✅ {t("message_sent_successfully") || "Message envoyé avec succès !"}
          </div>,
          {
            position: "bottom-center",
            className: "toast-above-button"
          }
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast(
          <div className="custom-toast error">
            ❌ {t("message_send_error") || "Erreur lors de l'envoi du message."}
          </div>,
          {
            position: "bottom-center",
            className: "toast-above-button"
          }
        );
      }
    } catch (error) {
      console.error(error);
      toast(
        <div className="custom-toast error">
          🚫 {t("network_error") || "Erreur réseau. Veuillez réessayer."}
        </div>,
        {
          position: "bottom-center",
          className: "toast-above-button"
        }
      );
    }
  };

  return (
    <div id="contact" className="contact-container">
      <div className="contact-form">
        <h2>{t("contact_us")}</h2>
        <div className="exmple">
          <img src={avatar} alt="avatar" />
        </div>
        <form onSubmit={handleSubmit}>
          <label>{t("nom")}</label>
          <input
            type="text"
            name="name"
            placeholder={t("nom")}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>{t("email")}</label>
          <input
            type="email"
            name="email"
            placeholder={t("email")}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>{t("message")}</label>
          <textarea
            name="message"
            cols="30"
            rows="10"
            placeholder={t("message")}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">{t("send")}</button>
        </form>
        <ToastContainer
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </div>

      <div className="contact-img">
        <img src={image} alt="contact" />
      </div>
    </div>
  );
}

export default Contact;
