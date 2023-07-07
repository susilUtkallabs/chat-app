import axios from "../utils/axios.utils";

const validateToken = async (token) => {
    try{
        const res = await axios.get(`/auth/validatetoken`, token);
        return res.data;    
    }catch(error){
        throw error.response.data.error;
    }
}

export default {validateToken};