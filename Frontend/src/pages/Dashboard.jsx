import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { taskAPI } from "../services/api"; // Use taskAPI for task routes

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await taskAPI.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tasks");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingTaskId) {
        await taskAPI.put(`/${editingTaskId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingTaskId(null);
      } else {
        await taskAPI.post("/", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Error saving task");
    }
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, description: task.description });
    setEditingTaskId(task._id);
  };

  const handleDelete = async (id) => {
    try {
      await taskAPI.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await taskAPI.put(
        `/${task._id}`,
        { completed: !task.completed },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">📝 Task Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Task description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.completed ? "list-group-item-success" : ""
            }`}
          >
            <div>
              <h6 className="mb-1">{task.title}</h6>
              <small>{task.description}</small>
            </div>
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger me-2"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleToggleComplete(task)}
              >
                {task.completed ? "Undo" : "Done"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
