import React, { createContext, useEffect, useState } from "react";

const ComponentCxt = createContext();

export function ComponentProvider({ children }) {
  const [Option, setOption] = useState(null);

  useEffect(() => {}, []);

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
