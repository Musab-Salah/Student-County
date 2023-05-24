import { useContext } from "react";
import RidesCxt from "../handlers/RideHandlers";

const useRides = () => {
  return useContext(RidesCxt);
};

export default useRides;
