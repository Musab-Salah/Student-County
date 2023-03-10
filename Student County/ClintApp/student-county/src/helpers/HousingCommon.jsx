import React, { createContext, useEffect, useState } from "react";
import HousingServices from "../services/HousingServices";

const HousingsCxt = createContext();

export function HousingsProvider({ children }) {
  const [Housings, setHousings] = useState([]);
  const [HousingError, setError] = useState("Loading");
  const [Housing, setHousing] = useState("Loading");

  const [HousingBo] = useState({
    id: "0",
    name: "",
    location: "",
    studentId: "",
  });

  useEffect(() => {
    loadHousing();
  }, []);
  const loadHousing = () => {
    HousingServices.getHousings()
      .then((res) => {
        setHousings(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Housings..."));
  };

  const createHousing = (Bo) => {
    HousingServices.createHousing(Bo)
      .then((res) => {
        setHousing(res.data);
        setError(null);
      })
      .catch(() => setError("Failed create the Housing..."));
  };

  const getHousingById = (id) => {
    HousingServices.getHousingById(id)
      .then((res) => {
        setHousing(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Housing..."));
  };

  const updateHousing = (id, Bo) => {
    HousingServices.updateHousing(id, Bo)
      .then((res) => {
        setHousing(res.data);
        setError(null);
      })
      .catch(() => setError("Failed update the Housing..."));
  };

  const deleteHousing = (id) => {
    HousingServices.deleteHousing(id)
      .then((res) => {
        setHousing(res.data);
        setError(null);
      })
      .catch(() => setError("Failed delete the Housing..."));
  };

  return (
    <HousingsCxt.Provider
      value={{
        Housings,
        Housing,
        HousingBo,
        HousingError,
        getHousingById,
        createHousing,
        updateHousing,
        deleteHousing,
      }}
    >
      {children}
    </HousingsCxt.Provider>
  );
}

export default HousingsCxt;
