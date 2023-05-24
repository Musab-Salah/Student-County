import { useContext } from "react";
import PatientsCxt from "../handlers/PatientHandlers";

const usePatient = () => {
  return useContext(PatientsCxt);
};

export default usePatient;
