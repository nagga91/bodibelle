import { useContext } from "react";
import "./productBox.scss";
import { cardStore } from "../../../context/CardContext";
import api from "../../../utils/api";

function ProductBox({ product }) {
  const { dispatchCard } = useContext(cardStore);

  const handleDeleteFromCard = () => {
    dispatchCard({ type: "REMOVE_FROM_CARD", payload: product });
  };

  const handleQuantityChange = async (e) => {
    const newQuantity = parseInt(e.target.value, 10);
     const res = await api.patch("/cart/update-quantity",{productId:product._id,quantity:newQuantity}, {
          withCredentials: true,
        });
    if (newQuantity > 0) {
      dispatchCard({
        type: "UPDATE_QUANTITY",
        payload: { productId: product._id || product.id, quantity: newQuantity }
      });
    }
  };
  return (

    <div className="product-box">
      <img
                  src={`${process.env.REACT_APP_BASE_URL}/uploads/${product.photos[0]}`}
                  alt={product.name}
                />
      
      <div>
        <h3>{product.name}</h3>
        <h5>{product.colors}</h5>
      </div>
      <span>{product.price} DT</span>
      <div className="quantity-field">
        <label>Quantité :</label>
        <input
          type="number"
          value={product.quantity || 1}
          min="1"
          onChange={handleQuantityChange}
        />
      </div>
      <div className="delete" onClick={handleDeleteFromCard}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="..." />
        </svg>
      </div>
    </div>
  );
}

export default ProductBox;
