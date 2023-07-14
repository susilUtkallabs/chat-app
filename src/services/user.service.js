import axios from "../utils/axios.utils";
import { LOCAL_STORAGE_LOGIN_TOKEN } from "../constants/constants";
import { getLocalStorageLoginToken } from "../utils/localStorage.utils";

//It fetch the signed in user data with authentification 
// const getUsers = async () => {
//     try{
//         const response = await axios.get(`/users/${userId}`, {
//             headers: {
//               Authorization: `Bearer ${getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN)}`,
//             },
//         });
//         return response.data;
//     }catch(error){
//         return error;
//     }
// }

//It update the user
// const updateUser = async (userId) => {
//     try{
//         const response = await axios.put(`/users/${userId}`,{
//             headers : {
//                 Authorization : `Bearer ${getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN)}`,
//             }
//         });
//         return response.data;
//     }catch(error){
//         return error;
//     }
// }

//It will search a user data
const searchUser = async (pingId) => {
    try{
        const response = await axios.get(`/users/search/${pingId}`, {
            headers: {
              Authorization: `Bearer ${getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN)}`,
            }
        });
        return response.data;
    }catch(error){
        return error.response.data.error;
    }
}

// export default { getUsers, updateUser, searchUser };
export default {  searchUser };