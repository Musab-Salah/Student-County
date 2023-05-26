import { useContext } from "react";
import ChatCxt from "../handlers/ChatHandlers";

const useChat = () => {
  return useContext(ChatCxt);
};

export default useChat;
