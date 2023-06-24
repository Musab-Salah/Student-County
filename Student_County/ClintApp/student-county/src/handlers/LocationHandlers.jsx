import React, { createContext, useEffect, useState } from "react";
import LocationServices from "../services/LocationServices";
import useAuth from "../hooks/useAuth";

const LocationCxt = createContext();

export function LocationProvider({ children }) {
  const [Locations, setLocations] = useState([]);
  const [Location, setLocation] = useState("");
  const [LocationForm, setLocationForm] = useState("");
  const { decodedJwt, token } = useAuth();

  const [LocationLoader, setLocationLoader] = useState("");
  const [FormLocationLoader, setFormLocationLoader] = useState("");
  const [ButtonsFormLocationLoader, setButtonsFormLocationLoader] =
    useState("");
  const [DeleteButtonsFormLocationLoader, setDeleteButtonsFormLocationLoader] =
    useState("");

  const [LocationError, setError] = useState("");
  const [LocationSuccess, setLocationSuccess] = useState("");
  const [LocationBo] = useState({
    id: "0",
    name: "",
  });
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const cleanupError = () =>
    sleep(5000).then(() => {
      setError("");
    });
  const cleanupSuccess = () =>
    sleep(2000).then(() => {
      setLocationSuccess("");
    });

  const getLocations = () => {
    setLocationLoader(true);
    LocationServices.getLocations(token)
      .then((res) => {
        setLocations(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Locations...");
        cleanupError();
      })
      .finally(() => setLocationLoader(false));
  };

  const createLocation = (Bo) => {
    setButtonsFormLocationLoader(true);
    Bo.studentId = decodedJwt.uid;
    LocationServices.createLocation(Bo, token)
      .then((res) => {
        setLocationSuccess("Successfully created location");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed create the Location...");
        cleanupError();
      })
      .finally(() => setButtonsFormLocationLoader(false));
  };

  const getLocationById = (id) => {
    setFormLocationLoader(true);
    LocationServices.getLocationById(id, token)
      .then((res) => {
        setLocation(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Location...");
        cleanupError();
      })
      .finally(() => setFormLocationLoader(false));
  };
  const getLocationByIdform = (id) => {
    setFormLocationLoader(true);
    LocationServices.getLocationById(id, token)
      .then((res) => {
        setLocationForm(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Location...");
        cleanupError();
      })
      .finally(() => setFormLocationLoader(false));
  };

  const updateLocation = (id, Bo) => {
    setButtonsFormLocationLoader(true);
    LocationServices.updateLocation(id, Bo, token)
      .then((res) => {
        setLocationSuccess("Success!");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed update the Location...");
        cleanupError();
      })
      .finally(() => setButtonsFormLocationLoader(false));
  };

  const deleteLocation = (id) => {
    setDeleteButtonsFormLocationLoader(true);
    LocationServices.deleteLocation(id, token)
      .then((res) => {
        setLocationSuccess("Success!");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed delete the Location...");
        cleanupError();
      })
      .finally(() => setDeleteButtonsFormLocationLoader(false));
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
        setLocation,
        getLocationByIdform,
        LocationForm,
        setLocationForm,
        LocationLoader,
        FormLocationLoader,
        ButtonsFormLocationLoader,
        DeleteButtonsFormLocationLoader,
        LocationSuccess,
      }}
    >
      {children}
    </LocationCxt.Provider>
  );
}

export default LocationCxt;
