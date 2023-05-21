import React, { createContext, useState } from "react";
import RideServices from "../services/RideServices";
import useAuth from "../hooks/useAuth";

const RidesCxt = createContext();

export function RidesProvider({ children }) {
  const { decodedJwt, token } = useAuth();

  const [Rides, setRides] = useState([]); //all Rids
  const [MyRides, setMyRides] = useState([]); //all MyRides
  const [Ride, setRide] = useState("");
  const [RidesLoader, setRidesLoader] = useState("");


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
    RideServices.getRides(token)
      .then((res) => {
        setRides(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Rides...");
        cleanupError();
      });
  };
  const getMyAllRides = () => {
    RideServices.getMyAllRides(decodedJwt.uid, token)
      .then((res) => {
        setMyRides(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Rides..."));
  };
  const createRide = (Bo) => {
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
      });
  };

  const getRideById = (id) => {
    RideServices.getRideById(id, token)
      .then((res) => {
        setRide(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Ride...");
        cleanupError();
      });
  };

  const updateRide = (id, Bo) => {
    RideServices.updateRide(id, Bo, token)
      .then((res) => {
        setSuccess("Successfully Updated The Ride.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed update the Ride...");
        cleanupError();
      });
  };

  const deleteRide = (id) => {
    RideServices.deleteRide(id)
      .then((res) => {
        setSuccess("Successfully Deleted The Ride.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => setError("Failed delete the Ride..."));
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
        getRideById,
        getRides,
        createRide,
        updateRide,
        deleteRide,
        getMyAllRides,
        setSuccess,
        setRide,
      }}
    >
      {children}
    </RidesCxt.Provider>
  );
}

export default RidesCxt;
