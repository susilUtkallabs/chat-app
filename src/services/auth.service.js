import axios from "../utils/axios.utils";
import { setLocalStorageLoginToken } from "../utils/localStorage.utils";

const signUpApi = async (data) => {
  delete data.confirm_password;
  try {
    const res = await axios.post(`/auth/signUp`, data);
    return res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

const loginApi = async (data) => {
  try {
    const res = await axios.post(`/auth/signIn`, data);
    setLocalStorageLoginToken(res.data.token);
    return res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

const validateToken = async (token) => {
  try {
    const res = await axios.get(`/auth/validatetoken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export default { signUpApi, loginApi, validateToken };
