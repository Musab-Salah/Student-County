import { useContext } from "react";
import UniversitiesCxt from "../handlers/UniversityHandlers";

const useUniversities = () => {
  return useContext(UniversitiesCxt);
};

export default useUniversities;
