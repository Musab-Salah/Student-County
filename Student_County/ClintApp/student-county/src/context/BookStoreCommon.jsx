import React, { createContext, useEffect, useMemo, useState } from "react";
import BookStoreServices from "../services/BookStoreServices";
import useAuth from "../hooks/useAuth";

const BooksCxt = createContext();

export function BooksProvider({ children }) {
  const { decodedJwt, token } = useAuth();

  const [Books, setBooks] = useState([]);
  const [MyBooks, setMyBooks] = useState([]);

  const [BookError, setError] = useState("");
  const [Book, setBook] = useState("");
  const [BookById, setBookById] = useState("");
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
  useEffect(() => {
    // eslint-disable-next-line
  }, []);
  useMemo(() => {
    // eslint-disable-next-line
  }, []);

  const getBooks = () => {
    BookStoreServices.getBooks(token)
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
    BookStoreServices.getMyAllBooks(decodedJwt.uid, token)
      .then((res) => {
        setMyBooks(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the books..."));
  };

  const createBook = (Bo) => {
    Bo.studentId = decodedJwt.uid;
    BookStoreServices.createBook(Bo, token)
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
    BookStoreServices.getBookById(id, token)
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
    BookStoreServices.updateBook(id, Bo, token)
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
    BookStoreServices.deleteBook(id, token)
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
        getBookById,
        getBooks,
        createBook,
        updateBook,
        deleteBook,
        Success,
        setSuccess,
        MyBooks,
        getMyAllBooks,
        setBook,
        BookById,
        setBookById,
      }}
    >
      {children}
    </BooksCxt.Provider>
  );
}

export default BooksCxt;
