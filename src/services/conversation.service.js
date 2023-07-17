import axios from "../utils/axios.utils";
import { LOCAL_STORAGE_LOGIN_TOKEN } from "../constants/constants";
import { getLocalStorageLoginToken } from "../utils/localStorage.utils";

const getConversation = async (page, limit) => {
    try{
        const response = await axios.get(`/conversations?page=${page}&limit=${limit}`, {
            headers: {
              Authorization: `Bearer ${getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN)}`,
            }
        });
        return response.data.conversations;
    }catch(error){
        return error.response.data.error;
    }
}

const postConversation = async (users) => {
    try{
        const response = await axios.post(`/conversations`,
            {
                type : "personal",
                users: [users]
            }, {
            headers: {
              Authorization: `Bearer ${getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN)}`,
            }
        });
        return response.data;
    }catch(error){
        return error.response.data;
    }
}

export default {getConversation, postConversation};