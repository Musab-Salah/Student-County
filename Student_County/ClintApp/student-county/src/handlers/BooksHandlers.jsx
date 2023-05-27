import React, { createContext, useState } from "react";
import BookServices from "../services/BookServices";
import useAuth from "../hooks/useAuth";

const BooksCxt = createContext();

export function BooksProvider({ children }) {
  const { decodedJwt, token } = useAuth();

  const [Books, setBooks] = useState([]); //all books
  const [MyBooks, setMyBooks] = useState([]); //all user books
  const [Book, setBook] = useState("");
  const [BooksLoader, setBooksLoader] = useState("");
  const [FormBooksLoader, setFormBooksLoader] = useState("");
  const [ButtonsFormBooksLoader, setButtonsFormBooksLoader] = useState("");
  const [DeleteButtonsFormBooksLoader, setDeleteButtonsFormBooksLoader] =
    useState("");

  const [BookError, setError] = useState("");
  const [Success, setSuccess] = useState("");

  const [BookBo] = useState({
    id: "0",
    name: "",
    theWay: "",
    price: 0,
    shortDescription: "",
    longDescription: "",
    studentId: "",
  });
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const cleanupError = () =>
    sleep(5000).then(() => {
      setError("");
    });
  const cleanupSuccess = () =>
    sleep(2000).then(() => {
      setSuccess("");
    });

  const getBooks = () => {
    setBooksLoader(true);
    BookServices.getBooks(token)
      .then((res) => {
        setBooks(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the books...");
        cleanupError();
      })
      .finally(() => setBooksLoader(false));
  };

  const getMyAllBooks = () => {
    setBooksLoader(true);
    BookServices.getMyAllBooks(decodedJwt.uid, token)
      .then((res) => {
        setMyBooks(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the books...");
        cleanupError();
      })
      .finally(() => setBooksLoader(false));
  };

  const createBook = (Bo) => {
    setButtonsFormBooksLoader(true);
    Bo.studentId = decodedJwt.uid;
    BookServices.createBook(Bo, token)
      .then((res) => {
        setSuccess("Successfully Created The Book.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed create the book...");
        cleanupError();
      })
      .finally(() => setButtonsFormBooksLoader(false));
  };

  const getBookById = (id) => {
    setFormBooksLoader(true);
    BookServices.getBookById(id, token)
      .then((res) => {
        setBook(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the book...");
        cleanupError();
      })
      .finally(() => setFormBooksLoader(false));
  };

  const updateBook = (id, Bo) => {
    setButtonsFormBooksLoader(true);
    BookServices.updateBook(id, Bo, token)
      .then((res) => {
        setSuccess("Successfully Updated The Book.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed update the book...");
        cleanupError();
      })
      .finally(() => setButtonsFormBooksLoader(false));
  };

  const deleteBook = (id) => {
    setDeleteButtonsFormBooksLoader(true);
    BookServices.deleteBook(id, token)
      .then((res) => {
        setSuccess("Successfully Deleted The Book.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed delete the book...");
        cleanupError();
      })
      .finally(() => setDeleteButtonsFormBooksLoader(false));
  };

  return (
    <BooksCxt.Provider
      value={{
        Books,
        Book,
        BookBo,
        BookError,
        Success,
        MyBooks,
        BooksLoader,
        FormBooksLoader,
        ButtonsFormBooksLoader,
        DeleteButtonsFormBooksLoader,
        getBookById,
        getBooks,
        createBook,
        updateBook,
        deleteBook,
        setSuccess,
        getMyAllBooks,
        setBook,
        setBooks,
        setMyBooks,
      }}
    >
      {children}
    </BooksCxt.Provider>
  );
}

export default BooksCxt;
