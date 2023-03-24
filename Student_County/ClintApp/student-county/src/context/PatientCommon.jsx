import React, { createContext, useEffect, useState } from "react";
import PatientServices from "../services/PatientServices";
import useAuth from "../hooks/useAuth";

const PatientsCxt = createContext();

export function PatientsProvider({ children }) {
  const { decodedJwt } = useAuth();

  const [Patients, setPatients] = useState([]);
  const [PatientError, setError] = useState();
  const [Patient, setPatient] = useState("Loading");

  const [PatientBo] = useState({
    id: "0",
    name: "",
    location: "",
    studentId: "",
  });

  useEffect(() => {
    // getPatients();
  }, []);
  const getPatients = () => {
    PatientServices.getPatients()
      .then((res) => {
        setPatients(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Patients..."));
  };

  const createPatient = (Bo) => {
    Bo.studentId = decodedJwt.uid;
    PatientServices.createPatient(Bo)
      .then((res) => {
        setPatient(res.data);
        setError(null);
      })
      .catch(() => setError("Failed create the Patient..."));
  };

  const getPatientById = (id) => {
    PatientServices.getPatientById(id)
      .then((res) => {
        setPatient(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Patient..."));
  };

  const updatePatient = (id, Bo) => {
    PatientServices.updatePatient(id, Bo)
      .then((res) => {
        setPatient(res.data);
        setError(null);
      })
      .catch(() => setError("Failed update the Patient..."));
  };

  const deletePatient = (id) => {
    PatientServices.deletePatient(id)
      .then((res) => {
        setPatient(res.data);
        setError(null);
      })
      .catch(() => setError("Failed delete the Patient..."));
  };

  return (
    <PatientsCxt.Provider
      value={{
        Patients,
        Patient,
        PatientBo,
        PatientError,
        getPatientById,
        getPatients,
        createPatient,
        updatePatient,
        deletePatient,
      }}
    >
      {children}
    </PatientsCxt.Provider>
  );
}

export default PatientsCxt;
