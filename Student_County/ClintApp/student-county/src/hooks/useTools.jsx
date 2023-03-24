import { useContext } from "react";
import ToolsCxt from "../context/ToolsCommon";

const useTools = () => {
  return useContext(ToolsCxt);
};

export default useTools;
