import React, { createContext, useState } from "react";

const ComponentCxt = createContext();

export function ComponentProvider({ children }) {
  const [OptionMenu, setOptionMenu] = useState("Overview");
  const [ButtonCards, setButtonCards] = useState("");
  const [openChatArea, setOpenChatArea] = useState(false);
  const [ownerItem, setOwnerItem] = useState("");

  return (
    <ComponentCxt.Provider
      value={{
        OptionMenu,
        ButtonCards,
        setOptionMenu,
        setButtonCards,
        setOpenChatArea,
        openChatArea,
        setOwnerItem,
        ownerItem,
      }}
    >
      {children}
    </ComponentCxt.Provider>
  );
}

export default ComponentCxt;
