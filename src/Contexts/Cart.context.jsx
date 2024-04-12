import { useEffect, useContext, createContext, useReducer } from "react";
import PropTypes from "prop-types";

const taxApplicable = [
  { name: "GST", value: 18, unit: "%" },
  { name: "Door Delivery", value: 20, unit: "inr" },
];

const CartContext = createContext({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  findAleadyInTheCart: () => {},
  handleItemQuantity: () => {},
  cartValue: 0,
  taxApplicable: [],
  resetCart: () => {},
});

export const useCart = () => useContext(CartContext);

function reducer(state, action = {}) {
  switch (action.type) {
    case "addToCart":
      var cartCopy = [...state.cart];
      cartCopy.push({ ...action.payload, quantity: 1 });
      return { ...state, cart: cartCopy };
    case "handleQuantityChange":
      var copy = [...state.cart];
      var matchingProduct = copy.find((item) => item._id === action.payload.id);
      if (matchingProduct) {
        matchingProduct.quantity =
          action.payload.type === "decrement"
            ? matchingProduct.quantity - 1
            : matchingProduct.quantity + 1;
        // setCart(cartCopy);
      } else {
        console.log("No Items matching", action.payload.id);
      }
      return { ...state, cart: copy };
    case "resetCart":
      return { ...state, cart: [] };
    case "calculateCartTotal":
      var grandTotal = 0;
      for (let i = 0; i < state.cart.length; i++) {
        grandTotal += state.cart[i].price * state.cart[i].quantity;
      }
      for (let t = 0; t < taxApplicable.length; t++) {
        if (taxApplicable[t].unit === "%") {
          grandTotal += (grandTotal / 100) * taxApplicable[t].value;
        } else {
          grandTotal += taxApplicable[t].value;
        }
      }
      return { ...state, cartValue: grandTotal };
    default:
      // PROGRAM HERE
      break;
  }
}

const INITIAL_STATE = {
  cart: [],
  cartValue: 0,
};

export default function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (state.cart && state.cart.length > 0 && taxApplicable) {
      dispatch({ type: "calculateCartTotal" });
    }
  }, [state.cart]);

  function addToCart(data = {}) {
    dispatch({ type: "addToCart", payload: data });
  }

  function handleItemQuantity(type = "decrement", id = "") {
    dispatch({ type: "handleQuantityChange", payload: { type, id } });
  }

  function resetCart() {
    dispatch({ type: "resetCart" });
  }

  function findAleadyInTheCart(data = {}) {
    const product = state.cart.find((d) => d._id === data._id);
    return product && product._id ? true : false;
  }

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        findAleadyInTheCart,
        handleItemQuantity,
        cartValue: state.cartValue,
        taxApplicable,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.node,
};
