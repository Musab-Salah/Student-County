import React, { createContext, useEffect, useState } from "react";
import UniversityServices from "../services/UniversityServices";

const UniversitiesCxt = createContext();

export function UniversitiesProvider({ children }) {
  const [Universities, setUniversities] = useState([]);
  const [error, setError] = useState("Loading");
  const [University, setUniversity] = useState("Loading");

  const [UniversityBo] = useState({
    id: "0",
    name: "",
    emailDomainName: "",
  });

  useEffect(() => {
    loadUniversity();
  }, []);
  const loadUniversity = () => {
    UniversityServices.getUniversities()
      .then((res) => {
        setUniversities(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the universities..."));
  };

  const createUniversity = (UniBo) => {
    UniversityServices.createUniversity(UniBo)
      .then((res) => {
        setUniversities(res.data);
        setError(null);
      })
      .catch(() => setError("Failed create the university..."));
  };

  const getUniversityById = (id) => {
    UniversityServices.getUniversityById(id)
      .then((res) => {
        setUniversity(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the university..."));
  };

  const updateUniversity = (id, UniBo) => {
    UniversityServices.updateUniversity(id, UniBo)
      .then((res) => {
        setUniversity(res.data);
        setError(null);
      })
      .catch(() => setError("Failed update the university..."));
  };

  const deleteUniversity = (id) => {
    UniversityServices.deleteUniversity(id)
      .then((res) => {
        setUniversity(res.data);
        setError(null);
      })
      .catch(() => setError("Failed delete the university..."));
  };

  return (
    <UniversitiesCxt.Provider
      value={{
        Universities,
        University,
        UniversityBo,
        error,
        getUniversityById,
        createUniversity,
        updateUniversity,
        deleteUniversity,
      }}
    >
      {children}
    </UniversitiesCxt.Provider>
  );
}

export default UniversitiesCxt;
