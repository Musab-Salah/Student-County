import React, { createContext, useState } from "react";
import HousingServices from "../services/HousingServices";
import useAuth from "../hooks/useAuth";

const HousingsCxt = createContext();

export function HousingsProvider({ children }) {
  const { decodedJwt, token } = useAuth();

  const [Housings, setHousings] = useState([]); //all Housings
  const [MyHousings, setMyHousings] = useState([]); //all user Housings
  const [Housing, setHousing] = useState("");

  const [HousingError, setError] = useState("");
  const [Success, setSuccess] = useState("");

  const [HousingBo] = useState({
    id: "0",
    name: "",
    location: "",
    typeOfContract: "",
    price: "",
    shortDescription: "",
    longDescription: "",
    studentId: "",
  });

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const cleanupError = () =>
    sleep(5000).then(() => {
      setError("");
    });
  const cleanupSuccess = () =>
    sleep(2000).then(() => {
      setSuccess("");
    });

  const getHousings = () => {
    HousingServices.getHousings(token)
      .then((res) => {
        setHousings(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Housings...");
        cleanupError();
      });
  };
  const getMyAllHousings = () => {
    HousingServices.getMyAllHousings(decodedJwt.uid, token)
      .then((res) => {
        setMyHousings(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Housing..."));
  };

  const createHousing = (Bo) => {
    Bo.studentId = decodedJwt.uid;
    HousingServices.createHousing(Bo, token)
      .then((res) => {
        setSuccess("Successfully Created The Housing.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed create the Housing...");
        cleanupError();
      });
  };

  const getHousingById = (id) => {
    HousingServices.getHousingById(id, token)
      .then((res) => {
        setHousing(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Housing...");
        cleanupError();
      });
  };

  const updateHousing = (id, Bo) => {
    HousingServices.updateHousing(id, Bo, token)
      .then((res) => {
        setSuccess("Successfully Updated The Housing.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed update the Housing...");
        cleanupError();
      });
  };

  const deleteHousing = (id) => {
    HousingServices.deleteHousing(id, token)
      .then((res) => {
        setSuccess("Successfully Deleted The Housing.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed delete the Housing...");
        cleanupError();
      });
  };

  return (
    <HousingsCxt.Provider
      value={{
        Housings,
        Housing,
        HousingBo,
        HousingError,
        Success,
        MyHousings,
        getHousingById,
        getHousings,
        createHousing,
        updateHousing,
        deleteHousing,
        getMyAllHousings,
        setHousing,
        setSuccess,
      }}
    >
      {children}
    </HousingsCxt.Provider>
  );
}

export default HousingsCxt;
