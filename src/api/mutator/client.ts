import Axios, { type AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({
    baseURL: "https://petstore.swagger.io/v2",
    paramsSerializer: (params) => {
        return new URLSearchParams(params).toString();
    },
});

AXIOS_INSTANCE.interceptors.request.use((config) => {
    console.log("config:", config);
    return config;
});

AXIOS_INSTANCE.interceptors.response.use((response) => {
    console.log("response:", response);
    return response;
});

export const customInstance = async <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig
): Promise<T> => {
    return AXIOS_INSTANCE({
        ...config,
        ...options,
    }).then(({ data }) => data);
};
