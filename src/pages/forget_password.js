import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation : Génère un OTP aléatoire et le stocke dans localStorage
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("otp", generatedOTP);
    localStorage.setItem("recoveryPhone", phone);
    localStorage.setItem("recoveryEmail", email);
    console.log("OTP généré (pour test) :", generatedOTP); // En production, envoie par SMS/Email
    alert("OTP envoyé ! Vérifiez la console pour le test.");
    navigate("/verify-otp");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Mot de passe oublié</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              required
            />
          </div>
          <div className="input-group">
            <label>Numéro de téléphone</label>
            <PhoneInput
              country={"ma"}
              value={phone}
              onChange={setPhone}
              inputClass="phone-input-custom"
              buttonClass="phone-input-button-custom"
              containerClass="phone-input-container-custom"
              dropdownClass="phone-input-dropdown-custom"
              placeholder="Entrez votre numéro"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Envoyer OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;