import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedOTP = localStorage.getItem("otp");
    if (otp === storedOTP) {
      // OTP correct : Redirige vers reset password ou login
      localStorage.removeItem("otp");
      alert("OTP vérifié ! Vous pouvez réinitialiser votre mot de passe.");
      navigate("/"); // Ou vers une page de reset password
    } else {
      setError("OTP incorrect. Réessayez.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Vérifier OTP</h2>
        <p>Un OTP a été envoyé à votre téléphone/email.</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Code OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Entrez le code OTP"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Vérifier
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;