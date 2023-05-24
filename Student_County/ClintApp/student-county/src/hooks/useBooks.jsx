import { useContext } from "react";
import BooksCxt from "../handlers/BooksHandlers";

const useBooks = () => {
  return useContext(BooksCxt);
};

export default useBooks;
