import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/styles/styles.css";
import ProductContextProvider from "./Contexts/Product.context.jsx";
import CartContextProvider from "./Contexts/Cart.context.jsx";
import OrdersContextProvider from "./Contexts/Order.context.jsx";
import AuthContextProvider from "./Contexts/Auth.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ProductContextProvider>
      <CartContextProvider>
        <OrdersContextProvider>
          <Router>
            <App />
          </Router>
        </OrdersContextProvider>
      </CartContextProvider>
    </ProductContextProvider>
  </AuthContextProvider>
);
