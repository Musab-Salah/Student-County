import React, { createContext, useState } from "react";

const ComponentCxt = createContext();

export function ComponentProvider({ children }) {
  const [Option, setOption] = useState("Overview");
  const [Create, setCreate] = useState("");

  return (
    <ComponentCxt.Provider
      value={{
        setOption,
        Option,
        Create,
        setCreate,
      }}
    >
      {children}
    </ComponentCxt.Provider>
  );
}

export default ComponentCxt;
