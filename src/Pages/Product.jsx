import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/food/${id}`)
        .then((response) => response.json())
        .then((result) => {
          if (result && result.success) {
            setProduct(result.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <div className="products-container b-r-10">
      <h1>{product.name}</h1>
      <h3>{product.price}</h3>
    </div>
  );
}
