import React, { useState, createContext, useEffect, useMemo } from "react";
import useAuth from "../hooks/useAuth";
import UserRelationDataServices from "../services/UserRelationDataServices";
import useHousings from "../hooks/useHousings";
import usePatient from "../hooks/usePatient";
import useRides from "../hooks/useRides";
import useTools from "../hooks/useTools";
import useBooks from "../hooks/useBooks";

const UserRelationDataCxt = createContext();

export function UserRelationDatasProvider({ children }) {
  const { decodedJwt, token, isLogin } = useAuth();
  const [MyUserRelationData, setMyUserRelationData] = useState([]); //[0]books ,[1]housings,[2]rides,[3]tools,[4]patients
  const [AllRecentActivity, setAllRecentActivity] = useState(""); //[0]books ,[1]housings,[2]rides,[3]tools,[4]patients
  const [UserRelationDataLoader, setUserRelationDataLoader] = useState("");
  const [BooksActivity, setBooksActivity] = useState("");
  const [User, setUser] = useState("");

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
  const { BookSuccess } = useBooks();
  const { HousingSuccess } = useHousings();
  const { PatientSuccess } = usePatient();
  const { RideSuccess } = useRides();
  const { ToolsSuccess } = useTools();
  const [UserRelationDataError, setError] = useState("");
  const [UserSuccess, setUserSuccess] = useState("");
  const [buttonsFormUserLoader, setButtonsFormUserLoader] = useState("");
  const [Patient, setPatient] = useState([]);
  const cleanupUserSuccess = () =>
    sleep(2000).then(() => {
      setUserSuccess("");
    });
  const [AllActivity, setAllActivity] = useState([]);
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
  }, [
    isLogin,
    BookSuccess,
    HousingSuccess,
    PatientSuccess,
    RideSuccess,
    ToolsSuccess,
  ]);
  useEffect(() => {
    if (MyUserRelationData && decodedJwt.roles !== "Patient") {
      if (MyUserRelationData[0]) setMyBooks(MyUserRelationData[0]);
      if (MyUserRelationData[1]) setMyHousings(MyUserRelationData[1]);
      if (MyUserRelationData[2]) setMyRides(MyUserRelationData[2]);
      if (MyUserRelationData[3]) setMyTools(MyUserRelationData[3]);
      if (MyUserRelationData[4]) setMyPatients(MyUserRelationData[4]);
    } else if (decodedJwt.roles === "Patient")
      setMyPatients(MyUserRelationData[0]);
    // eslint-disable-next-line
  }, [MyUserRelationData]);
  useMemo(() => {
    if (AllRecentActivity && decodedJwt.roles !== "Patient") {
      if (AllRecentActivity[0]) setBooksActivity(AllRecentActivity[0]);
      if (AllRecentActivity[1]) setHousingsActivity(AllRecentActivity[1]);
      if (AllRecentActivity[2]) setRidesActivity(AllRecentActivity[2]);
      if (AllRecentActivity[3]) setToolsActivity(AllRecentActivity[3]);
      if (AllRecentActivity[4]) setPatientsActivity(AllRecentActivity[4]);
    } else if (decodedJwt.roles === "Patient") {
      setPatientsActivity(AllRecentActivity[0]);
    }
    setAllActivity([
      ...BooksActivity,
      ...ToolsActivity,
      ...PatientsActivity,
      ...RidesActivity,
      ...HousingsActivity]
    );
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

  const getUser = () => {
    setUserRelationDataLoader(true);
    UserRelationDataServices.getUser(decodedJwt.uid, token)
      .then((res) => {
        setUser(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the User Data...");
        cleanupError();
      })
      .finally(() => setUserRelationDataLoader(false));
  };

  const updateUser = (id, Bo) => {
    setButtonsFormUserLoader(true);
    UserRelationDataServices.updateUser(id, Bo, token)
      .then((res) => {
        setUserSuccess("Successfully Updated .");
        cleanupUserSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed update ...");
        cleanupError();
      })
      .finally(() => setButtonsFormUserLoader(false));
  };
  const getPatient = () => {
    setUserRelationDataLoader(true);
    UserRelationDataServices.getPatient(decodedJwt.uid, token)
      .then((res) => {
        setPatient(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed bring the User Data...");
        cleanupError();
      })
      .finally(() => setUserRelationDataLoader(false));
  };
  const updatePatient = (id, Bo) => {
    setButtonsFormUserLoader(true);
    UserRelationDataServices.updatePatient(id, Bo, token)
      .then((res) => {
        setUserSuccess("Successfully Updated .");
        cleanupUserSuccess();
        setError(null);
      })
      .catch(() => {
        setError("Failed update ...");
        cleanupError();
      })
      .finally(() => setButtonsFormUserLoader(false));
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
        User,
        getUser,
        UserSuccess,
        updateUser,
        buttonsFormUserLoader,
        setUser,
        updatePatient,
        getPatient,
        Patient,
        setPatient,
        AllActivity,
      }}
    >
      {children}
    </UserRelationDataCxt.Provider>
  );
}

export default UserRelationDataCxt;
