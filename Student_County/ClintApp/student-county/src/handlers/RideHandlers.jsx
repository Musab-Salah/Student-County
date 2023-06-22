import React, { createContext, useState } from "react";
import RideServices from "../services/RideServices";
import useAuth from "../hooks/useAuth";

const RidesCxt = createContext();

export function RidesProvider({ children }) {
  const { decodedJwt, token } = useAuth();

  const [Rides, setRides] = useState([]); //all Rids
  const [MyRides, setMyRides] = useState([]); //all MyRides
  const [Ride, setRide] = useState("");
  const [TimeSlot, setTimeSlot] = useState("");
  const [RideLoader, setRideLoader] = useState("");
  const [FormRideLoader, setFormRideLoader] = useState("");
  const [ButtonsFormRideLoader, setButtonsFormRideLoader] = useState("");
  const [DeleteButtonsFormRideLoader, setDeleteButtonsFormRideLoader] =
    useState("");

  const [RideError, setError] = useState("");
  const [RideSuccess, setRideSuccess] = useState("");

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
  const cleanupRideSuccess = () =>
    sleep(2000).then(() => {
      setRideSuccess("");
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
        setRideSuccess("RideSuccessfully Created The Ride.");
        cleanupRideSuccess();
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
  const getTimeSlot = (id) => {
    setFormRideLoader(true);
    RideServices.getTimeSlot(id, token)
      .then((res) => {
        setTimeSlot(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Time Slots...");
        cleanupError();
      })
      .finally(() => setFormRideLoader(false));
  };

  const updateRide = (id, Bo) => {
    setButtonsFormRideLoader(true);
    RideServices.updateRide(id, Bo, token)
      .then((res) => {
        setRideSuccess("RideSuccessfully Updated The Ride.");
        cleanupRideSuccess();
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
        setRideSuccess("RideSuccessfully Deleted The Ride.");
        cleanupRideSuccess();
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
        RideSuccess,
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
        setRideSuccess,
        setRide,
        setRides,
        TimeSlot,
        setTimeSlot,
        getTimeSlot,
      }}
    >
      {children}
    </RidesCxt.Provider>
  );
}

export default RidesCxt;
