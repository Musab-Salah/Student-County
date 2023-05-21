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
    BookServices.getBooks(token)
      .then((res) => {
        setBooks(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the books...");
        cleanupError();
      });
  };

  const getMyAllBooks = () => {
    BookServices.getMyAllBooks(decodedJwt.uid, token)
      .then((res) => {
        setMyBooks(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the books..."));
  };

  const createBook = (Bo) => {
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
      });
  };

  const getBookById = (id) => {
    BookServices.getBookById(id, token)
      .then((res) => {
        setBook(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the book...");
        cleanupError();
      });
  };

  const updateBook = (id, Bo) => {
    console.log(Bo);
    BookServices.updateBook(id, Bo, token)
      .then((res) => {
        setSuccess("Successfully Updated The Book.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed update the book...");
        cleanupError();
      });
  };

  const deleteBook = (id) => {
    BookServices.deleteBook(id, token)
      .then((res) => {
        setSuccess("Successfully Deleted The Book.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed delete the book...");
        cleanupError();
      });
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
