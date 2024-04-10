import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

export const OrdersContext = createContext({
  orders: [],
});

export const useOrder = () => useContext(OrdersContext);

export default function OrdersContextProvider({ children }) {
  const [orders, setOrders] = useState([]);

  function createOrder(order = {}) {
    let ordersCopy = [...orders];
    ordersCopy.push(order);
    setOrders(ordersCopy);
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
