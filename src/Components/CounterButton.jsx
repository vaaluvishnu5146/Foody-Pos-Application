export default function CounterButton(props) {
    const { id = '', quantity = 0, handleQuantity = () => {} } = props;
    return <div className="counter d-flex gap-10">
        <button className="btn cart-counter-btn b-r-10" onClick={() => handleQuantity('decrement', id)}>-</button>
        <p>{quantity}</p>
        <button className="btn cart-counter-btn b-r-10" onClick={() => handleQuantity('increment', id)}>+</button>
    </div>
}