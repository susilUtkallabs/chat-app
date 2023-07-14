import axios from "../utils/axios.utils";
import { LOCAL_STORAGE_LOGIN_TOKEN } from "../constants/constants";
import { getLocalStorageLoginToken } from "../utils/localStorage.utils";

const getContact = async () => {
    try{
        const response = await axios.get(`/contacts`, {
            headers: {
              Authorization: `Bearer ${getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN)}`,
            },
        });
        return response.data.contacts;
    }catch(error){
        return error;
    }
}

const removeContact = async (userId) => {
    try{
        const response = await axios.put(`/contacts/${userId}`, {
            headers: {
              Authorization: `Bearer ${getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN)}`,
            },
        });
        return response.data;
    }catch(error){
        return error;
    }
}

export default {getContact, removeContact};