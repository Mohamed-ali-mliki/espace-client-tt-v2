import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Inscription from "./pages/Inscription";
import DashboardClient from "./pages/DashboardClient";
import DashboardAdmin from "./pages/DashboardAdmin";
import Subscriptions from "./pages/Subscriptions";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/dashboard-client" element={<DashboardClient />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        
      </Routes>
    </Router>
  );
}

export default App;
