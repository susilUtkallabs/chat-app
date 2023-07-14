import axios from "../utils/axios.utils";
import { LOCAL_STORAGE_LOGIN_TOKEN } from "../constants/constants";
import { getLocalStorageLoginToken } from "../utils/localStorage.utils";

//It sends a message 
const postMessages = async () => {
    try{
        const response = await axios.post(`/messages`, {
            headers: {
              Authorization: `Bearer ${getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN)}`,
            },
        });
        return response.data;
    }catch(error){
        return error;
    }
}

//It fetch all the messages
const allMessage = async (page, limit, conversationGroupId) => {
    try{
        const response = await axios.get(`/messages/${conversationGroupId}`,{
            headers : {
                Authorization : `Bearer ${getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN)}`,
            },
            page : page,
            limit : limit
        });
        return response.data;
    }catch(error){
        return error;
    }
}

//It delete the message
const deleteMessage = async (messageId) => {
    try{
        const response = await axios.delete(`/messages/${messageId}`, {
            headers: {
              Authorization: `Bearer ${getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN)}`,
            }
        });
        return response.data;
    }catch(error){
        return error;
    }
}

export default {postMessages, allMessage, deleteMessage };