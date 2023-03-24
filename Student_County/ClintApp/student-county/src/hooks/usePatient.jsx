import { useContext } from "react";
import PatientsCxt from "../context/PatientCommon";

const usePatient = () => {
  return useContext(PatientsCxt);
};

export default usePatient;
