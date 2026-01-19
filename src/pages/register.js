// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../App.css";
import PageTransition from "./PageTransition";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // SIMULATION: Khazen l'utilisateur f localStorage
    // F REAL LIFE APPLICATION, ghadi tssift had les données l'API dialek
    localStorage.setItem("registeredEmail", email);
    localStorage.setItem("registeredPassword", password); // Attention: Hadchi machi secure f real app!

    alert("Inscription réussie ! Vous êtes maintenant connecté.");

    if (onRegister) {
      onRegister(); // Authentifier l'utilisateur
    }
    
    navigate("/"); // N7awlouh l page d'accueil
  };

  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="login-container"
      >
        <div className="login-box">
          <h2>S'inscrire</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="reg-email">Email</label>
              <input
                type="email"
                id="reg-email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="reg-password">Mot de passe</label>
              <input
                type="password"
                id="reg-password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirm-password">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirmer votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              S'inscrire
            </button>
          </form>
          <p className="signup-link">
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </p>
        </div>
      </motion.div>
    </PageTransition>
  );
}

export default Register;