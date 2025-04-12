import axios from "axios";

const apiDomain = "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: apiDomain,
    timeout: 0
});

axiosInstance.interceptors.request.use(
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
axiosInstance.interceptors.response.use(
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

export default axiosInstance;

