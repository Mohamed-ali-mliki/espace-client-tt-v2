// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/Dashboard.css";

const Dashboard = () => {
  const role = localStorage.getItem("role"); // "admin" ou "client"
  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

  // État pour l'admin (gestion des utilisateurs)
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    subscription: ""   // optionnel
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // État pour le client (ses abonnements)
  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);

  // Au chargement, si admin → récupérer les utilisateurs
  useEffect(() => {
    if (role === "admin") {
      fetchUsers();
    }
  }, []);

  // Si client, récupérer ses abonnements
  useEffect(() => {
    if (role === "client" && userInfo._id) {
      fetchUserSubscriptions();
    }
  }, []);

  // Fonction pour récupérer la liste des utilisateurs (admin)
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Erreur chargement utilisateurs :", error);
      alert("Impossible de charger les utilisateurs. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour récupérer les abonnements du client
  const fetchUserSubscriptions = async () => {
    setLoadingSubs(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/subscriptions/user/${userInfo._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscriptions(res.data);
    } catch (error) {
      console.error("Erreur chargement abonnements :", error);
    } finally {
      setLoadingSubs(false);
    }
  };

  // Gestionnaire de changement des champs du formulaire (admin)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire (admin)
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
      setForm({ nom: "", prenom: "", email: "", telephone: "", subscription: "" });
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      alert("Échec de l'opération. Vérifiez les données.");
    }
  };

  // Suppression d'un utilisateur (admin)
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/users/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchUsers();
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("La suppression a échoué.");
      }
    }
  };

  // ==========================
  // Vue pour le client (améliorée)
  // ==========================
  if (role === "client") {
    return (
      <div className="dashboard-container">
        <h2 className="dashboard-title">Tableau de bord client</h2>

        {/* Carte d'informations personnelles */}
        <div className="client-info-card">
          <h3>Informations personnelles</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Nom complet :</span>
              <span className="info-value">{userInfo.nom} {userInfo.prenom}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email :</span>
              <span className="info-value">{userInfo.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Téléphone :</span>
              <span className="info-value">{userInfo.telephone || "Non renseigné"}</span>
            </div>
          </div>
        </div>

        {/* Tableau des abonnements */}
        <h3>Vos abonnements</h3>
        {loadingSubs ? (
          <p>Chargement de vos abonnements...</p>
        ) : subscriptions.length === 0 ? (
          <p className="no-subscription">
            Vous n'avez pas encore d'abonnement. <a href="/subscriptions">Choisissez-en un ici</a>.
          </p>
        ) : (
          <table className="dashboard-table client-table">
            <thead>
              <tr>
                <th>Offre</th>
                <th>Prix</th>
                <th>Date de souscription</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map(sub => (
                <tr key={sub._id}>
                  <td>{sub.name}</td>
                  <td>{sub.price}</td>
                  <td>{new Date(sub.subscribedAt).toLocaleDateString('fr-FR')}</td>
                  <td><span className="status-active">Actif</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  // ==========================
  // Vue pour l'administrateur (améliorée UI/UX)
  // ==========================
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Tableau de bord administrateur</h2>

      {/* Formulaire d'ajout / modification */}
      <form className="dashboard-form admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={form.prenom}
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
          type="tel"
          name="telephone"
          placeholder="Téléphone"
          value={form.telephone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subscription"
          placeholder="Abonnement (ex: Internet 4GB)"
          value={form.subscription}
          onChange={handleChange}
        />
        <button className="btn btn-primary" type="submit">
          {editingId ? "Mettre à jour" : "Ajouter"}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => {
              setForm({ nom: "", prenom: "", email: "", telephone: "", subscription: "" });
              setEditingId(null);
            }}
          >
            Annuler
          </button>
        )}
      </form>

      {/* Tableau des utilisateurs */}
      {loading ? (
        <p>Chargement en cours...</p>
      ) : users.length === 0 ? (
        <p>Aucun utilisateur à afficher.</p>
      ) : (
        <div className="table-responsive">
          <table className="dashboard-table admin-table">
            <thead>
              <tr>
                <th>Nom complet</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Abonnement</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td><strong>{u.nom} {u.prenom}</strong></td>
                  <td>{u.email}</td>
                  <td>{u.telephone || <span className="text-muted">Non renseigné</span>}</td>
                  <td>{u.subscription || <span className="text-muted">—</span>}</td>
                  <td className="actions-cell">
                    <button
                      className="btn btn-edit"
                      onClick={() => {
                        setForm({
                          nom: u.nom,
                          prenom: u.prenom,
                          email: u.email,
                          telephone: u.telephone || "",
                          subscription: u.subscription || ""
                        });
                        setEditingId(u._id);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(u._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;