import { useContext } from "react";
import UserRelationDataCxt from "../handlers/UserRelationDataHandlers";

const useUserRelationData = () => {
  return useContext(UserRelationDataCxt);
};

export default useUserRelationData;
