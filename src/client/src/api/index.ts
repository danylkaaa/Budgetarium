import axios from "axios";

export const BASE_URL = process.env.NODE_ENV === "production" ? "/" : "localhost:3000";

export default {
    noAuth: () => axios.create({
        baseURL: BASE_URL
    })
};