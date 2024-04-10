import ProductCard from "../Components/ProductCard";
import CartCard from "../Components/CartCard";
import { useProducts } from "../Contexts/Product.context";
import { useCart } from "../Contexts/Cart.context";
import EmptyCart from "../assets/emptycart.webp";
import { useOrder } from "../Contexts/Order.context";

export default function Store() {
  const { products = [] } = useProducts();
  const {
    cart = [],
    addToCart = () => {},
    findAleadyInTheCart = () => {},
    handleItemQuantity = () => {},
    cartValue,
    taxApplicable,
    resetCart,
  } = useCart();

  const { createOrder = () => {} } = useOrder();

  function handleCreateOrderClick(e) {
    e.preventDefault();
    if (cart && cart.length > 0) {
      const order = {
        items: cart,
        orderValue: cartValue,
      };
      createOrder(order);
      resetCart();
    }
  }

  return (
    <>
      <div className="container product-listing-area b-r-10">
        <div className="header">
          <h1 className="m-b-10">All Items</h1>
        </div>
        <div className="d-flex gap-10 flex-wrap">
          {products.map((product, index) => (
            <ProductCard
              key={`${index}-${product.name}`}
              addToCart={addToCart}
              data={product}
              isAdded={findAleadyInTheCart(product)}
            />
          ))}
        </div>
      </div>
      <div className="container cart-listing-area b-r-10">
        {cart && cart.length > 0 ? (
          <>
            <div className="header">
              <h1 className="m-b-10">Cart</h1>
            </div>
            <div
              className="cart-listing-container d-flex flex-column gap-10"
              style={{ height: "55%" }}
            >
              {cart &&
                cart.length > 0 &&
                cart.map((item, index) => (
                  <CartCard
                    key={`${index}-cart-${item._id}`}
                    handleQuantity={handleItemQuantity}
                    data={item}
                  />
                ))}
            </div>
            <div className="cart-value-section" style={{ height: "35%" }}>
              <h1 className="m-b-10">Cart Value</h1>
              <div className="tax-item">
                <h2>Tax</h2>
                <ul>
                  {taxApplicable.map((tax, index) => (
                    <li key={`${tax.name}-${index}`}>
                      <h3>{tax.name}</h3>
                      <p>
                        {tax.value}
                        {tax.unit}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tax-item">
                <ul>
                  <li>
                    <h3>Grand Total</h3>
                    <h4>{cartValue}</h4>
                  </li>
                </ul>
              </div>
              <button className="btn b-r-10" onClick={handleCreateOrderClick}>
                Pay Now
              </button>
            </div>
          </>
        ) : (
          <div
            className="d-flex"
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <img src={EmptyCart} alt="cart" style={{ width: 200 }} />
          </div>
        )}
      </div>
    </>
  );
}
