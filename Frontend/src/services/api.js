import axios from "axios";

const BASE_URL = "https://gravit-task.onrender.com/api";

export const authAPI = axios.create({
  baseURL: `${BASE_URL}/auth`,
});

export const taskAPI = axios.create({
  baseURL: `${BASE_URL}/tasks`,
});
