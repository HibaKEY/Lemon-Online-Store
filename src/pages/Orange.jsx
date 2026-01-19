import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const products = [
  {
    title: "Maroc Late",
    img: "/orange/maroc late.png",
    price: 4.60,
    oldPrice: 9,
    rating: 4.6,
    sku: "CL-MAL-2025",
    tags: ["Clémentine", "Agrume", "Bekria"],
    description: "Le Maroc tard est une variété d'orange qui mûrit très tard. Sa chair se caractérise par une teneur exceptionnellement élevée en jus et une saveur de grande qualité gustative.",
    characteristics: [
      "Forme : Ronde à légèrement ovale",
      "Taille : Moyenne à grande",
      "Couleur de la peau : orange vif",
      "Texture de la chair : Juicy et tender",
      "Présence de graines : Habituellement sans graines",
      "Fermeur : Entreprise",
      "Arôme : doux avec une tanginess subtile",
      "Contenu du jus : élevé",
      "Acidité : Typiquement environ 0,7 % à 0,9 %",
      "Rapport sucré/acidité : équilibré, généralement de l'ordre de 10 à 15",
    ],
    informations: ["Origine : Maroc", "Saison : Novembre - Janvier", "Poids : 90-120g"],
    exportations: [
      { country: "Canada", value: 87 },
      { country: "Russie", value: 95 },
      { country: "Afrique", value: 80 },
      { country: "États-Unis", value: 80 },
    ],
  },
  {
    title: "Navel Cambria",
    img: "/orange/NAVEL CAMBRIA.png",
    price: 7,
    oldPrice: 10,
    rating: 4.8,
    sku: "CL-CAMBR-2025",
    tags: ["Clémentine", "Agrume"],
    description: "Ce navel sans graine de fin de saison est exceptionnellement savoureux: très joli et sucré, récolté à sa pleine maturité sous le soleil méditerranéen. Il est dégusté à la fois comme collation et dans des plats cuisinés. Cultivés dans un verger unique en Méditerranée, celui de L’Agrumiste, près de Fes au Maroc, ils sont tout simplement délicieux.",
    characteristics: [
      "Forme : Sphérique à oblongue",
      "Taille : Moyenne à grande",
      "Couleur de la peau : orange avec des taches jaunâtres au début de la saison et orange plus tard dans la saison",
      "Texture de chair : Juicy et fibreux",
      "Présence dans les graines : Peu de graines",
      "Fermeture: ferme à légèrement molle",
      "Arôme : sucrée et succulente",
      "Teneur en jus: supérieure à 40 %",
      "Acidité : 0,7 % minimum",
      "Rapport entre sucre et césature : Minimum 8,5",
    ],
    informations: ["Origine : Maroc", "Saison : Décembre - Février", "Poids : 100-130g"],
    exportations: [
      { country: "Canada", value: 87 },
      { country: "Russie", value: 95 },
      { country: "Afrique", value: 80 },
      { country: "États-Unis", value: 80 },
    ],
  },
  {
    title: "LAT DE MAROC",
    img: "/orange/NAVEL LANE LATE.png",
    price: 6,
    oldPrice: 9,
    rating: 4.9,
    sku: "CL-LAM-2025",
    tags: ["Clémentine", "Agrume"],
    description: "Le Navel Lane Late tire son nom de sa récolte de fin de saison. Qu'il soit consommé entier ou sous forme de jus, le fruit offre une chair tendre et fine qui est sucrée et pleine de jus.",
    characteristics: [
      "Forme : Sphérique à oblongue",
      "Taille : Moyenne à grande",
      "Couleur de la peau : orange avec des taches jaunâtres au début de la saison et orange plus tard dans la saison",
      "Texture de chair : Juicy et fibreux",
      "Présence dans les graines : Peu de graines",
      "Fermeture: ferme à légèrement molle",
      "Arôme : sucrée et succulente",
      "Teneur en jus: supérieure à 40 %",
      "Acidité : 0,7 % minimum",
      "Rapport entre sucre et césature : Minimum 8,5",
    ],
    informations: ["Origine : Maroc", "Saison : Décembre - Février", "Poids : 100-130g"],
    exportations: [
      { country: "Canada", value: 87 },
      { country: "Russie", value: 95 },
      { country: "Afrique", value: 80 },
      { country: "États-Unis", value: 80 },
    ],
  },
  {
    title: "Salustiana",
    img: "/orange/salustiana.png",
    price: 8.5,
    oldPrice: 11,
    rating: 4.9,
    sku: "CL-SLS-2025",
    tags: ["Clémentine", "Agrume"],
    description: "La Salustiana est la quintessence de l'orange en simulant. Sa chair douce et délicate contient du jus abondant avec un arôme aussi délicat que odorant.",
    characteristics: [
      "Forme : Globulaire à sphérique.",
      "Taille : Moyenne à grande.",
      "Couleur de la peau : Orange avec des taches jaunâtres au début de la saison et orange vers la fin de la saison.",
      "Texture de la chair : Très juteuse, particulièrement tendre.",
      "Présence de graines : Peu de graines.",
      "Fermeur : Ferme et légèrement molle.",
      "Arôme : délicate, faible acidité et aromatique.",
      "Teneur en jus : supérieure à 40 %.",
      "Acidité: Minimum 0,7%.",
      "Rapport de sucre/acidité : Minimum 8,5."
    ],
    informations: ["Origine : Maroc", "Saison : Décembre - Février", "Poids : 100-130g"],
    exportations: [
      { country: "Canada", value: 87 },
      { country: "Russie", value: 95 },
      { country: "Afrique", value: 80 },
      { country: "États-Unis", value: 80 },
    ],
  },
  {
    title: "WASHINGTON SANGUINE",
    img: "/orange/WASHINGTON SANGUINE.png",
    price: 8,
    oldPrice: 12,
    rating: 4.9,
    sku: "CL-WSHN-2025",
    tags: ["Clémentine", "Agrume"],
    description: "Le Washington Blood Orange est reconnaissable par sa forme oblongue et sa peau lisse et orange avec des taches rougeâtres. Sa chair à pigments rouges exsude un jus sucré et tanglant.",
    characteristics: [
      "Forme : Oblong.",
      "Taille : petite à moyenne.",
      "Couleur de la peau : Orange avec des taches rougeâtres.",
      "Texture de chair : Juicy, et rouge-pigmenté.",
      "Présence de graines : Peu de graines.",
      "Entreprise : Entreprise.",
      "Arôme : Sweet et légèrement acide.",
      "Teneur en jus : supérieure à 40 %.",
      "Acidité: Minimum 0,7%.",
      "Rapport de sucre/acidité : Minimum 8,5.",
    ],
    informations: ["Origine : Maroc", "Saison : Décembre - Février", "Poids : 100-130g"],
    exportations: [
      { country: "Canada", value: 87 },
      { country: "Russie", value: 95 },
      { country: "Afrique", value: 80 },
      { country: "États-Unis", value: 80 },
    ],
  },
];

// Progress bars
const ExportationBars = ({ data }) => {
  return (
    <div className="export-bars">
      {data.map((item, i) => (
        <div key={i} className="export-item">
          <span className="country">{item.country}</span>
          <div className="bar-container">
            <div className="bar-fill" style={{ width: `${item.value}%` }}></div>
          </div>
          <span className="percent">{item.value} %</span>
        </div>
      ))}
      <style>{`
        .export-item { display:flex; align-items:center; gap:12px; margin:10px 0; }
        .country { width:100px; font-weight:700; }
        .bar-container { flex:1; height:8px; background:#ddd; border-radius:6px; overflow:hidden; }
        .bar-fill { height:100%; background: linear-gradient(90deg, #4caf50, #ff9800); border-radius:6px; }
        .percent { font-weight:700; }
      `}</style>
    </div>
  );
};

// Brands with images
const brands = [
  { src: "/brand1.png", name: "IRIS MAROC" },
  { src: "/brand2.png", name: "ATLANTIC" },
  { src: "/brand3.png", name: "CLEMENTINE" },
  { src: "/brand4.png", name: "ZAGORA" },
  { src: "/brand5.png", name: "GUERDANE" },
  { src: "/brand6.png", name: "ALIAS" },
  { src: "/brand7.png", name: "ANGIE" },
];

const PACK_PRICE_DELTA = { "Caisse 10kg": 0, "Caisse 15kg": 6, "Filet 5kg": -4 };

const ClementinePage = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedCalibre, setSelectedCalibre] = useState("Small");
  const [selectedPack, setSelectedPack] = useState("Caisse 10kg");
  const [selectedBrand, setSelectedBrand] = useState("IRIS MAROC");
  const [activeTab, setActiveTab] = useState("caracteristiques");

  const computePrice = (base) => base + (PACK_PRICE_DELTA[selectedPack] || 0);

  const handleAddToCart = (p) => {
    const sizeKg = selectedPack.includes("15") ? 15 : selectedPack.includes("5") ? 5 : 10;
    const unitPrice = computePrice(p.price);
    const uniqueId = `${p.sku}-${selectedBrand}`;
    addItem({
      id: uniqueId,
      name: p.title,
      image: p.img,
      sizeKg,
      unitPrice,
      pack: selectedPack,
      calibre: selectedCalibre,
      brand: selectedBrand,
      quantity: 1,
    });
  };

  return (
    <div className="product-page">
      <style>{`
         .main-image {
          width:500px;
          height:500px;
          transform: translateY(-250px); /* طلعيهم شوية */
          transition: transform 0.3s ease;
        }
        .product-page { max-width:1200px; margin:0 auto; padding:0 16px; font-family:Poppins,sans-serif; color:white; }
        .product-row { display:flex; flex-wrap:wrap; margin-bottom:60px; align-items:center; }
        .product-row:nth-child(even) { flex-direction: row-reverse; }
        .glass-card { border-radius:20px; padding:32px; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border:1px solid rgba(255,255,255,0.2); box-shadow:0 8px 24px rgba(0,0,0,0.25); background-color: rgba(0,0,0,0.4);
          display:flex; flex:1; gap:32px; }
        .main-image { width:400px; height:350px; border-radius:16px; object-fit:cover; }
        .info { flex:1; display:flex; flex-direction:column; gap:16px; }
        .title { font-size:2rem; font-weight:700; text-shadow:1px 1px 4px rgba(0,0,0,0.6); }
        .rating { display:flex; align-items:center; gap:8px; color:#ffcc00; text-shadow:1px 1px 4px rgba(0,0,0,0.6); }
        .price-row { display:flex; align-items:end; gap:12px; }
        .price { font-size:1.8rem; font-weight:800; color:#90ee90; text-shadow:1px 1px 4px rgba(0,0,0,0.6); }
        .old { text-decoration:line-through; color:#bbb; font-weight:600; }
        .options { display:flex; flex-wrap:wrap; gap:14px; margin-top:8px; }
        .chip { padding:8px 14px; background:rgba(255,255,255,0.1); border-radius:999px; cursor:pointer;
          border:1px solid rgba(255,255,255,0.3); transition:0.3s; color:white; }
        .chip img { width:100px; height:60px; object-fit:cover; transition:0.3s; }
        .chip:hover { transform:scale(1.1); background:rgba(255,255,255,0.2); }
        .chip.active { background: rgba(255,255,255,0.25); border-color:#ffc107; box-shadow:0 0 12px rgba(255,193,7,0.5); }
        .chip.active img { transform:scale(1.15); }
        .options[data-type="brands"] .chip {
          width: 110px;
          height: 110px;
          padding: 0;
          overflow: hidden;
          border-radius: 12px;
        }
        .options[data-type="brands"] .chip img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          transition: 0.3s ease;
        }
        .cta-row { display:flex; gap:12px; margin-top:16px; flex-wrap:wrap; }
        .btn { padding:12px 22px; border-radius:12px; border:none; cursor:pointer; font-weight:700; transition:0.3s; }
        .btn-primary { background:#2e7d32; color:white; }
        .btn-primary:hover { background:#27642a; }
        .btn-outline { background:transparent; color:white; border:2px solid white; }
        .btn-outline:hover { background:white; color:#2e7d32; }
        .meta { font-size:0.95rem; color:white; display:flex; gap:16px; flex-wrap:wrap; }
        .tabs { display:flex; gap:10px; margin-top:16px; flex-wrap:wrap; }
        .tabs button { padding:8px 14px; border:none; border-radius:8px; cursor:pointer; font-weight:600; transition:0.3s; }
        .tabs button.active { background:#ff9800; color:white; }
        .tab-content { padding:16px; margin-top:10px; border-radius:12px; background:rgba(255,255,255,0.05); }
        @media(max-width:980px){ .product-row{ flex-direction:column; align-items:center; } .main-image{ width:100%; height:auto; } }
      `}</style>

      {products.map((p, i) => (
        <div
          key={i}
          className="product-row glass-card"
          style={{ marginTop: i === 0 ? "120px" : "0px" }}
        >
          <img src={p.img} alt={p.title} className="main-image" />
          <div className="info">
            <div className="title">{p.title}</div>
            <div className="rating"><span>★</span> {p.rating}</div>
            <div className="price-row">
              <div className="price">{computePrice(p.price).toFixed(2)}  €</div>
              <div className="old">{computePrice(p.oldPrice).toFixed(2)}  €</div>
            </div>
            <p>{p.description}</p>

            {/* Calibres */}
            <div className="options">
              {["Small", "Medium", "Large"].map((c) => (
                <div key={c} className={`chip ${selectedCalibre === c ? "active" : ""}`} onClick={() => setSelectedCalibre(c)}>
                  {c}
                </div>
              ))}
            </div>

            {/* Packs */}
            <div className="options" style={{ marginTop: "8px" }}>
              {["Caisse 10kg", "Caisse 15kg", "Filet 5kg"].map((pack) => (
                <div key={pack} className={`chip ${selectedPack === pack ? "active" : ""}`} onClick={() => setSelectedPack(pack)}>
                  {pack}
                </div>
              ))}
            </div>

            {/* Brands */}
            <div className="options" data-type="brands" style={{ marginTop: "8px" }}>
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className={`chip ${selectedBrand === brand.name ? "active" : ""}`}
                  onClick={() => setSelectedBrand(brand.name)}
                >
                  <img src={brand.src} alt={brand.name} />
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="cta-row">
              <button className="btn btn-primary" onClick={() => handleAddToCart(p)}>
                AJOUTER AU PANIER
              </button>
              <button
                className="btn btn-outline"
                onClick={() => navigate("/payment", { state: { product: p, brand: selectedBrand, pack: selectedPack, calibre: selectedCalibre } })}
              >
                ACHETER MAINTENANT
              </button>
            </div>

            <div className="meta">
              <div>SKU: {p.sku}</div>
              <div>Tags: {p.tags.join(", ")}</div>
            </div>

            {/* Tabs */}
            <div className="tabs">
              <button className={activeTab === "caracteristiques" ? "active" : ""} onClick={() => setActiveTab("caracteristiques")}>
                Caractéristiques
              </button>
              <button className={activeTab === "informations" ? "active" : ""} onClick={() => setActiveTab("informations")}>
                Informations
              </button>
              <button className={activeTab === "avis" ? "active" : ""} onClick={() => setActiveTab("avis")}>
                Export
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "caracteristiques" && <ul>{p.characteristics.map((c, j) => <li key={j}>{c}</li>)}</ul>}
              {activeTab === "informations" && <ul>{p.informations.map((c, j) => <li key={j}>{c}</li>)}</ul>}
              {activeTab === "avis" && <ExportationBars data={p.exportations} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClementinePage;