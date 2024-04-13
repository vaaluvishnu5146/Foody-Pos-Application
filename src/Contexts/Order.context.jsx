import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

export const OrdersContext = createContext({
  orders: [],
});

export const useOrder = () => useContext(OrdersContext);

export default function OrdersContextProvider({ children }) {
  const [orders, setOrders] = useState([]);

  function createOrder(order = {}) {
    if (order) {
      fetch("http://localhost:5000/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
    }
  }

  const values = {
    orders,
    createOrder,
  };

  return (
    <OrdersContext.Provider value={values}>{children}</OrdersContext.Provider>
  );
}

OrdersContextProvider.propTypes = {
  children: PropTypes.node,
};
