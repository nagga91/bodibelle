import "./modal.scss";

import { motion } from "framer-motion";
import { cardStore } from "../../context/CardContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

function Modal({ setOpenModal, product }) {
  const modalAnim = {
    initial: {
      scaleY: 0,
      opacity: 0,
    },
    animate: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      scaleY: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };
let [images,setImages]=useState(product.images)

  //card context
  const { card, dispatchCard } = useContext(cardStore);

  const isInCard = card.some((item) => item._id === product._id);

  const hundleAddToCard = () => {
    dispatchCard({ type: "ADD_TO_CARD", payload: product });
    toast.success("produit ajouter avec succes");
  };
  const hundleDeleteFromCard = () => {
    dispatchCard({ type: "REMOVE_FROM_CARD", payload: product });
    toast.error("produit supprimer avec succes");
  };
  return (
    <motion.div
      className="modal-container"
      key="modal"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={modalAnim}
    >
      <div className="modal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          onClick={() => setOpenModal(false)}
        >
          <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
        </svg>
        <div className="images">
          <img src={process.env.REACT_APP_UPLOADS + images[0]} alt="" />
          
          <div className="small-images">
            <img src={process.env.REACT_APP_UPLOADS + images[1]} alt="" onClick={() =>{
             setImages([images[1],images[0],images[2]])

            }} />
            <img src={process.env.REACT_APP_UPLOADS + images[2]} alt="" 
            onClick={()=>{
              setImages([images[2],images[1],images[0]])
            }}
            />
          </div>
        </div>
        <div className="description">
          <div className="title">
            <h2>{product.title}</h2>
            <hr />
          </div>
          <div className="desc">
            <h3>{product.brand}</h3>
            <div>
              <h3>Couleurs</h3>
              <p>{product.color}</p>
            </div>
          
          <div>
            <h3>Tailles</h3>
            <span>XL</span>
          </div>
          <div>
            <h3>Prix</h3>
            <span>{product.price}</span></div>
          </div>
            {!isInCard ? (
              <button onClick={hundleAddToCard}>ajouter a ma carte</button>
            ) : (
              <div className="button">
                <h4>deja dans ma carte!</h4>
              <button
                style={{ backgroundColor: "rgb(160, 0, 0)" ,border:"none" }}
                onClick={hundleDeleteFromCard}
                >
                supprimer de ma carte
              </button>
              </div>
            )}
        </div>
      </div>
    </motion.div>
  );
}

export default Modal;
