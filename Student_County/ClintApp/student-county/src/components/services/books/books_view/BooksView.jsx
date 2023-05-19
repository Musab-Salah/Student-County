import { useState, useEffect, useMemo } from "react";
import useComponent from "../../../../hooks/useComponent";
import useBooks from "../../../../hooks/useBooks";
import "./BooksView.css";

const BooksView = () => {
  const { setButtonCards, ButtonCards } = useComponent();
  const { Success, createBook, BookError, updateBook, Book, setBook } =
    useBooks();
  // State Hook

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    return function cleanup() {
      setButtonCards("");
     setBook(""); 
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="Create-section">
        <div className="form-create">
          <div className="section-view">
            <span className="label-view">Name:</span>
            <span className="text-field">{Book.name}</span>
            <div className="price-field">Price: {Book.price === 0 ? "Free" : `₪${Book.price}`}</div>
          </div>
          <div className="section-view">
            <span className="label-view">Description:</span>
            <span className="text-field">{Book.shortDescription}{" ."}{Book.longDescription}</span>
          </div>
          <div className="section-view"></div>
          <div className="buttons">
            <button  className={`btn btn-primary `}>
              Contact With Owner
            </button>
            <button
              onClick={() => setButtonCards("")}
              className={`btn btn-secondary `}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BooksView;
