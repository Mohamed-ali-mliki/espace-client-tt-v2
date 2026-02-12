import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/Dashboard.css";

const Dashboard = () => {
  const role = localStorage.getItem("role"); // admin or client
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subscription: ""
  });
  const [editingId, setEditingId] = useState(null);

  // =========================
  // FETCH USERS (ADMIN ONLY)
  // =========================
  useEffect(() => {
    if (role === "admin") {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================
  // ADD OR UPDATE USER
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/users/${editingId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/users",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setForm({ name: "", email: "", subscription: "" });
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // DELETE USER
  // =========================
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/users/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // CLIENT VIEW
  // =========================
  if (role === "client") {
    return (
      <div className="dashboard-container">
        <h2 className="dashboard-title">Client Dashboard</h2>
        <div className="client-box">
          <p>Welcome to your account 👋</p>
          <p>You can view your subscription details here.</p>
        </div>
      </div>
    );
  }

  // =========================
  // ADMIN VIEW
  // =========================
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <form className="dashboard-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subscription"
          placeholder="Subscription"
          value={form.subscription}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary" type="submit">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subscription</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.subscription}</td>
              <td>
                <button
                  className="btn btn-edit"
                  onClick={() => {
                    setForm(u);
                    setEditingId(u._id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
