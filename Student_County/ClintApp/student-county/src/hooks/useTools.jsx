import { useContext } from "react";
import ToolsCxt from "../handlers/ToolsHandlers";

const useTools = () => {
  return useContext(ToolsCxt);
};

export default useTools;
