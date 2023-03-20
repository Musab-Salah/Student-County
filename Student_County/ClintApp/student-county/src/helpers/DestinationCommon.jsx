import React, { createContext, useEffect, useState } from "react";
import DestinationServices from "../services/DestinationServices";

const DestinationsCxt = createContext();

export function DestinationsProvider({ children }) {
  const [Destinations, setDestinations] = useState([]);
  const [DestinationError, setError] = useState("Loading");
  const [Destination, setDestination] = useState("Loading");

  const [DestinationBo] = useState({
    id: "0",
    name: "",
  });

  useEffect(() => {
    getDestinations();
  }, []);
  const getDestinations = () => {
    DestinationServices.getDestinations()
      .then((res) => {
        setDestinations(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Destinations..."));
  };

  const createDestination = (Bo) => {
    DestinationServices.createDestination(Bo)
      .then((res) => {
        setDestination(res.data);
        setError(null);
      })
      .catch(() => setError("Failed create the Destination..."));
  };

  const getDestinationById = (id) => {
    DestinationServices.getDestinationById(id)
      .then((res) => {
        setDestination(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Destination..."));
  };

  const updateDestination = (id, Bo) => {
    DestinationServices.updateDestination(id, Bo)
      .then((res) => {
        setDestination(res.data);
        setError(null);
      })
      .catch(() => setError("Failed update the Destination..."));
  };

  const deleteDestination = (id) => {
    DestinationServices.deleteDestination(id)
      .then((res) => {
        setDestination(res.data);
        setError(null);
      })
      .catch(() => setError("Failed delete the Destination..."));
  };

  return (
    <DestinationsCxt.Provider
      value={{
        Destinations,
        Destination,
        DestinationBo,
        DestinationError,
        getDestinationById,
        createDestination,
        getDestinations,
        updateDestination,
        deleteDestination,
      }}
    >
      {children}
    </DestinationsCxt.Provider>
  );
}

export default DestinationsCxt;
