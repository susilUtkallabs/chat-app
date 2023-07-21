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
    console.log("useEffect socket");
    const socket = io("https://ping-ul-susil-backend.loca.lt", {
      path: "/live",
      auth: {
        token: getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN),
      },
      transports: ["websocket"],
      upgrade: false,
    });

    socket.on("connect", () => {
      // console.log(socket.id);
      setSocketInstance(socket);
    });

    socket.on("disconnect", () => {
      // console.log(socket.id);
      setSocketInstance(null);
    });

    socket.on("server-messages", (data) => {
      console.log("message received", JSON.parse(data));
      const response = JSON.parse(data);
      setMessages((prev) => {
        console.log('prevvvvvvvv',prev);
        prev[response.conversation_group_id].messages.push(response);
        return prev;
      });
    });
  }, []);

  function emit(event, data) {
    console.log("emitttttttttt");
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
    console.log("hiiiiiiiiii", socketInstance.connected);
    let response;
    if (socketInstance.connected) {
      response = await emit("messages", {
        conversationGroupId: selectedIndex,
        text: sendMessage,
      });
      console.log("sent through socket", response);
    } else {
      response = await MessageService.postMessages(
        selectedIndex,
        sendMessage
      );
      console.log("sent through API");
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
