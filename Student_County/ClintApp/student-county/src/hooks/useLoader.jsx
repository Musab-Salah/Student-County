import { useContext } from "react";
import LoaderCxt from "../context/LoaderCommon";

const useLoader = () => {
  return useContext(LoaderCxt);
};

export default useLoader;
