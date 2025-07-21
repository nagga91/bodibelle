import "./header.scss";
import { AnimatePresence, motion } from "framer-motion";
import image from "../../assets/header.png";
import { useTranslation } from "react-i18next";


function Header({ setOpenNavbar }) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      <motion.div
        id="accueil"
        className="header-container"
        onClick={() => setOpenNavbar(false)}
      >
        <motion.img
          src={image}
          alt=""
          layoutId="main-image-1"
          className="backgroundImage"
        />
        <motion.div className="backgroundFilter" />
        <h2>{t("home_tagline")}</h2>
      </motion.div>
    </AnimatePresence>
  );
}


export default Header;
