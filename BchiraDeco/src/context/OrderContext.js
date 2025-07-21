import React, { createContext, useContext, useEffect, useReducer } from "react";
import api from "../utils/api";
import { authStore } from "./AuthContext";

export const orderStore = createContext();

export const orderActions = {
  getOrders: (orders) => {
    return { type: "GET_ORDERS", payload: orders };
  },
  editOrder: (order) => {
    return { type: "EDIT_ORDER", payload: order };
  },
};
const orderRducer = (state, action) => {
  switch (action.type) {
    case "GET_ORDERS": {
      return action.payload;
    }
    case "EDIT_ORDER": {
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    }
    default:
      return state;
  }
};
function OrderContext({ children }) {
    const {auth}=useContext(authStore)  
  const [order, dispatchOrder] = useReducer(orderRducer, []);
  
  useEffect(() => {
    api
      .get("/orders",{headers:{Authorization:`Bearer ${auth}`}})
      .then((res) => {
        if (res.data.status === "success") {
          dispatchOrder(orderActions.getOrders(res.data.data));
        }
        
      })
      .catch((err) => console.log(err));
  },[]);
  return (
    <orderStore.Provider value={{ order, dispatchOrder }}>
      {children}
    </orderStore.Provider>
  );
}

export default OrderContext;
