import { useContext } from "react";
import AuthCxt from "../handlers/AuthHandlers";

const useAuth = () => {
  return useContext(AuthCxt);
};

export default useAuth;
