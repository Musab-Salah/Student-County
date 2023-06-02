import React, { createContext, useState } from "react";
import PatientServices from "../services/PatientServices";
import useAuth from "../hooks/useAuth";

const PatientsCxt = createContext();

export function PatientsProvider({ children }) {
  const { decodedJwt, token } = useAuth();

  const [Patients, setPatients] = useState([]); //all Patients
  const [MyPatients, setMyPatients] = useState([]); //all user Patients
  const [Patient, setPatient] = useState("");
  const [PatientLoader, setPatientLoader] = useState("");
  const [FormPatientLoader, setFormPatientLoader] = useState("");
  const [ButtonsFormPatientLoader, setButtonsFormPatientLoader] = useState("");
  const [DeleteButtonsFormPatientLoader, setDeleteButtonsFormPatientLoader] =
    useState("");

  const [PatientError, setError] = useState("");
  const [Success, setSuccess] = useState("");

  const [PatientBo] = useState({
    id: "0",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    nationalIdNumber: "",
    AdditionalInformation: "",
    age: 0,
    typeOfTreatment: "",
    currentIllnesses: "",
    sensitivity: "",
    currentlyUsedMedicines: "",
    address: "",
    gender: "",
    userId: "",
  });

  //can select more than one
  const typeOfTreatments = [
    "Routine dental examination",
    "Partial Dentures (Moving)",
    "Remove caries (with silver or cosmetic fillings)",
    "Tooth extraction",
    "Pulling tooth nerve (Palm feels cold and hot)",
    "Treatment for children (6-13 years)",
    "Cleaning teeth and removing calcifications",
  ];
  //can select more than one
  const currentIllnessess = [
    "Diabetes",
    "Pressure",
    "Heart Disease",
    "Respiratory Diseases",
    "Liver Disease",
    "Allergy to medicines",
    "I have no illnesses",
  ];
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const cleanupError = () =>
    sleep(5000).then(() => {
      setError("");
    });
  const cleanupSuccess = () =>
    sleep(2000).then(() => {
      setSuccess("");
    });

  const getPatient = () => {
    setPatientLoader(true);
    PatientServices.getPatients(token)
      .then((res) => {
        setPatients(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Patients...");
        cleanupError();
      })
      .finally(() => setPatientLoader(false));
  };
  const getMyAllPatient = () => {
    setPatientLoader(true);
    PatientServices.getMyAllPatients(decodedJwt.uid, token)
      .then((res) => {
        setMyPatients(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Patients...");
        cleanupError();
      })
      .finally(() => setPatientLoader(false));
  };
  const createPatient = (Bo) => {
    setButtonsFormPatientLoader(true);
    Bo.studentId = decodedJwt.uid;
    PatientServices.createPatient(Bo, token)
      .then((res) => {
        setSuccess("Successfully Created The Patient.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed create the Patient...");
        cleanupError();
      })
      .finally(() => setButtonsFormPatientLoader(false));
  };

  const getPatientById = (id) => {
    setFormPatientLoader(true);
    PatientServices.getPatientById(id, token)
      .then((res) => {
        setPatient(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the Patient...");
        cleanupError();
      })
      .finally(() => setFormPatientLoader(false));
  };

  const updatePatient = (id, Bo) => {
    setButtonsFormPatientLoader(true);
    PatientServices.updatePatient(id, Bo, token)
      .then((res) => {
        setSuccess("Successfully Updated The Patient.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed update the Patient...");
        cleanupError();
      })
      .finally(() => setButtonsFormPatientLoader(false));
  };

  const deletePatient = (id) => {
    setDeleteButtonsFormPatientLoader(true);
    PatientServices.deletePatient(id, token)
      .then((res) => {
        setSuccess("Successfully Deleted The Patient.");
        cleanupSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed delete the Patient...");
        cleanupError();
      })
      .finally(() => setDeleteButtonsFormPatientLoader(false));
  };

  return (
    <PatientsCxt.Provider
      value={{
        Patients,
        Patient,
        PatientBo,
        PatientError,
        Success,
        MyPatients,
        getPatientById,
        getPatient,
        createPatient,
        updatePatient,
        deletePatient,
        setSuccess,
        getMyAllPatient,
        setPatient,
        PatientLoader,
        FormPatientLoader,
        ButtonsFormPatientLoader,
        DeleteButtonsFormPatientLoader,
        typeOfTreatments,
        currentIllnessess,
      }}
    >
      {children}
    </PatientsCxt.Provider>
  );
}

export default PatientsCxt;
