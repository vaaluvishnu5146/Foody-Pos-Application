import { Link } from "react-router-dom";
import { FiGlobe, FiGrid, FiGift } from "react-icons/fi";
import { BsFillGearFill } from "react-icons/bs";

export default function Sidebar() {
  return (
    <div className="sidebar d-flex flex-column gap-10 align-center b-r-10">
      <Link to="/store">
        <div className="nav_item b-r-10 d-flex align-center justify-center">
          <FiGlobe />
        </div>
      </Link>
      <Link to="/store/order">
        <div className="nav_item b-r-10 d-flex align-center justify-center">
          <FiGrid />
        </div>
      </Link>
      <Link to="/store/products">
        <div className="nav_item b-r-10 d-flex align-center justify-center">
          <FiGift />
        </div>
      </Link>
      <Link to="/store/settings">
        <div className="nav_item b-r-10 d-flex align-center justify-center">
          <BsFillGearFill />
        </div>
      </Link>
    </div>
  );
}
