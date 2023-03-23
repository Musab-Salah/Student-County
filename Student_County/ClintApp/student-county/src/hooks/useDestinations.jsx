import { useContext } from "react";
import DestinationsCxt from "../context/DestinationCommon";

const useDestinations = () => {
  return useContext(DestinationsCxt);
};

export default useDestinations;
