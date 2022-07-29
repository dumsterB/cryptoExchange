import axios from 'axios';
import AccessToken from '@/services/auth/tokens/AccessToken';
import { BaseClient } from './BaseClient';
import { systemLogout } from '@/services/auth/logout';
import { handleRefresh } from '@/services/auth/refresh';

let axiosInstance;

export class AxiosClient extends BaseClient {
    constructor() {
        super();

        this._initializeClient();
        this._initializeRequestInterceptor();
        this._initializeResponseInterceptor();
    }

    async get(url) {
        const req = await axiosInstance.get(url);
    
        return req.data;
    }
    
    async post(url, body, config = {}) {
        const req = await axiosInstance.post(url, body, config);

        return req.data;
    }

    // async delete(url, body) {
    //     const req = await axiosInstance.delete(url, body);

    //     return req.data;
    // }

    _initializeClient() {
        axiosInstance = axios.create({
            baseURL: this._baseUrl,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    _initializeRequestInterceptor() {
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
    }

    _initializeResponseInterceptor() {
        axiosInstance.interceptors.response.use(
            response => response,
            async error => {
                const originalConfig = error.config;

                if (error?.response?.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    
                    const { error: refreshFailed } = await handleRefresh();

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
    }
}