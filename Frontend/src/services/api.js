import axios from "axios";

const authAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
  withCredentials: true,
});

const taskAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/tasks`,
  withCredentials: true,
});

export { authAPI, taskAPI };



// baseURL: "http://localhost:5000/api/auth",
