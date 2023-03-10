import React, { createContext, useEffect, useState, useContext } from "react";
import StudentServices from "../services/StudentServices";
import { useNavigate } from "react-router";
import UniversitiesCxt from "./UniversityCommon";

const StudentsCxt = createContext();

export function StudentsProvider({ children }) {
  const { getUniversityById, University } = useContext(UniversitiesCxt);
  const [Students, setStudents] = useState([]);
  const [StudentError, setError] = useState(null);
  const [Student, setStudent] = useState("Loading");
  const [StudentBo] = useState({
    id: "0",
    fullName: "",
    idNumber: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    university: "",
    college: "",
  });

  let navigate = useNavigate();

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = () => {
    StudentServices.getStudents()
      .then((res) => {
        setStudents(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Students..."));
  };
  
  const createStudent = (Bo) => {
    getUniversityById(Bo.university);
    Bo.email = Bo.email + University.emailDomainName;
    StudentServices.createStudent(Bo)
      .then((res) => {
        setStudent(res.data);
        setError(null);
        navigate("/");
      })
      .catch(() => {
        setError("Failed create the Student...");
        navigate("/sign_up");
      });
  };

  const getStudentById = (id) => {
    StudentServices.getStudentById(id)
      .then((res) => {
        setStudent(res.data);
        setError(null);
      })
      .catch(() => setError("Failed bring the Student..."));
  };

  const updateStudent = (id, Bo) => {
    StudentServices.updateStudent(id, Bo)
      .then((res) => {
        setStudent(res.data);
        setError(null);
      })
      .catch(() => setError("Failed update the Student..."));
  };

  const deleteStudent = (id) => {
    setError();
    StudentServices.deleteStudent(id)
      .then((res) => {
        setStudent(res.data);
        setError(null);
      })
      .catch(() => setError("Failed delete the Student..."));
  };

  return (
    <StudentsCxt.Provider
      value={{
        Students,
        Student,
        StudentBo,
        StudentError,
        getStudentById,
        createStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </StudentsCxt.Provider>
  );
}

export default StudentsCxt;
