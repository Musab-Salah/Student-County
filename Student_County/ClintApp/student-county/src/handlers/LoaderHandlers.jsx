import React, { createContext } from "react";
import useUniversities from "../hooks/useUniversities";
import useCollege from "../hooks/useCollege";
import useAuth from "../hooks/useAuth";
import useBooks from "../hooks/useBooks";
import usePatient from "../hooks/usePatient";
import useHousings from "../hooks/useHousings";

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
  const {
    HousingLoader,
    FormHousingLoader,
    ButtonsFormHousingLoader,
    DeleteButtonsFormHousingLoader,
  } = useHousings();
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
        HousingLoader,
        FormHousingLoader,
        ButtonsFormHousingLoader,
        DeleteButtonsFormHousingLoader,
      }}
    >
      {children}
    </LoaderCxt.Provider>
  );
}

export default LoaderCxt;
