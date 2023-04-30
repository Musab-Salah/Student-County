import React, { createContext, useState } from "react";

const ComponentCxt = createContext();

export function ComponentProvider({ children }) {
  const [Option, setOption] = useState(null);


  return (
    <ComponentCxt.Provider
      value={{
        setOption,
        Option,
      }}
    >
      {children}
    </ComponentCxt.Provider>
  );
}

export default ComponentCxt;

