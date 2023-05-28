import React, { createContext, useEffect, useState } from "react";
import CollegeServices from "../services/CollegeServices";

const CollegesCxt = createContext();

export function CollegesProvider({ children }) {
  const [Colleges, setColleges] = useState([]);
  const [CollegeError, setError] = useState("Loading");
  const [College, setCollege] = useState("Loading");
  const [CollegesLoader, setCollegesLoader] = useState("");

  const [CollegeBo] = useState({
    id: "0",
    name: "",
  });

  useEffect(() => {
    //setCollegesLoader(true);
    getColleges();
  }, []);
  const getColleges = () => {
    CollegeServices.getColleges()
      .then((res) => {
        setColleges(res.data);
        setCollegesLoader(false);
        setError(null);
      })
      .catch(() => setError("Failed bring the Colleges..."));
  };

  const createCollege = (Bo) => {
    CollegeServices.createCollege(Bo)
      .then((res) => {
        setCollege(res.data);
        setError(null);
      })
      .catch(() => setError("Failed create the College..."));
  };

  const getCollegeById = (id) => {
    CollegeServices.getCollegeById(id)
      .then((res) => {
        setCollege(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the College..."));
  };

  const updateCollege = (id, Bo) => {
    CollegeServices.updateCollege(id, Bo)
      .then((res) => {
        setCollege(res.data);
        setError(null);
      })
      .catch(() => setError("Failed update the College..."));
  };

  const deleteCollege = (id) => {
    CollegeServices.deleteCollege(id)
      .then((res) => {
        setCollege(res.data);
        setError(null);
      })
      .catch(() => setError("Failed delete the College..."));
  };

  return (
    <CollegesCxt.Provider
      value={{
        Colleges,
        College,
        CollegeBo,
        CollegeError,
        CollegesLoader,
        getCollegeById,
        createCollege,
        updateCollege,
        deleteCollege,
      }}
    >
      {children}
    </CollegesCxt.Provider>
  );
}

export default CollegesCxt;
