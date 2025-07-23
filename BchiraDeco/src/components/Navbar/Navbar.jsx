import { useContext, useEffect, useState } from "react";
import { cardStore } from "../../context/CardContext";
import { anim, banner, objectAni } from "./animation";
import "./navbar.scss";
import { AnimatePresence, motion } from "framer-motion";
import cardIcon from "../../assets/cardIcon.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.svg";

function Navbar({ open, setOpen, setNav }) {
  const { t, i18n } = useTranslation();
  const { card } = useContext(cardStore);
  const loc = useLocation();
  const [location, setLocation] = useState(loc);
  const navigate = useNavigate();

  useEffect(() => {
    setLocation(loc);
  }, [loc]);

  const changeLanguage = (lng) => {
    if (typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(lng).then(() => {
        localStorage.setItem("i18nextLng", lng);
        document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
      });
    } else {
      console.error("❌ i18n.changeLanguage is not a function", i18n);
    }
  };

  return location.pathname === "/" || location.pathname === "/order" ? (
    <motion.div key={"navbar"} className="navbar-container" {...anim(banner)}>
      <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

      <div style={{ width: "100px" }} />

      <AnimatePresence mode="popLayout">
        {location.pathname !== "/order" ? (
          <motion.nav
            variants={objectAni}
            initial="initial"
            animate="animate"
            exit="exit"
            key={"nav"}
          >
          

            <div
              onClick={() => setOpen(!open)}
              className={open ? "hamburger-menu open" : "hamburger-menu"}
            >
              <div className={open ? "bar open" : "bar"}></div>
            </div>

            <ul className={open ? "ulopen" : "ulclosed" }>
              <a onClick={() => setOpen(false)} href="#accueil">
                <motion.li variants={objectAni}>&nbsp;{t("home")}&nbsp;</motion.li>
              </a>
              <a onClick={() => setOpen(false)} href="#aPropos">
                <motion.li variants={objectAni}>&nbsp;{t("about")}&nbsp;</motion.li>
              </a>
              <a onClick={() => setOpen(false)} href="#prods">
                <motion.li variants={objectAni}>&nbsp;{t("products")}&nbsp;</motion.li>
              </a>
              <a onClick={() => setOpen(false)} href="#contact">
                <motion.li variants={objectAni}>&nbsp;{t("contact")}&nbsp;</motion.li>
              </a>
               {/* <motion.div className="shopping-card" variants={objectAni}>
              <Link to={card.length > 0 ? "/order" : null}>
                <p>{card.length}</p>
                <img src={cardIcon} alt="" />
              </Link>
            </motion.div> */}
            </ul>
             
               <div className="language-switch ">
          <button onClick={() => changeLanguage("fr")}>FR</button>
          <button onClick={() => changeLanguage("ar")}>AR</button>
        </div>
          </motion.nav>
        ) : (
          <motion.h3
            onClick={() => {
              navigate(-1);
              setNav(true);
            }}
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
            transition={{ duration: 0.5 }}
            key={"back"}
            style={{ cursor: "pointer" }}
          >
            {t("back")}
          </motion.h3>
        )}
      </AnimatePresence>
    </motion.div>
  ) : null;
}

export default Navbar;
