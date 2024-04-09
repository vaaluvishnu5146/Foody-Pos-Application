export default function ProductCard(props) {
    const { data = {}, addToCart = () => {}, isAdded = false } = props;
    return <div className={`container product-card b-r-10 ${isAdded && 'bg-secondary'}`} onClick={isAdded ? () => {} : () => addToCart(data)}>
        <h2 className="m-b-10 truncate-text">{data.name}</h2>
        <div className="d-flex justify-between">
            <p>Price: {data.price}</p>
            <p>Ratings({data.ratings})</p>
        </div>
    </div>
}