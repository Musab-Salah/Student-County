import React, { createContext } from "react";
import useUniversities from "../hooks/useUniversities";
import useCollege from "../hooks/useCollege";
import useAuth from "../hooks/useAuth";
import useBooks from "../hooks/useBooks";
import usePatient from "../hooks/usePatient";

const LoaderCxt = createContext();

export function LoaderProvider({ children }) {
  const { CollegesLoader } = useCollege();
  const { UniversityLoader } = useUniversities();
  const { AuthLoader, isLogin } = useAuth();
  const {
    BooksLoader,
    FormBooksLoader,
    ButtonsFormBooksLoader,
    DeleteButtonsFormBooksLoader,
  } = useBooks();

  const {
    PatientLoader,
    FormPatientLoader,
    ButtonsFormPatientLoader,
    DeleteButtonsFormPatientLoader,
  } = usePatient();

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
        isLogin,
        PatientLoader,
        FormPatientLoader,
        ButtonsFormPatientLoader,
        DeleteButtonsFormPatientLoader,
      }}
    >
      {children}
    </LoaderCxt.Provider>
  );
}

export default LoaderCxt;
