import { useContext } from "react";
import CollegesCxt from "../context/CollegeCommon";

const useCollege = () => {
  return useContext(CollegesCxt);
};

export default useCollege;
