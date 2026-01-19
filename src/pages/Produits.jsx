import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

// =======================
// Liste des produits
// =======================
const products = [
  {
    id: 1,
    name: "Clémentine",
    imageUrl: "/clementine/clementine.png",
    description:
      "La clémentine tardive découverte au Domaine Abbès Kabbage est moyennement vigoureuse avec un feuillage long et étroit qui lui donne un aspect pleureur unique.",
  },
  {
    id: 2,
    name: "Mandarine",
    imageUrl: "/mandarine/mandarine.png",
    description:
      "La mandarine est appréciée pour son goût sucré et sa facilité à être pelée, idéale pour la consommation fraîche.",
  },
  {
    id: 3,
    name: "Citron",
    imageUrl: "/citron/citron.png",
    description:
      "Le citron est un agrume polyvalent, souvent utilisé en cuisine et en médecine traditionnelle pour ses propriétés rafraîchissantes et antiseptiques.",
  },
  {
    id: 4,
    name: "Orange",
    imageUrl: "/orange/orange.png",
    description:
      "L'orange est un fruit riche en vitamine C, apprécié pour son goût sucré-acidulé et ses bienfaits pour la santé.",
  },
];

// =======================
// Composant Slider
// =======================
export default function AutoVerticalSlider() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: current * window.innerHeight,
        behavior: "smooth",
      });
    }
  }, [current]);

  return (
    <div
      className="slider-container"
      ref={containerRef}
      style={{ height: "100vh", width: "100vw", overflow: "hidden" }}
    >
      {products.map((product, index) => (
        <section
          key={product.id}
          className="slide"
          style={{
            flexDirection: index % 2 === 0 ? "row" : "row-reverse",
            transform: current === index ? "scale(1)" : "scale(0.95)",
            opacity: current === index ? 1 : 0.6,
            height: "100vh",
            width: "100vw",
            display: "flex",
            position: "relative",
            transition: "transform 0.8s ease, opacity 0.8s ease",
          }}
        >
          {/* Image + Overlay */}
          <div className="image-section" style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                width: "100%",
                height: "100vh",
                objectFit: "cover",
                transform: current === index ? "scale(1)" : "scale(1.05)",
                opacity: current === index ? 1 : 0.85,
              }}
            />
            {/* Overlay شفاف فوق الصورة */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,-3)",   // يخلي النص يبان
              }}
            ></div>
          </div>

          {/* Texte et bouton */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              maxWidth: "500px",
              transform: "translateY(-50%)",
              color: "#fff",
              left: index % 2 === 0 ? "50px" : "auto",
              right: index % 2 === 0 ? "auto" : "50px",
              opacity: current === index ? 1 : 0,
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <h1
              style={{
                fontSize: "4rem",
                fontWeight: "900",
                marginBottom: "20px",
                textTransform: "uppercase",
                letterSpacing: "3px",
                color: "#fff3e0",
                textShadow: "2px 2px 10px rgba(0,0,0,0.9)", // نص واضح
              }}
            >
              {product.name}
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.5",
                marginBottom: "30px",
                color: "white",
                textShadow: "1px 1px 8px rgba(0,0,0,0.8)", // ظل للنص
              }}
            >
              {product.description}
            </p>
            <button
              style={{
                backgroundColor: "#f97316",
                color: "#fff",
                border: "none",
                borderRadius: "35px",
                padding: "15px 40px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
              }}
              onClick={() => {
                if (product.name === "Clémentine") {
                  navigate("/Clementine");
                }  else if (product.name === "Mandarine") {
                  navigate("/Mandarine");
                } else if (product.name === "Citron") {
                  navigate("/Citron");
                } else if (product.name === "Orange") {
                  navigate("/Orange");
                }
              }}
            >
              Voir Plus
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}
