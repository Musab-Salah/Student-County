import { useContext } from "react";
import RidesCxt from "../context/RideCommon";

const useRides = () => {
  return useContext(RidesCxt);
};

export default useRides;
