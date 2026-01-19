import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const varieties = [
  { name: "Clémentine Bekria", image: "/clementine/bekria.png", price: "12.00 MAD/kg", rating: 4.6, description: "Variété précoce, récoltée dès octobre. Saveur douce et très appréciée sur le marché marocain." },
  { name: "Clémentine Guerdane", image: "/clementine/guerdane.png", price: "13.50 MAD/kg", rating: 4.4, description: "Connue pour sa peau fine et sa pulpe juteuse. Variété mi-saison au goût équilibré." },
  { name: "Clémentine Nour", image: "/clementine/nour.png", price: "14.00 MAD/kg", rating: 4.8, description: "Variété tardive, récoltée de janvier à mars. Très bonne conservation et arômes intenses." },
];

const ClementineVarieties = () => {
  const navigate = useNavigate();
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="clementine-page">
      <style>{`
        .clementine-page {
          font-family: 'Poppins', sans-serif;
          color: #333;
          background: #fff;
          padding: 20px;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          max-width: 1200px;
          margin: 60px auto;
          gap: 40px;
          border-radius: 20px;
          overflow: hidden;
          height: 400px;
        }
        .hero-section::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: url('/clementine/Clementine.png') center/cover no-repeat;
          z-index: 1;
        }
        .hero-overlay {
          position: absolute;
          top:0; left:0;
          width:100%; height:100%;
          background: rgba(0,0,0,0.35);
          z-index:2;
        }
        .hero-text {
          position: relative;
          z-index:3;
          flex:1;
          min-width:300px;
          color:white;
          display:flex;
          flex-direction:column;
          justify-content:center;
          gap:20px;
          padding: 0 20px;
        }
        .hero-text h1 {
          font-size: 3rem;
          color:#ffeb3b;
          text-shadow: 2px 2px 10px rgba(0,0,0,0.7);
        }
        .hero-text p {
          font-size: 1.2rem;
          line-height:1.6;
          text-shadow:1px 1px 6px rgba(0,0,0,0.6);
        }
        .hero-text button {
          padding: 14px 32px;
          border-radius: 30px;
          border: none;
          background: linear-gradient(to right, #ffeb3b, #ffc107);
          color: #333;
          font-weight: bold;
          cursor: pointer;
          width: fit-content;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .hero-text button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.4);
        }

        /* Varieties Section */
        .varieties-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          max-width: 1100px;
          margin: 60px auto;
        }
        .variety-card {
          display: grid;
          grid-template-columns: 300px 1fr;
          background: rgba(255,255,255,0.92);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          cursor: pointer;
          opacity: 0;
          transform: translateY(50px);
          transition: transform 0.6s ease, box-shadow 0.3s ease, opacity 0.6s ease;
        }
        .variety-card:hover { box-shadow: 0 14px 30px rgba(0,0,0,0.2); transform: translateY(0px) scale(1.01); }
        .variety-card.visible { opacity: 1; transform: translateY(0); }

        .variety-media { position: relative; height: 220px; }
        .variety-media img { width: 100%; height: 100%; object-fit: cover; display:block; }

        .variety-info { padding: 20px 24px; display:flex; flex-direction:column; gap:10px; justify-content:center; }
        .variety-header { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
        .variety-info h3 { font-size: 1.5rem; color: #ff6600; margin: 0; }
        .variety-desc { font-size: 1rem; line-height: 1.6; color:#444; }

        .meta-row { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-top:8px; flex-wrap:wrap; }
        .price { font-weight:700; color:#2e7d32; background:#e8f5e9; padding:6px 12px; border-radius:12px; }
        .rating { display:flex; align-items:center; gap:8px; color:#ff8f00; }
        .star { color:#ffc107; }

        /* Staggered Animation */
        ${varieties.map((_, i) => `
          .variety-card.visible[data-index="${i}"] { transition-delay: ${i * 0.15}s; }
        `).join('')}

        @media (max-width: 768px){
          .hero-section { flex-direction: column; height: 350px; margin:40px 20px; }
          .hero-text h1 { font-size: 2rem; }
          .hero-text p { font-size:1rem; }

          .variety-card { grid-template-columns: 1fr; }
          .variety-media { height: 200px; }
        }
      `}</style>

      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-text">
          <h1>Clémentine</h1>
          <p>Découvrez nos variétés cultivées avec passion et savoir-faire.</p>
          <button onClick={() => navigate("/clementine-varieties")}>Explorer les variétés</button>
        </div>
      </div>

      <section className="varieties-section">
        {varieties.map((item, index) => (
          <div
            key={index}
            data-index={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`variety-card ${visibleCards.includes(index) ? "visible" : ""}`}
          >
            <div className="variety-media">
              <img src={item.image} alt={item.name}/>
            </div>
            <div className="variety-info">
              <div className="variety-header">
                <h3>{item.name}</h3>
                <div className="rating" aria-label={`Note ${item.rating} sur 5`}>
                  <span className="star">★</span>
                  <span>{item.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="variety-desc">{item.description}</p>
              <div className="meta-row">
                <span className="price">{item.price}</span>
                <button className="cta" onClick={() => navigate('/contact')}>Commander</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ClementineVarieties;
