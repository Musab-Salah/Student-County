import React, { createContext, useState } from "react";

const ComponentCxt = createContext();

export function ComponentProvider({ children }) {
  const [OptionMenu, setOptionMenu] = useState("Overview");
  const [ButtonCards, setButtonCards] = useState("");
  const [deleteDialogState, setDeleteDialogState] = useState("");

  return (
    <ComponentCxt.Provider
      value={{
        setOptionMenu,
        OptionMenu,
        ButtonCards,
        setButtonCards,
        deleteDialogState,
        setDeleteDialogState,
      }}
    >
      {children}
    </ComponentCxt.Provider>
  );
}

export default ComponentCxt;
