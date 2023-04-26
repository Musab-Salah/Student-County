import { useContext } from "react";
import ComponentCxt from "../context/ComponentCommon";

const useComponent = () => {
  return useContext(ComponentCxt);
};

export default useComponent;
