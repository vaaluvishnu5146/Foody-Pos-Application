import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Store from "./Pages/Store";
import Order from "./Pages/Order";
import Home from "./Pages/home";
import Products from "./Pages/Products";
import Product from "./Pages/Product";
import Settings from "./Pages/Settings";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route Component={Login} path="/" />
      <Route Component={Signup} path="/signup" />
      <Route Component={Home} path="/store">
        <Route Component={Store} index />
        <Route Component={Order} path="/store/order" />
        <Route Component={Products} path="/store/products" />
        <Route Component={Product} path="/store/product/:id" />
        <Route Component={Settings} path="/store/settings" />
      </Route>
    </Routes>
  );
}

export default App;
