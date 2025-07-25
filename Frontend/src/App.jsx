// src/services/api.js
import axios from "axios";

const BASE_URL = "https://gravit-task.onrender.com";

export const authAPI = axios.create({
  baseURL: `${BASE_URL}/api/auth`,
  withCredentials: true,
});

export const taskAPI = axios.create({
  baseURL: `${BASE_URL}/api/tasks`,
  withCredentials: true,
});
