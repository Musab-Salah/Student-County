import React, { createContext, useEffect, useState } from "react";
import StudentServices from "../services/StudentServices";

const StudentsCxt = createContext();

export function StudentsProvider({ children }) {
  const [Students, setStudents] = useState([]);
  const [error, setError] = useState("Loading");
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
    StudentServices.createStudent(Bo)
      .then((res) => {
        setStudent(res.data);
        setError(null);
      })
      .catch(() => setError("Failed create the Student..."));
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
        error,
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
