import Axios, { type AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({
    baseURL: "https://petstore.swagger.io/v2",
    paramsSerializer: (params) => {
        return new URLSearchParams(params).toString();
    },
});

AXIOS_INSTANCE.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
});

AXIOS_INSTANCE.interceptors.response.use((response) => {
    //console.log("response:", response);
    return response;
});

export const customInstance = async <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig
): Promise<T> => {
    const { data } = await AXIOS_INSTANCE({
        ...config,
        ...options,
    });

    return data;
};
