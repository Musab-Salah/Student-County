import "./BookCard.css";
import useAuth from "../../../../hooks/useAuth";
import useComponent from "../../../../hooks/useComponent";
import useBooks from "../../../../hooks/useBooks";

const BookCard = ({
  studentId,
  name,
  price,
  shortDescription,
  longDescription,
  id,
}) => {
  const { setButtonCards } = useComponent();
  const { getBookById } = useBooks();
  const { decodedJwt } = useAuth();
  return (
    <>
      <div className="card">
        <img
          className="card-picture"
          alt=""
          src="./assets/images/services/book-store.svg"
        />
        <span className="badge">
          <span className=" badge-title">
            {price === 0 ? "Free" : `₪${price}`}
          </span>
        </span>

        <div className="card-info">
          <div className="card-text">
            <div className="card-title">{name}</div>
            <div className="card-description">{shortDescription} </div>
          </div>
          <button
            className="btn btn-small"
            onClick={() => {
              setButtonCards(
                (decodedJwt.uid === studentId ? true : false)
                  ? "UpdateBook"
                  : "ViewBook"
              );
              getBookById(id);
            }}
          >
            {decodedJwt.uid === studentId ? "Manage" : "View"}
          </button>
        </div>
      </div>
    </>
  );
};

export default BookCard;
