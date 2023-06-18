import React from "react";
import { FaHome } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import "./BookCard.css";
import useComponent from "../../../../hooks/useComponent";
import useAuth from "../../../../hooks/useAuth";
import useBooks from "../../../../hooks/useBooks";
import { BiBook } from "react-icons/bi";

const BookCard = ({
  createdOn,
  id,
  studentId,
  theWay,
  condition,
  price,
  shortDescription,
  name,
}) => {
  const { setButtonCards } = useComponent();
  const { getBookById } = useBooks();
  const { decodedJwt } = useAuth();

  return (
    <>
      <div className="book-card-container">
        <div className="book-card-data">
          <div className="book-card-profile">
            <BiBook className="housing-card-avatar"/>
            <div className="book-card-info">
              <div className="book-card-name">
                {" "}
                {name} •{price} ₪
              </div>
              <div className="book-card-address">{shortDescription}</div>
            </div>
          </div>
          <div className="book-card-action">
            <button
              className="btn btn-primary btn-small"
              onClick={() => {
                setButtonCards(
                  (decodedJwt.uid === studentId ? true : false)
                    ? "UpdateBook"
                    : "ViewBook"
                );
                getBookById(id);
              }}
            >
              {" "}
              {decodedJwt.uid === studentId ? "Manage" : "View"}
            </button>
            <div className="book-card-date">{createdOn}</div>
          </div>
        </div>
        <div className="book-card-room">
          <div className="book-card-inroom">{theWay}</div>
          <div className="book-card-inroom">{condition}</div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
