import { useContext } from "react";
import ComponentCxt from "../handlers/ComponentHandlers";

const useComponent = () => {
  return useContext(ComponentCxt);
};

export default useComponent;
