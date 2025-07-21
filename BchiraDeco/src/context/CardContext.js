import { createContext, useReducer } from "react";

export const cardStore = createContext();

export const cardActions = {
  addToCard: (prod) => ({ type: "ADD_TO_CARD", payload: prod }),
  removeFromCard: (prod) => ({ type: "REMOVE_FROM_CARD", payload: prod }),
  clearCard: () => ({ type: "CLEAR_CART" }),
  setCart: (cart) => ({ type: "SET_CART", payload: cart }),
  updateQuantity: (productId, quantity) => ({
    type: "UPDATE_QUANTITY",
    payload: { productId, quantity },
  }),
};

// ✅ Initial state structure
const initialState = {
  items: [],
  total: 0,
};

const cardReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CARD": {
      const existing = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existing) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + (action.payload.price || 0),
      };
    }

    case "REMOVE_FROM_CARD": {
      const filteredItems = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      const removedItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      const newTotal = removedItem
        ? state.total - (removedItem.price || 0) * (removedItem.quantity || 1)
        : state.total;
      return {
        ...state,
        items: filteredItems,
        total: newTotal,
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item._id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
      );
      return { ...state, items: updatedItems, total: newTotal };
    }

    case "CLEAR_CART":
      return { items: [], total: 0 };

    case "SET_CART":
      return action.payload || { items: [], total: 0 };

    default:
      return state;
  }
};

function CardContext({ children }) {
  const [card, dispatchCard] = useReducer(cardReducer, initialState);

  return (
    <cardStore.Provider value={{ card, dispatchCard }}>
      {children}
    </cardStore.Provider>
  );
}

export default CardContext;
