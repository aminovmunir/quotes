import axios from "axios";
import type { AxiosInstance } from 'axios' 

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {},
});

export default apiClient;