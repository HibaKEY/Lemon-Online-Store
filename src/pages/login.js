// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../App.css";
import PageTransition from "./PageTransition";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // SIMULATION: Jbed l'utilisateur mn localStorage
    const storedEmail = localStorage.getItem("registeredEmail");
    const storedPassword = localStorage.getItem("registeredPassword"); // Attention: Machi secure!

    // Vérifié wach had l'email o mot de passe kaynin f localStorage
    if (email === storedEmail && password === storedPassword) {
      onLogin(); // N3elmou l'App.js belli l'utilisateur tlaqa
      navigate("/"); // N7awlouh l page d'accueil
    } else {
      alert("Email ou mot de passe incorrect.");
    }
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
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="forgot-password">
              <Link to="/forget-password">Mot de passe oublié?</Link>
            </p>
            <button type="submit" className="login-button">
              Se connecter
            </button>
          </form>
          <p className="signup-link">
            Pas encore de compte ? <Link to="/register">S'inscrire</Link>
          </p>
        </div>
      </motion.div>
    </PageTransition>
  );
}

export default Login;