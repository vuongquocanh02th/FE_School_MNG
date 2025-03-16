import axios from "axios";

export const apiDomain = "http://localhost:8080";

const api = axios.create({
    baseURL: apiDomain,
    timeout: 0
});
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

export default api;

export function saveUserInfo(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
}