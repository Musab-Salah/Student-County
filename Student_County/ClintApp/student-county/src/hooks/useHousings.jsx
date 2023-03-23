import { useContext } from "react";
import HousingsCxt from "../context/HousingCommon";

const useHousings = () => {
  return useContext(HousingsCxt);
};

export default useHousings;
