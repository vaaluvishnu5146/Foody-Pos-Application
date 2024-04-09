export default function ProductListingCard(props) {
  const { data = {}, handleClick = () => {} } = props;
  return (
    <div
      className={`container product-card b-r-10`}
      onClick={() => handleClick(data._id)}
    >
      <h2 className="m-b-10 truncate-text">{data.name}</h2>
    </div>
  );
}
