import { useContext } from "react";
import BooksCxt from "../context/BooksCommon";

const useBooks = () => {
  return useContext(BooksCxt);
};

export default useBooks;
