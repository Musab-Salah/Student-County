import React, { createContext, useState } from "react";

const StudentCxt = createContext();

export function StudentProvider({ children }) {
  const [Student] = useState({
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

  return (
    <StudentCxt.Provider value={{ Student }}>
      <div>
        <h1>{Student.fullName}</h1>
      </div>

      {children}
    </StudentCxt.Provider>
  );
}

export default StudentCxt;
