import CounterButton from "./CounterButton";

export default function CartCard(props) {
    const { data = {}, handleQuantity = () => {} } = props;
    return <div className="container cart-card b-r-10 d-flex justify-between">
        <div style={{
            width: '50%'
        }}>
            <h2 className="truncate-text">{data.name}</h2>
        </div>
        <div>
            <CounterButton id={data._id} quantity={data.quantity} handleQuantity={handleQuantity} />
        </div>
    </div>
}