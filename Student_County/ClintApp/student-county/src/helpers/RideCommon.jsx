import React, { createContext, useEffect, useState, useContext } from "react";
import RideServices from "../services/RideServices";
import AuthCxt from "../helpers/AuthCommon";

const RidesCxt = createContext();

export function RidesProvider({ children }) {
  const { decodedJwt } = useContext(AuthCxt);

  const [Rides, setRides] = useState([]);
  const [RideError, setError] = useState();
  const [Ride, setRide] = useState("Loading");

  const [RideBo] = useState({
    id: "0",
    emptySeats: "",
    carDescription: "",
    studentId: "",
    destinationId: "",
  });

  useEffect(() => {
    //getRides();
  }, []);
  const getRides = () => {
    RideServices.getRides()
      .then((res) => {
        setRides(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Rides..."));
  };

  const createRide = (Bo) => {
    Bo.studentId = decodedJwt.uid;
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
        RideError,
        getRideById,
        getRides,
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
