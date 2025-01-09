import axios, { AxiosInstance } from "axios";

let apiClient: AxiosInstance | null = null;

if (!apiClient) {
  apiClient = axios.create({
    baseURL: "http://localhost:3100",
    timeout: 5000,
  });
}

export default apiClient;
