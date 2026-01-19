import React from "react";
import { Link } from "react-router-dom";


const orangeVarieties = [
  {
    name: "Valencia",
    description:
      "Orange polyvalente, riche en jus et douce, parfaite pour le jus frais.",
    season: "Mars - Juin",
    imageUrl: "/orange/valencia.png",
  },
  {
    name: "Navel",
    description:
      "Orange sans pépins, avec une saveur sucrée et une écorce facile à éplucher.",
    season: "Décembre - Avril",
    imageUrl: "/orange/navel.png",
  },
  {
    name: "Blood Orange",
    description:
      "Orange à chair rouge, saveur sucrée avec une pointe d’acidité, idéale pour les salades et desserts.",
    season: "Décembre - Mai",
    imageUrl: "/orange/blood-orange.png",
  },
  {
    name: "Sevilla",
    description:
      "Orange amère, parfaite pour la confiture et les liqueurs.",
    season: "Décembre - Février",
    imageUrl: "/orange/sevilla.png",
  },
];

export default function OrangeVarieties() {
  return (
    <div className="orange-varieties-page" style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Variétés d'Orange</h1>
      <div className="varieties-list" style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
        {orangeVarieties.map((orange, index) => (
          <div
            key={index}
            className="orange-card"
            style={{
              backgroundColor: "#fff3e0",
              borderRadius: "15px",
              overflow: "hidden",
              width: "300px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <div className="image-container" style={{ height: "200px", overflow: "hidden" }}>
              <img
                src={orange.imageUrl}
                alt={orange.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="text-container" style={{ padding: "1rem" }}>
              <h2 style={{ marginBottom: "0.5rem" }}>{orange.name}</h2>
              <p style={{ marginBottom: "0.5rem" }}>{orange.description}</p>
              <p style={{ fontStyle: "italic", color: "#555" }}>Saison: {orange.season}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Link to="/" style={{
          backgroundColor: "#f97316",
          color: "#fff",
          border: "none",
          borderRadius: "35px",
          padding: "15px 40px",
          fontWeight: "700",
          cursor: "pointer",
          textDecoration: "none"
        }}>
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
