import { createContext, useContext, useEffect, useState } from "react";
import Converstation from "../services/conversation.service";
import { getLocalStorageLoginToken } from "../utils/localStorage.utils";
import { LOCAL_STORAGE_LOGIN_TOKEN } from "../constants/constants";
import MessageService from "../services/message.service";
import AuthState from "./authState.context";
const { io } = require("socket.io-client");

const MessageState = createContext();

export const MessageStateProvider = ({ children }) => {
  const [messages, setMessages] = useState({});
  const [conversations, setConversations] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [showMessage, setShowMessage] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const [socketInstance, setSocketInstance] = useState(null);
  const { myProfile } = useContext(AuthState);

  useEffect(() => {
    const socket = io("https://ping-ul-susil-backend.loca.lt", {
      path: "/live",
      auth: {
        token: getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN),
      },
      transports: ["websocket"],
      upgrade: false,
    });

    socket.on("connect", () => {
      setSocketInstance(socket);
    });

    socket.on("disconnect", () => {
      setSocketInstance(null);
    });

    socket.on("server-messages", (data) => {
      const response = JSON.parse(data);
      setMessages((prev) => {
        const temp = {...prev};
        if(temp[response.conversation_group_id]){
          temp[response.conversation_group_id].messages.push(response);
        }
        return temp;
      });
    });
  }, []);

  function emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!socketInstance) {
        reject("No socket connection.");
      } else {
        socketInstance.emit(event, JSON.stringify(data), (response) => {
          if (response.error) {
            console.error(response.error);
            reject(response.error);
          } else {
            resolve(response);
          }
        });
      }
    });
  }

  const sendMessageSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (socketInstance.connected) {
      response = await emit("messages", {
        conversationGroupId: selectedIndex,
        text: sendMessage,
      });
    } else {
      response = await MessageService.postMessages(
        selectedIndex,
        sendMessage
      );
    }
    setMessages((prev) => {
      prev[selectedIndex].messages.push(response);
      return prev;
    });
    setSendMessage("");
  };

  return (
    <MessageState.Provider
      value={{
        messages,
        setMessages,
        conversations,
        setConversations,
        selectedIndex,
        setSelectedIndex,
        showMessage,
        setShowMessage,
        sendMessageSubmit,
        sendMessage,
        setSendMessage,
      }}
    >
      {children}
    </MessageState.Provider>
  );
};

export default MessageState;
