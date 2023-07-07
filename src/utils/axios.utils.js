import axios from "axios";

const instance = axios.create({
    baseURL: "https://ping-ul-backend.loca.lt/api"
});

export default instance;