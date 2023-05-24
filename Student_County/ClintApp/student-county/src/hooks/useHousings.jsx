import { useContext } from "react";
import HousingsCxt from "../handlers/HousingHandlers";

const useHousings = () => {
  return useContext(HousingsCxt);
};

export default useHousings;
