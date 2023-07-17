import axios from "../utils/axios.utils";
import { LOCAL_STORAGE_LOGIN_TOKEN } from "../constants/constants";
import { getLocalStorageLoginToken } from "../utils/localStorage.utils";

//It sends a message 
const postMessages = async (conversation_group_id, text) => {
    try{
        const response = await axios.post(`/messages`,
        {
            conversation_group_id: conversation_group_id,
            text: text
        },
        {
            headers: {
              Authorization: `Bearer ${getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN)}`,
            },
        });
        return response.data;
    }catch(error){
        return error.response.data.error;
    }
}

//It fetch get the messages
const getMessage = async (page, limit, conversationGroupId) => {
    try{
        const response = await axios.get(`/messages/${conversationGroupId}?page=${page}&limit=${limit}`,{
            headers : {
                Authorization : `Bearer ${getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN)}`,
            }
        });
        return response.data;
    }catch(error){
        return error.response.data.error;
    }
}

//It delete the message
const deleteMessage = async (messageId) => {
    try{
        const response = await axios.delete(`/messages/${messageId}`, 
        {
            headers: {
              Authorization: `Bearer ${getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN)}`,
            }
        });
        return response.data;
    }catch(error){
        return error.response.data.error;
    }
}

export default {postMessages, getMessage, deleteMessage };