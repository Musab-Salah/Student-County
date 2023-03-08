import React, { createContext, useEffect, useState } from "react";
import RideServices from "../services/RideServices";

const RidesCxt = createContext();

export function RidesProvider({ children }) {
  const [Rides, setRides] = useState([]);
  const [error, setError] = useState("Loading");
  const [Ride, setRide] = useState("Loading");

  const [RideBo] = useState({
    id: "0",
    name: "",
    location: "",
    studentId: "",
  });

  useEffect(() => {
    loadRide();
  }, []);
  const loadRide = () => {
    RideServices.getRides()
      .then((res) => {
        setRides(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Rides..."));
  };

  const createRide = (Bo) => {
    RideServices.createRide(Bo)
      .then((res) => {
        setRide(res.data);
        setError(null);
      })
      .catch(() => setError("Failed create the Ride..."));
  };

  const getRideById = (id) => {
    RideServices.getRideById(id)
      .then((res) => {
        setRide(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Ride..."));
  };

  const updateRide = (id, Bo) => {
    RideServices.updateRide(id, Bo)
      .then((res) => {
        setRide(res.data);
        setError(null);
      })
      .catch(() => setError("Failed update the Ride..."));
  };

  const deleteRide = (id) => {
    RideServices.deleteRide(id)
      .then((res) => {
        setRide(res.data);
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
        error,
        getRideById,
        createRide,
        updateRide,
        deleteRide,
      }}
    >
      {children}
    </RidesCxt.Provider>
  );
}

export default RidesCxt;
