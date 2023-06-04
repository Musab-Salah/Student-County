import { useEffect, useMemo, useState } from "react";
import useComponent from "../../../../hooks/useComponent";
import useBooks from "../../../../hooks/useBooks";
import "./BooksView.css";
import useLoader from "../../../../hooks/useLoader";
import ChatController from "../../../chat/ChatController";
import { TbCrown } from "react-icons/tb";
import useChat from "../../../../hooks/useChat";
import useAuth from "../../../../hooks/useAuth";

const BooksView = () => {
  const { setButtonCards, setOpenChatArea, setOptionMenu, setOwnerItem } =
    useComponent();
  const { Book, setBook } = useBooks();
  const { reJoinRoom, setChatOpened } = useChat();
  const { FormBooksLoader } = useLoader();
  const { decodedJwt } = useAuth();
  const [date, setDate] = useState();
  // State Hook
  useMemo(() => {
    const d = new Date(Date.parse(Book.createdOn));
    setDate(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getUTCDate());
  }, [Book]);

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
          className="form-create-view"
          style={{ display: FormBooksLoader ? "none" : "flex" }}
        >
          <div className="section-view">
            <div className="book-image-container">
              <div className="book-image" />
              <div className="book-owner">
                <TbCrown className="book-owner-icon" />
                <div className="book-owner-name">{Book.studentName}</div>
              </div>
            </div>
            <div className="book-info">
              <div className="book-main-info-container">
                <div className="book-main-info">
                  <div className="title-book-name">{Book.name}</div>
                  <div className="price-field">
                    {Book.price === 0 ? "Free" : `₪${Book.price}`}
                  </div>
                </div>
                <div className="description-book-view">
                  {Book.longDescription}
                </div>
              </div>
              <div className="book-additional-info-container">
                <div className="book-additional-info">{Book.condition}</div>
                <div className="book-additional-info">{Book.university}</div>
                <div className="book-additional-info">{date}</div>
              </div>
              <div className="buttons">
                <button
                  onClick={() => {
                    reJoinRoom(decodedJwt.uid, Book.studentId);
                    setOwnerItem(Book.studentId);
                    setOptionMenu("Chat");
                    // setOpenChatArea(true);
                    setButtonCards("");
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
        </div>
      </div>
    </>
  );
};

export default BooksView;
