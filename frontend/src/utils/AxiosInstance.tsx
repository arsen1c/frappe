import axios from "axios";

const AxiosInstance = axios.create();
AxiosInstance.defaults.baseURL = "http://localhost:3000"

// GET Request
export function getRequest(endpoint: string) {
    return AxiosInstance.get(endpoint);
}

// POST Requst
export function postRequest(endpoint: string, payload: Object) {
    return AxiosInstance.post(endpoint, payload);
}

// DELETE Request
export function deleteRequest(endpoint: string, payload: Object) {
    return AxiosInstance.delete(endpoint, payload);
}

// PUT Request
export function putRequest(endpoint: string, payload: Object) {
    return AxiosInstance.put(endpoint, payload);
}
