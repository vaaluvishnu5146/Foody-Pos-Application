import { useNavigate } from "react-router-dom";
import ProductListingCard from "../Components/ProductListingCard";
import { useProducts } from "../Contexts/Product.context";

export default function Products() {
  const { products = [] } = useProducts();
  const navigator = useNavigate();

  function handleClick(id = "") {
    navigator(`/store/product/${id}`);
  }

  return (
    <div className="products-container b-r-10">
      {products.map((product, index) => (
        <ProductListingCard
          key={`product-${index}-${product.name}`}
          data={product}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}
