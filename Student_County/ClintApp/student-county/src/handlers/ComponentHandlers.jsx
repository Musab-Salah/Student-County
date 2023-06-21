import React, { createContext, useState } from "react";

const ComponentCxt = createContext();

export function ComponentProvider({ children }) {
  const [OptionMenu, setOptionMenu] = useState("Overview");
  const [ButtonCards, setButtonCards] = useState("");
  const [openChatArea, setOpenChatArea] = useState(false);
  const [ownerItem, setOwnerItem] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpenPhone, setIsMenuOpenPhone] = useState(false);
  const [filteredValue, setFilteredValue] = useState("");

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
        isMenuOpen,
        setIsMenuOpen,
        query,
        setQuery,
        isSearchOpen,
        setIsSearchOpen,
        isMenuOpenPhone,
        setIsMenuOpenPhone,
        filteredValue,
        setFilteredValue,
      }}
    >
      {children}
    </ComponentCxt.Provider>
  );
}

export default ComponentCxt;
