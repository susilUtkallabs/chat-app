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
        return error;
    }
}

const postConversation = async (page, limit) => {
    try{
        const response = await axios.get(`/conversations`, {
            headers: {
              Authorization: `Bearer ${getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN)}`,
            },
            page : page,
            limit: limit
        });
        return response.data;
    }catch(error){
        return error;
    }
}

export default {getConversation, postConversation};