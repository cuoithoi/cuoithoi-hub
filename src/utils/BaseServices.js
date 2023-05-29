import { APi } from '@/commons/Constant.ts';
import axios from 'axios';
import { useState } from 'react';
import { getLocalAccessToken } from './localStorage';

const TIMEOUT_API = 10000;

export const ResponseCodes = {
    Success: 200,
    BadRequest: 400,
    TokenInvalid: 403,
    Timeout: 408,
    Expires: 406,
};

export const csv = axios.create({
    baseURL: APi.BaseUrl,
    responseType: 'blob',
    timeout: 12000
});

const api = axios.create({
    baseURL: APi.BaseUrl,
    headers: {
        Accept: 'application/json',
    },
    timeout: TIMEOUT_API,
});

export function useBaseService() {
    const [accessToken] = useState(getLocalAccessToken() || null);

    const handleError = (error) => {
        const { response } = error;
        if (response?.status === ResponseCodes.Timeout) {
            console.log(ResponseCodes.Timeout);
        } else if (response?.status === ResponseCodes.TokenInvalid) {
            console.log(ResponseCodes.TokenInvalid);
            // Xử lý lỗi token không hợp lệ tại đây
        } else {
            console.log('Lỗi khác');
            // Xử lý các lỗi khác tại đây
        }
        return Promise.reject(error);
    };

    const get = async (url, config, params) => {
        try {
            const headers = {
                Authorization: accessToken,
                ...(config?.headers || {}),
            };
            const response = await api.get(url, { ...config, headers, params });
            return response.data;
        } catch (error) {
            return handleError(error);
        }
    };

    const post = async (url, data, config) => {
        try {
            const headers = {
                Authorization: accessToken,
                ...config?.headers,
            };
            const response = await api.post(url, data, { ...config, headers });
            return response.data;
        } catch (error) {
            return handleError(error);
        }
    };

    const put = async (url, data, config) => {
        try {
            const headers = {
                Authorization: accessToken,
                ...config?.headers,
            };
            const response = await api.put(url, data, { ...config, headers });
            return response.data;
        } catch (error) {
            return handleError(error);
        }
    };

    const del = async (url, data, config) => {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                ...config?.headers,
            };
            const response = await api.delete(url, { ...config, headers, data });
            return response.data;
        } catch (error) {
            return handleError(error);
        }
    };

    const postWithFormData = async (url, data, config) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(key, item);
                    });
                } else {
                    formData.append(key, value);
                }
            });
            const headers = {
                'Content-Type': 'multipart/form-data',
                Authorization: accessToken,
                ...config?.headers,
            };
            const response = await api.post(url, formData, { ...config, headers });
            return response.data;
        } catch (error) {
            return handleError(error);
        }
    };

    const cache = {};

    const getWithCache = async (url, config, cacheConfig) => {
        const cachedData = cache[url];
        if (cachedData) {
            return Promise.resolve(cachedData);
        }

        try {
            const response = await get(url, config);
            cache[url] = response;

            if (cacheConfig) {
                setTimeout(() => {
                    delete cache[url];
                }, cacheConfig.timeout || 60000);
            }

            return response;
        } catch (error) {
            return handleError(error);
        }
    };

    return {
        get,
        post,
        put,
        del,
        postWithFormData,
        getWithCache,
    };
}

// export const { get, put, post, postWithFormData } = useBaseService();

// const response = await get('/users', { params: { page: 1 } });
// const response = await post('/users', { name: 'John', email: 'john@example.com' });
// const response = await put('/users/123', { name: 'John', email: 'john@example.com' });
// const response = await del('/users/123');
// const response = await postWithFormData('/users', { name: 'John', avatar: avatarFile });

// const handleGetData = async () => {
//     try {
//       const data = await getWithCache(url, {
//         params: { id: 123 },
//       }, {
//         expireAfter: 30000, // 30 seconds
//         cacheKey: url,
//       });
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
