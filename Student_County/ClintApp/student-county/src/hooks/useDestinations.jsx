import { useContext } from "react";
import DestinationsCxt from "../handlers/DestinationHandlers";

const useDestinations = () => {
  return useContext(DestinationsCxt);
};

export default useDestinations;
