import "./loader.scss";
import { AnimatePresence, motion } from "framer-motion";

import Image from "../../assets/backgroundHeader.webp";
import image1 from "../../assets/apropos1.png";
import image2 from "../../assets/apropos2.png";
import image3 from "../../assets/apropos3.png";
import image4 from "../../assets/apropos4.png";

// Import images

const container = {
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 0.6,
    y: -100,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: {
      ease: "easeInOut",
      duration: 0.8,
    },
  },
};

const itemMain = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: -20,
    transition: {
      duration: 1,
      delay:2
    },
  },
};

const Loader = () => {
  return (
    <motion.div className="loader" layoutTransition >
      <motion.div         key="animation"
        variants={container}
        initial="hidden"
        layoutTransition
        animate="show"
        exit="exit"
        className="loader-inner"
      >
   
          <motion.img layoutTransition 
            variants={itemMain}
            initial="hidden"
            animate="show"
            layoutId="main-image-1"
            src={Image}
            className="main-image"
            alt=""
          />
   

        <motion.img src={image1} className="image1" variants={item} alt="" />
        <motion.img src={image2} className="image2" variants={item} alt="" />
        <motion.img src={image3} className="image3" variants={item} alt="" />
        <motion.img src={image4} className="image4" variants={item} alt="" />
      </motion.div>
    </motion.div>
  );
};

export default Loader;
