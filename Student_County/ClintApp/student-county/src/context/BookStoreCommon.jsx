import React, { createContext, useEffect, useState } from "react";
import BookStoreServices from "../services/BookStoreServices";
import AuthVerify from "../utils/AuthVerify";
import useAuth from "../hooks/useAuth";

const BooksCxt = createContext();

export function BooksProvider({ children }) {
  const { decodedJwt, token } = useAuth();

  const [Books, setBooks] = useState([]);
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

  useEffect(() => {}, []);
  const getBooks = () => {
    BookStoreServices.getBooks()
      .then((res) => {
        setBooks(res.data);
        setSuccess(true);
        setError(null);
      })
      .catch(() => setError("Failed bring the books..."));
  };
  const createBook = (Bo) => {
    Bo.studentId = decodedJwt.uid;
    AuthVerify.AuthVerify();
    BookStoreServices.createBook(Bo, token)
      .then((res) => {
        setBook(res.data);
        setSuccess(true);
        setError(null);
      })
      .catch(() => setError("Failed create the book..."));
  };

  const getBookById = (id) => {
    BookStoreServices.getBookStoreById(id)
      .then((res) => {
        setBook(res.data);
        setSuccess(true);
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
      }}
    >
      {children}
    </BooksCxt.Provider>
  );
}

export default BooksCxt;
