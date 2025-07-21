import "./achteurs.scss"; // ou vendeurs.scss
import img1 from "../../assets/depannage.jpg"; // remplace par tes vraies images
import img2 from "../../assets/equipe.jpg";
import img3 from "../../assets/reparation.jpg";
import icon1 from "../../assets/reparation.png";
import icon2 from "../../assets/help.png";
import icon3 from "../../assets/tool.png";
import { useTranslation } from "react-i18next";

function Vendeurs() {
    const { t } = useTranslation();
  return (
    <div className="vendeurs-container">
      <h3>&nbsp;{t("services_title")}&nbsp;</h3>

      <div className="card-wrapper">
        <div className="service-card">
          <img src={img1} alt="Dépannage" className="banner" />
          <div className="icon-box">
            <img src={icon1} alt="Icône" />
          </div>
          <div className="text">
            <h4>&nbsp;{t("card_1_title")}&nbsp;</h4>
            <p>
              &nbsp;{t("card_1_text")}&nbsp;
            </p>
          </div>
        </div>

        <div className="service-card">
          <img src={img2} alt="Réparation" className="banner" />
          <div className="icon-box">
            <img src={icon2} alt="Icône" />
          </div>
          <div className="text">
            <h4>&nbsp;{t("card_2_title")}&nbsp;</h4>
            <p>
               &nbsp;{t("card_2_text")}&nbsp;
            </p>
          </div>
        </div>

        <div className="service-card">
          <img src={img3} alt="Entretien" className="banner" />
          <div className="icon-box">
            <img src={icon3} alt="Icône" />
          </div>
          <div className="text">
            <h4>&nbsp;{t("card_3_title")}&nbsp;</h4>
            <p>
&nbsp;{t("card_3_text")}&nbsp;            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Vendeurs;
