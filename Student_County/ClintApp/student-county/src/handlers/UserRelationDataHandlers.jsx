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
  const [MyBooks, setMyBooks] = useState([]); //all user books
  const [MyTools, setMyTools] = useState([]); //all user tools
  const [MyHousings, setMyHousings] = useState([]); //all user housings
  const [MyRides, setMyRides] = useState([]); //all user Rides
  const [MyPatients, setMyPatients] = useState([]); //all user patients

  const [UserRelationDataError, setError] = useState("");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const cleanupError = () =>
    sleep(5000).then(() => {
      setError("");
    });

  useEffect(() => {
    if (isLogin) {
      getMyAllUserRelationDatas();
      getAllRecentActivity();
    }
    // eslint-disable-next-line
  }, [isLogin]);
  useEffect(() => {
    if (MyUserRelationData) {
      if (MyUserRelationData[0]) setMyBooks(MyUserRelationData[0]);
      if (MyUserRelationData[1]) setMyHousings(MyUserRelationData[1]);
      if (MyUserRelationData[2]) setMyRides(MyUserRelationData[2]);
      if (MyUserRelationData[3]) setMyTools(MyUserRelationData[3]);
      if (MyUserRelationData[4]) setMyPatients(MyUserRelationData[4]);
    }
    // eslint-disable-next-line
  }, [MyUserRelationData]);
  useMemo(() => {
    if (AllRecentActivity) {
      if (AllRecentActivity[0]) setBooksActivity(AllRecentActivity[0]);
      if (AllRecentActivity[1]) setHousingsActivity(AllRecentActivity[1]);
      if (AllRecentActivity[2]) setRidesActivity(AllRecentActivity[2]);
      if (AllRecentActivity[3]) setToolsActivity(AllRecentActivity[3]);
      if (AllRecentActivity[4]) setPatientsActivity(AllRecentActivity[4]);
      const newArray = [...BooksActivity, ...ToolsActivity];
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
        MyBooks,
        MyTools,
        MyHousings,
        MyRides,
        MyPatients,
        setMyBooks,
        setMyTools,
        setMyHousings,
        setMyRides,
        setMyPatients,
      }}
    >
      {children}
    </UserRelationDataCxt.Provider>
  );
}

export default UserRelationDataCxt;
