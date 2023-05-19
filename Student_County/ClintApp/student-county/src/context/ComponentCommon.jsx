import React, { createContext, useState } from "react";

const ComponentCxt = createContext();

export function ComponentProvider({ children }) {
  const [OptionMenu, setOptionMenu] = useState("Overview");
  const [ButtonCards, setButtonCards] = useState("");

  return (
    <ComponentCxt.Provider
      value={{
        setOptionMenu,
        OptionMenu,
        ButtonCards,
        setButtonCards,
      }}
    >
      {children}
    </ComponentCxt.Provider>
  );
}

export default ComponentCxt;
