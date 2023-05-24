import { useContext } from "react";
import LoaderCxt from "../handlers/LoaderHandlers";

const useLoader = () => {
  return useContext(LoaderCxt);
};

export default useLoader;
