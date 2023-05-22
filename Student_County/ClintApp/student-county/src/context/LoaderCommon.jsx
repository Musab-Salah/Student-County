import React, { createContext } from "react";
import useUniversities from "../hooks/useUniversities";
import useCollege from "./../hooks/useCollege";
import useAuth from "../hooks/useAuth";
import useBooks from "./../hooks/useBooks";

const LoaderCxt = createContext();

export function LoaderProvider({ children }) {
  const { CollegesLoader } = useCollege();
  const { UniversityLoader } = useUniversities();
  const { AuthLoader } = useAuth();
  const {
    BooksLoader,
    FormBooksLoader,
    ButtonsFormBooksLoader,
    DeleteButtonsFormBooksLoader,
  } = useBooks();

  return (
    <LoaderCxt.Provider
      value={{
        UniversityLoader,
        CollegesLoader,
        AuthLoader,
        BooksLoader,
        FormBooksLoader,
        ButtonsFormBooksLoader,
        DeleteButtonsFormBooksLoader,
      }}
    >
      {children}
    </LoaderCxt.Provider>
  );
}

export default LoaderCxt;
