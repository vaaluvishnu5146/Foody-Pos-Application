import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar b-r-10">
      <div className="nav_item b-r-10">
        <Link to="/store">Store</Link>
      </div>
      <div className="nav_item b-r-10">
        <Link to="/store/order">Orders</Link>
      </div>
      <div className="nav_item b-r-10">
        <Link to="/store/products">Products</Link>
      </div>
    </div>
  );
}
