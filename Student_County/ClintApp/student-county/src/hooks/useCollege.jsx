import { useContext } from "react";
import CollegesCxt from "../handlers/CollegeHandlers";

const useCollege = () => {
  return useContext(CollegesCxt);
};

export default useCollege;
