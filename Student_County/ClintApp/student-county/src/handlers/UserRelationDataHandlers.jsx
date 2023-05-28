import React, { useState, createContext, useEffect, useMemo } from "react";
import useAuth from "../hooks/useAuth";
import UserRelationDataServices from "../services/UserRelationDataServices";

const UserRelationDataCxt = createContext();

export function UserRelationDatasProvider({ children }) {
  const { decodedJwt, token, isLogin } = useAuth();
  const [MyUserRelationData, setMyUserRelationData] = useState([]); //[0]books ,[1]housings,[2]rides,[3]tools,[4]patients
  const [AllRecentActivity, setAllRecentActivity] = useState(""); //[0]books ,[1]housings,[2]rides,[3]tools,[4]patients
  const [UserRelationDataLoader, setUserRelationDataLoader] = useState("");
  const [BooksActivity, setBooksActivity] = useState("");
  const [HousingsActivity, setHousingsActivity] = useState("");
  const [RidesActivity, setRidesActivity] = useState("");
  const [ToolsActivity, setToolsActivity] = useState("");
  const [PatientsActivity, setPatientsActivity] = useState("");
  const [RecentsActivity, setRecentsActivity] = useState([]);

  const [UserRelationDataError, setError] = useState("");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const cleanupError = () =>
    sleep(5000).then(() => {
      setError("");
    });

  useMemo(() => {
    if (AllRecentActivity) {
      setBooksActivity(AllRecentActivity[0]);
      setHousingsActivity(AllRecentActivity[1]);
      setRidesActivity(AllRecentActivity[2]);
      setToolsActivity(AllRecentActivity[3]);
      setPatientsActivity(AllRecentActivity[4]);
      const newArray = [...BooksActivity, ...ToolsActivity];
      console.log(newArray);
    }
  }, [AllRecentActivity]);

  const getMyAllUserRelationDatas = () => {
    setUserRelationDataLoader(true);
    UserRelationDataServices.getMyAllData(decodedJwt.uid, token)
      .then((res) => {
        setMyUserRelationData(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the userRelationDatas...");
        cleanupError();
      })
      .finally(() => setUserRelationDataLoader(false));
  };

  const getAllRecentActivity = () => {
    setUserRelationDataLoader(true);
    UserRelationDataServices.getAllRecentActivity(decodedJwt.uid, token)
      .then((res) => {
        setAllRecentActivity(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the AllRecentActivity...");
        cleanupError();
      })
      .finally(() => setUserRelationDataLoader(false));
  };

  return (
    <UserRelationDataCxt.Provider
      value={{
        getMyAllUserRelationDatas,
        setMyUserRelationData,
        MyUserRelationData,
        UserRelationDataLoader,
        UserRelationDataError,
        getAllRecentActivity,
      }}
    >
      {children}
    </UserRelationDataCxt.Provider>
  );
}

export default UserRelationDataCxt;
