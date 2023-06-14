import React, { createContext, useEffect, useState } from "react";
import LocationServices from "../services/LocationServices";

const LocationCxt = createContext();

export function LocationProvider({ children }) {
  const [Locations, setLocations] = useState([]);
  const [LocationError, setError] = useState("Loading");
  const [Location, setLocation] = useState("Loading");
  const [LocationsLoader, setLocationsLoader] = useState("");


  const [LocationBo] = useState({
    id: "0",
    name: "",
  });

  useEffect(() => {}, []);
  const getLocations = () => {
    LocationServices.getLocations()
      .then((res) => {
        setLocations(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Locations..."));
  };

  const createLocation = (Bo) => {
    LocationServices.createLocation(Bo)
      .then((res) => {
        setLocation(res.data);
        setError(null);
      })
      .catch(() => setError("Failed create the Location..."));
  };

  const getLocationById = (id) => {
    LocationServices.getLocationById(id)
      .then((res) => {
        setLocation(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Location..."));
  };

  const updateLocation = (id, Bo) => {
    LocationServices.updateLocation(id, Bo)
      .then((res) => {
        setLocation(res.data);
        setError(null);
      })
      .catch(() => setError("Failed update the Location..."));
  };

  const deleteLocation = (id) => {
    LocationServices.deleteLocation(id)
      .then((res) => {
        setLocation(res.data);
        setError(null);
      })
      .catch(() => setError("Failed delete the Location..."));
  };

  return (
    <LocationCxt.Provider
      value={{
        Locations,
        Location,
        LocationBo,
        LocationError,
        getLocationById,
        createLocation,
        getLocations,
        updateLocation,
        deleteLocation,
      }}
    >
      {children}
    </LocationCxt.Provider>
  );
}

export default LocationCxt;
