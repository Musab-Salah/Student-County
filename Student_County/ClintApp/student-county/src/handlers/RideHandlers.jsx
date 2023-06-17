import React, { createContext, useState } from "react";
import RideServices from "../services/RideServices";
import useAuth from "../hooks/useAuth";

const RidesCxt = createContext();

export function RidesProvider({ children }) {
  const { decodedJwt, token } = useAuth();

  const [Rides, setRides] = useState([]); //all Rids
  const [MyRides, setMyRides] = useState([]); //all MyRides
  const [Ride, setRide] = useState("");
  const [RideLoader, setRideLoader] = useState("");
  const [FormRideLoader, setFormRideLoader] = useState("");
  const [ButtonsFormRideLoader, setButtonsFormRideLoader] = useState("");
  const [DeleteButtonsFormRideLoader, setDeleteButtonsFormRideLoader] =
    useState("");

  const [RideError, setError] = useState("");
  const [Success, setSuccess] = useState("");

  const [RideBo] = useState({
    id: "0",
    emptySeats: "",
    carDescription: "",
    shortDescription: "",
    longDescription: "",
    studentId: "",
    destinationId: "",
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

  const getRides = () => {
    setRideLoader(true);
    RideServices.getRides(token)
      .then((res) => {
        setRides(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Rides...");
        cleanupError();
      })
      .finally(() => setRideLoader(false));
  };
  const getMyAllRides = () => {
    setRideLoader(true);

    RideServices.getMyAllRides(decodedJwt.uid, token)
      .then((res) => {
        setMyRides(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Rides..."))
      .finally(() => setRideLoader(false));
  };
  const createRide = (Bo) => {
    setButtonsFormRideLoader(true);

    Bo.studentId = decodedJwt.uid;
    RideServices.createRide(Bo, token)
      .then((res) => {
        setSuccess("Successfully Created The Ride.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed create the Ride...");
        cleanupError();
      })
      .finally(() => setButtonsFormRideLoader(false));
  };

  const getRideById = (id) => {
    setFormRideLoader(true);
    RideServices.getRideById(id, token)
      .then((res) => {
        setRide(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Ride...");
        cleanupError();
      })
      .finally(() => setFormRideLoader(false));
  };

  const updateRide = (id, Bo) => {
    setButtonsFormRideLoader(true);
    RideServices.updateRide(id, Bo, token)
      .then((res) => {
        setSuccess("Successfully Updated The Ride.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed update the Ride...");
        cleanupError();
      })
      .finally(() => setButtonsFormRideLoader(false));
  };

  const deleteRide = (id) => {
    setDeleteButtonsFormRideLoader(true);
    RideServices.deleteRide(id, token)
      .then((res) => {
        setSuccess("Successfully Deleted The Ride.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => setError("Failed delete the Ride..."))
      .finally(() => setDeleteButtonsFormRideLoader(false));
  };

  return (
    <RidesCxt.Provider
      value={{
        Rides,
        Ride,
        RideBo,
        RideError,
        Success,
        MyRides,
        RideLoader,
        FormRideLoader,
        ButtonsFormRideLoader,
        DeleteButtonsFormRideLoader,
        getRideById,
        getRides,
        createRide,
        updateRide,
        deleteRide,
        getMyAllRides,
        setSuccess,
        setRide,
        setRides,
      }}
    >
      {children}
    </RidesCxt.Provider>
  );
}

export default RidesCxt;
