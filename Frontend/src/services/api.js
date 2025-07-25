import axios from "axios";

const authAPI = axios.create({
  baseURL: "https://gravit-task.onrender.com",
  withCredentials: true,
});

const taskAPI = axios.create({
  baseURL: "https://gravit-task.onrender.com",
  withCredentials: true,
});

export { authAPI, taskAPI };


// baseURL: "http://localhost:5000/api/auth",
