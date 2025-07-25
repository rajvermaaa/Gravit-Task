import axios from "axios";


const BASE = "https://gravit-task.onrender.com/api";

export const authAPI = axios.create({
  baseURL: `${BASE}/auth`,
  headers: {
    "Content-Type": "application/json"
  }
});

export const taskAPI = axios.create({
  baseURL: `${BASE}/tasks`,
  headers: {
    "Content-Type": "application/json"
  }
});
