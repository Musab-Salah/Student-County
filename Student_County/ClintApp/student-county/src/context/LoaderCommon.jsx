import React, { createContext, useState } from "react";
import useUniversities from "../hooks/useUniversities";
import useCollege from "./../hooks/useCollege";
import useAuth from "../hooks/useAuth";

const LoaderCxt = createContext();

export function LoaderProvider({ children }) {
  const { CollegesLoader } = useCollege();
  const { UniversityLoader } = useUniversities();
  const { AuthLoader } = useAuth();

  return (
    <LoaderCxt.Provider
      value={{ UniversityLoader, CollegesLoader, AuthLoader }}
    >
      {children}
    </LoaderCxt.Provider>
  );
}

export default LoaderCxt;
