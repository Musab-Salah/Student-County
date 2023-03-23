import { useContext } from "react";
import AuthCxt from "../context/AuthCommon";

const useAuth = () => {
  return useContext(AuthCxt);
};

export default useAuth;
