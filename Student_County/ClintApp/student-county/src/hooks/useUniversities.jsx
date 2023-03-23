import { useContext } from "react";
import UniversitiesCxt from "../context/UniversityCommon";

const useUniversities = () => {
  return useContext(UniversitiesCxt);
};

export default useUniversities;
