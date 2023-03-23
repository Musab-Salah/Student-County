import { useContext } from "react";
import BooksCxt from "../context/BookStoreCommon";

const useBooks = () => {
  return useContext(BooksCxt);
};

export default useBooks;
