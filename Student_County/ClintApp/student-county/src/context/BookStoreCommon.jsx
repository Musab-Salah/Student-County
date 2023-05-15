import React, { createContext, useEffect, useMemo, useState } from "react";
import BookStoreServices from "../services/BookStoreServices";
import useAuth from "../hooks/useAuth";

const BooksCxt = createContext();

export function BooksProvider({ children }) {
  const { decodedJwt, token } = useAuth();

  const [Books, setBooks] = useState([]);
  const [MyBooks, setMyBooks] = useState([]);

  const [BookError, setError] = useState();
  const [Book, setBook] = useState("Loading");
  const [Success, setSuccess] = useState();

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
  const timer = () =>
    sleep(3000).then(() => {
      setError("");
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
      .catch(() => setError("Failed bring the books..."));
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
        setBook(res.data);
        getMyAllBooks();
        getMyAllBooks();
        setSuccess(true);
        setError(null);
      })
      .catch(() =>{
        setError("Failed create the book...")
        timer();
      }
  )};

  const getBookById = (id) => {
    BookStoreServices.getBookStoreById(id)
      .then((res) => {
        setBook(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the book..."));
  };

  const updateBook = (id, Bo) => {
    BookStoreServices.updateBookStore(id, Bo)
      .then((res) => {
        setBook(res.data);
        setSuccess(true);
        setError(null);
      })
      .catch(() => setError("Failed update the book..."));
  };

  const deleteBook = (id) => {
    BookStoreServices.deleteBookStore(id)
      .then((res) => {
        setBook(res.data);
        setSuccess(true);
        setError(null);
      })
      .catch(() => setError("Failed delete the book..."));
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
      }}
    >
      {children}
    </BooksCxt.Provider>
  );
}

export default BooksCxt;
