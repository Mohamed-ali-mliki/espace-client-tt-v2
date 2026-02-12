import React, { useState } from "react";
import "../components/DashboradClient.css";

const initialData = [
  { id: 1, name: "Mohamed Ali", email: "ali@example.com", subscription: "Premium" },
  { id: 2, name: "Sana", email: "sana@example.com", subscription: "Basic" },
];

const DashboardClient = () => {
  const [clients, setClients] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", subscription: "" });

  const openModal = (client = null) => {
    setEditClient(client);
    setForm(client || { name: "", email: "", subscription: "" });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditClient(null);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (editClient) {
      // Update
      setClients(clients.map(c => c.id === editClient.id ? { ...editClient, ...form } : c));
    } else {
      // Add
      setClients([...clients, { id: Date.now(), ...form }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Client Dashboard</h1>
        <button className="btn btn-primary" onClick={() => openModal()}>Add Client</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subscription</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.subscription}</td>
              <td>
                <button className="btn btn-primary" onClick={() => openModal(client)}>Edit</button>
                <button className="btn" style={{ background: "#dc3545", color: "white" }} onClick={() => handleDelete(client.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {clients.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", fontStyle: "italic" }}>No clients found</td>
            </tr>
          )}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editClient ? "Edit Client" : "Add Client"}</h3>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Subscription</label>
              <input type="text" name="subscription" value={form.subscription} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-actions">
              <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>{editClient ? "Update" : "Add"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardClient;
