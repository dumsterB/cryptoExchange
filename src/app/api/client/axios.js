import axios from 'axios';
import { systemLogout } from '@/states/user/services/logout';
import { AccessToken, handleRefreshCredentials } from '@/utils/auth';
import { BASE_URL } from '@/config';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    config => {
        const token = AccessToken.get();

        if (token) {
            config.headers['Authorization'] = `Bearer ${ token }`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalConfig = error.config;

        if (error?.response?.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            
            const { error: refreshFailed } = await handleRefreshCredentials();

            if (refreshFailed) {
                // if refresh was failed
                systemLogout();

                return Promise.reject(error);
            } else {
                // retry request
                return axiosInstance(originalConfig);
            }
        }

        return Promise.reject(error);
    }
);

async function post(url, body, config = {}) {
    const { data } = await axiosInstance.post(url, body, config);

    return data;
}

async function get(url) {
    const { data } = await axiosInstance.get(url);

    return data;
}

export default {
    post,
    get
};