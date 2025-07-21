import "./aPropos.scss"
import image1 from "../../assets/apropos1.png";
import image2 from "../../assets/apropos2.png";
import image3 from "../../assets/apropos3.png";
import image4 from "../../assets/apropos4.png";
import {motion, useInView} from "framer-motion"
import { image1Anim,image2Anim,image3Anim,image4Anim,anim } from "./animation";
import { useRef } from "react";
import { useTranslation } from "react-i18next";


function APropos() {
      const { t} = useTranslation();

  
  return (
    <div id="aPropos" className="aPropos-container">
      <div className="aPropos-images">
        <div className="first">
          <motion.img style={{height:"44%" }} {...anim(image1Anim)}   src={image1} alt="" />
          <motion.img style={{height:"55%"}}  {...anim(image2Anim)}  src={image3} alt="" />
        </div>

        <div className="second">
          <motion.img style={{height:"36%"}}  {...anim(image3Anim)} src={image2} alt="" />
          <motion.img style={{height:"63%"}} {...anim(image4Anim)} src={image4} alt="" />
        </div>
      </div>
      <div className="aPropos-text">
        <h2>&nbsp;{t("about")}&nbsp;</h2>
       
        <p>
          &nbsp;{t("intro")}&nbsp;
        </p>
      </div>
    </div>
  );
}

export default APropos;
