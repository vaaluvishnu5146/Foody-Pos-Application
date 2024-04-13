import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "./Auth.context";

const ProductContext = createContext({
  products: [],
});

export const useProducts = () => useContext(ProductContext);

export default function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      fetch("http://localhost:5000/api/food/all?page=1&count=10")
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            setProducts(result.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  return (
    <ProductContext.Provider
      value={{
        products,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
