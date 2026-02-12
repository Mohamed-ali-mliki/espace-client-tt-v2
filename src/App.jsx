// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import du Footer
import Home from "./pages/Home";
import Login from "./pages/Login";
import Inscription from "./pages/Inscription";
import DashboardClient from "./pages/DashboardClient";
import DashboardAdmin from "./pages/DashboardAdmin";
import Subscriptions from "./pages/Subscriptions";

function App() {
  return (
    <Router>
      {/* Navbar en haut de toutes les pages */}
      <Navbar />

      {/* Contenu des pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/dashboard-client" element={<DashboardClient />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>

      {/* Footer en bas de toutes les pages */}
      <Footer />
    </Router>
  );
}

export default App;
