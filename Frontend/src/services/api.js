import axios from "axios";

const authAPI = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
});

const taskAPI = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
  withCredentials: true,
});

export { authAPI, taskAPI };
