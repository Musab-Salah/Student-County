import { useEffect, useState } from "react";
import useComponent from "../../../../hooks/useComponent";
import useBooks from "../../../../hooks/useBooks";
import "./BooksView.css";
import useLoader from "../../../../hooks/useLoader";
import ChatController from "../../../chat/ChatController";

const BooksView = () => {
  const { setButtonCards, setOpenChat, setOptionMenu, setOwnerItem } =
    useComponent();
  const { Book, setBook } = useBooks();
  const { FormBooksLoader } = useLoader();
  // State Hook

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
        <div
          className="container-load-form"
          style={{ display: FormBooksLoader ? "block" : "none" }}
        >
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
          <div className="block-load-form"></div>
        </div>
        <div
          className="form-create"
          style={{ display: FormBooksLoader ? "none" : "flex" }}
        >
          <div className="section-view">
            <span className="label-view">Name:</span>
            <span className="text-field">{Book.name}</span>
            <div className="price-field">
              Price: {Book.price === 0 ? "Free" : `₪${Book.price}`}
            </div>
          </div>
          <div className="section-view">
            <span className="label-view">Description:</span>
            <span className="text-field">
              {Book.longDescription}
              <div className="price-field">Owner Name: {Book.studentName} </div>
            </span>
          </div>
          <div className="section-view"></div>
          <div className="buttons">
            <button
              onClick={() => {
                setOpenChat(true);
                setButtonCards("");
                setOptionMenu("Chat");
                setOwnerItem(Book.studentId);
              }}
              className={`btn btn-primary `}
            >
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
