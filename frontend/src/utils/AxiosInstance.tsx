import axios from "axios";

export const AxiosInstance = axios.create();
AxiosInstance.defaults.baseURL = import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_DEV_BASE : import.meta.env.VITE_PROD_BASE;

// GET Request
export function getRequest<T>(endpoint: string) {
    return AxiosInstance.get<T>(endpoint);
}

// POST Requst
export function postRequest(endpoint: string, payload: Object) {
    return AxiosInstance.post(endpoint, payload);
}

// DELETE Request
export function deleteRequest(endpoint: string, payload?: Object) {
    return AxiosInstance.delete(endpoint, payload);
}

// PUT Request
export function putRequest(endpoint: string, payload: Object) {
    return AxiosInstance.put(endpoint, payload);
}

