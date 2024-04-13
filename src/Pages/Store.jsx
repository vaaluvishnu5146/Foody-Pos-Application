import { useState } from "react";
import ProductCard from "../Components/ProductCard";
import CartCard from "../Components/CartCard";
import { useProducts } from "../Contexts/Product.context";
import { useCart } from "../Contexts/Cart.context";
import EmptyCart from "../assets/emptycart.webp";
import { useOrder } from "../Contexts/Order.context";
import PaymentsModal from "../Components/PaymentsModal";
import { useAuth } from "../Contexts/Auth.context";

export default function Store() {
  const { products = [] } = useProducts();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("cod");
  const {
    cart = [],
    addToCart = () => {},
    findAleadyInTheCart = () => {},
    handleItemQuantity = () => {},
    cartValue,
    taxApplicable,
    resetCart,
  } = useCart();
  const { decodedToken = {} } = useAuth();

  const { createOrder = () => {} } = useOrder();

  function handleCreateOrderClick(e) {
    e.preventDefault();
    setPaymentModalOpen(true);
  }

  function handleOrderSubmit() {
    if (cart && cart.length > 0) {
      const order = {
        user: decodedToken.userId,
        products: cart,
        orderValue: cartValue,
        isPaid: false,
        transactionType,
        transactionId: null,
      };
      createOrder(order);
      resetCart();
    }
  }

  return (
    <>
      <div className="container product-listing-area b-r-10">
        <div className="header">
          <h2 className="m-b-10">All Items</h2>
        </div>
        <div className="d-flex justify-content-start gap-10 flex-wrap">
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
              <h2 className="m-b-10">Cart</h2>
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
                <h3>Tax</h3>
                <ul>
                  {taxApplicable.map((tax, index) => (
                    <li key={`${tax.name}-${index}`}>
                      <h5>{tax.name}</h5>
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
                    <h4>Grand Total</h4>
                    <h5>{cartValue}</h5>
                  </li>
                </ul>
              </div>
              <PaymentsModal
                show={paymentModalOpen}
                setOpen={setPaymentModalOpen}
                handleTransactionType={setTransactionType}
                handleOrderSubmit={handleOrderSubmit}
              />
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
