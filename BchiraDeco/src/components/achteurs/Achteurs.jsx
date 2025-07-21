import "./achteurs.scss";
import avatar from "../../assets/avatar.webp"; // Remplace par le chemin de ton image
import { useTranslation } from "react-i18next";


function Achteurs() {
  const { t, i18n } = useTranslation();
  return (
    <div className="achteurs-container">
      <h3 className="section-title">&nbsp;{t("testimonials_title")}&nbsp;</h3>

      <div className="testimonials-grid">
        {/* La Fabrique */}
        <div className="testimonial-card light">
          <img
            src={avatar}
            alt="La Fabrique"
            className="testimonial-image"
          />
          <h4 className="testimonial-title">&nbsp;{t("name_abdallah")}&nbsp;</h4>
          <p className="testimonial-text">
            &nbsp;{t("testimonial1")}&nbsp;
          </p>
        </div>

        {/* Flan de Notre Dame */}
        <div className="testimonial-card light">
          <img
            src={avatar}
            alt="Flan de notre Dame"
            className="testimonial-image"
          />
          <h4 className="testimonial-title">&nbsp;{t("name_anwer")}&nbsp;</h4>
          <p className="testimonial-text">
            &nbsp;{t("testimonial2")}&nbsp;
          </p>
        </div>
      </div>
    </div>
  );
}

export default Achteurs;
