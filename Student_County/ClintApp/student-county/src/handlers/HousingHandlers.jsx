import React, { createContext, useState } from "react";
import HousingServices from "../services/HousingServices";
import useAuth from "../hooks/useAuth";

const HousingsCxt = createContext();

export function HousingsProvider({ children }) {
  const { decodedJwt, token } = useAuth();

  const [Housings, setHousings] = useState([]); //all Housings
  const [MyHousings, setMyHousings] = useState([]); //all user Housings
  const [Housing, setHousing] = useState("");
  const [HousingLoader, setHousingLoader] = useState("");
  const [FormHousingLoader, setFormHousingLoader] = useState("");
  const [ButtonsFormHousingLoader, setButtonsFormHousingLoader] = useState("");
  const [DeleteButtonsFormHousingLoader, setDeleteButtonsFormHousingLoader] =
    useState("");
  const [HousingError, setError] = useState("");
  const [HousingSuccess, setHousingSuccess] = useState("");

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
  const cleanupHousingSuccess = () =>
    sleep(2000).then(() => {
      setHousingSuccess("");
    });

  const getHousings = () => {
    setHousingLoader(true);
    HousingServices.getHousings(token)
      .then((res) => {
        setHousings(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Housings...");
        cleanupError();
      })
      .finally(() => setHousingLoader(false));
  };
  const getMyAllHousings = () => {
    setHousingLoader(true);
    HousingServices.getMyAllHousings(decodedJwt.uid, token)
      .then((res) => {
        setMyHousings(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Housing..."))
      .finally(() => setHousingLoader(false));
  };

  const createHousing = (Bo) => {
    setButtonsFormHousingLoader(true);
    Bo.studentId = decodedJwt.uid;
    HousingServices.createHousing(Bo, token)
      .then((res) => {
        setHousingSuccess("HousingSuccessfully Created The Housing.");
        cleanupHousingSuccess();
        setError(null);
      })
      .catch((er) => {
        if (
          er.response.data.includes("You can't create more than one Housing")
        ) {
          setError("You can't create more than one Housing");
        } else {
          setError("Failed to create the Housing...");
        }
        cleanupError();
      })
      .finally(() => setButtonsFormHousingLoader(false));
  };

  const getHousingById = (id) => {
    setFormHousingLoader(true);
    HousingServices.getHousingById(id, token)
      .then((res) => {
        setHousing(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Housing...");
        cleanupError();
      })
      .finally(() => setFormHousingLoader(false));
  };

  const updateHousing = (id, Bo) => {
    setButtonsFormHousingLoader(true);
    HousingServices.updateHousing(id, Bo, token)
      .then((res) => {
        setHousingSuccess("HousingSuccessfully Updated The Housing.");
        cleanupHousingSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed update the Housing...");
        cleanupError();
      })
      .finally(() => setButtonsFormHousingLoader(false));
  };

  const deleteHousing = (id) => {
    setDeleteButtonsFormHousingLoader(true);
    HousingServices.deleteHousing(id, token)
      .then((res) => {
        setHousingSuccess("HousingSuccessfully Deleted The Housing.");
        cleanupHousingSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed delete the Housing...");
        cleanupError();
      })
      .finally(() => setDeleteButtonsFormHousingLoader(false));
  };

  return (
    <HousingsCxt.Provider
      value={{
        Housings,
        Housing,
        HousingBo,
        HousingError,
        HousingSuccess,
        MyHousings,
        getHousingById,
        getHousings,
        createHousing,
        updateHousing,
        deleteHousing,
        getMyAllHousings,
        setHousing,
        setHousingSuccess,
        setHousingLoader,
        HousingLoader,
        FormHousingLoader,
        ButtonsFormHousingLoader,
        DeleteButtonsFormHousingLoader,
        setHousings,
        setError,
        cleanupError,
      }}
    >
      {children}
    </HousingsCxt.Provider>
  );
}

export default HousingsCxt;
