import React, { createContext, useEffect, useState } from "react";
import BookStoreServices from "../services/BookStoreServices";

const BooksCxt = createContext();

export function BooksProvider({ children }) {
  const [Books, setBooks] = useState([]);
  const [BookError, setError] = useState("Loading");
  const [Book, setBook] = useState("Loading");

  const [BookBo] = useState({
    id: "0",
    bookName: "",
    theWay: "",
    price: "",
    studentId: "",
  });

  useEffect(() => {
    loadBooks();
  }, []);
  const loadBooks = () => {
    BookStoreServices.getBooks()
      .then((res) => {
        setBooks(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the books..."));
  };
  const createBook = (Bo) => {
    BookStoreServices.createBookStore(Bo)
      .then((res) => {
        setBook(res.data);
        setError(null);
      })
      .catch(() => setError("Failed create the book..."));
  };

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
        setError(null);
      })
      .catch(() => setError("Failed update the book..."));
  };

  const deleteBook = (id) => {
    BookStoreServices.deleteBookStore(id)
      .then((res) => {
        setBook(res.data);
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
        createBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BooksCxt.Provider>
  );
}

export default BooksCxt;
