import axios from "axios";

export const ClienteAxios = axios.create({
    baseURL: "http://localhost:3000"
});