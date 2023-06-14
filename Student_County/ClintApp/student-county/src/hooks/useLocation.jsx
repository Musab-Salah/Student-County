import { useContext } from "react";
import LocationCxt from "../handlers/LocationHandlers";

const useLocation = () => {
  return useContext(LocationCxt);
};

export default useLocation;
