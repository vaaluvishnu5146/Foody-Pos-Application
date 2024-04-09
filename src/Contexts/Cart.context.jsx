import React, { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  findAleadyInTheCart: () => {},
  handleItemQuantity: () => {},
  cartValue: 0,
  taxApplicable: [],
});

export const useCart = () => useContext(CartContext);

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartValue, setCartValue] = useState(0);
  const taxApplicable = [
    { name: "GST", value: 18, unit: "%" },
    { name: "Door Delivery", value: 20, unit: "inr" },
  ];

  useEffect(() => {
    if (cart && cart.length > 0 && taxApplicable) {
      let grandTotal = 0;
      for (let i = 0; i < cart.length; i++) {
        grandTotal += cart[i].price * cart[i].quantity;
      }
      for (let t = 0; t < taxApplicable.length; t++) {
        if (taxApplicable[t].unit === "%") {
          grandTotal += (grandTotal / 100) * taxApplicable[t].value;
        } else {
          grandTotal += taxApplicable[t].value;
        }
      }
      setCartValue(grandTotal);
    }
  }, [cart]);

  function addToCart(data = {}) {
    const cartCopy = [...cart];
    cartCopy.push({ ...data, quantity: 1 });
    setCart(cartCopy);
  }

  function findAleadyInTheCart(data = {}) {
    const product = cart.find((d) => d._id === data._id);
    return product && product._id ? true : false;
  }

  function handleItemQuantity(type = "decrement", id = "") {
    const cartCopy = [...cart];
    const matchingProduct = cartCopy.find((item) => item._id === id);
    if (matchingProduct) {
      matchingProduct.quantity =
        type === "decrement"
          ? matchingProduct.quantity - 1
          : matchingProduct.quantity + 1;
      setCart(cartCopy);
    } else {
      console.log("No Items matching", id);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        findAleadyInTheCart,
        handleItemQuantity,
        cartValue,
        taxApplicable,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
