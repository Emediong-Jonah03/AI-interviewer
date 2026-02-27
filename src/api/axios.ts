import axios from "axios";

const API_URL = "http://localhost:4000/api"
/*import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://localhost:4000/api";
*/
const api = axios.create({
    baseURL: API_URL,
});

// Attach access token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Auto refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refresh");

            if (!refreshToken) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {
                const res = await axios.post(`${API_URL}/v1/auth/refresh`, {
                    refreshToken: refreshToken,
                });

                const newAccess = res.data.tokens.access;
                const newRefresh = res.data.tokens.refresh;
                localStorage.setItem("access", newAccess);
                localStorage.setItem("refresh", newRefresh);

                originalRequest.headers.Authorization = `Bearer ${newAccess}`;

                return api(originalRequest);
            } catch (refreshError) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;