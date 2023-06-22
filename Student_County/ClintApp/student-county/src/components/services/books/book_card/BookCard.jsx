import React, { useEffect, useMemo, useState } from "react";
import "./BookCard.css";
import useComponent from "../../../../hooks/useComponent";
import useAuth from "../../../../hooks/useAuth";
import useBooks from "../../../../hooks/useBooks";
import { BiBook } from "react-icons/bi";
import useCollege from "../../../../hooks/useCollege";

const BookCard = ({
  createdOn,
  id,
  studentId,
  theWay,
  condition,
  price,
  longDescription,
  name,
  collegeId,
}) => {
  const { setButtonCards } = useComponent();
  const { getBookById } = useBooks();
  const { decodedJwt } = useAuth();
  const [nowLocation, setNowLocation] = useState(false);

  const maxLength = 20;

  if (longDescription && longDescription.length > maxLength) {
    const truncatedText = longDescription.substring(0, maxLength) + "...";
    longDescription = truncatedText;
  }
  const { Colleges } = useCollege();

  useEffect(() => {
    getMyCollege(collegeId);
  }, [Colleges]);
  const getMyCollege = useMemo(() => {
    return (collegeId) => {
      const foundLocation = Object.values(Colleges).find(
        (College) => College.id === collegeId
      );
      setNowLocation(foundLocation);
    };
  }, [Colleges]);
  return (
    <>
      <div className="book-card-container">
        <div className="book-card-data">
          <div className="book-card-profile">
            <BiBook className="housing-card-avatar" />
            <div className="book-card-info">
              <div className="book-card-name">
                {" "}
                {name} •{price === 0 ? "Free" : `${price}₪`}
              </div>
              <div className="book-card-address">{longDescription}</div>
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
          <div className="book-card-inroom">
            {" "}
            {nowLocation ? nowLocation.name : ""}
          </div>
          <div className="book-card-inroom">{theWay}</div>
          <div className="book-card-inroom">{condition}</div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
