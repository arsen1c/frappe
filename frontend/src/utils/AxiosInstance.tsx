import axios from "axios";

export const AxiosInstance = axios.create();
AxiosInstance.defaults.baseURL = import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:5000" : "https://frappe.vector2912.repl.co";

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

