import "./BookCard.css";
const BookCard = ({ name, price, shortDescription, longDescription }) => {
  return (
    <>
      <div className="card">
        <img
          className="card-picture"
          alt=""
          src="./assets/images/services/riding.svg"
        />
        <span className="pricing">
          <span>{price === 0 ? "Free" : price}</span>
        </span>
        <div className="card-info">
          <div className="card-text">
            <div className="card-title">{name}</div>
            <div className="card-description">{shortDescription} </div>
          </div>
          <button className="btn btn-small">Manage</button>
        </div>
      </div>
    </>
  );
};

export default BookCard;
