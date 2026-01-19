import React, { useState, useEffect, useRef } from "react";

const APropos = () => {
  const [active, setActive] = useState(null);
  const servicesRef = useRef(null); // Ref for Services section
  const achievementsRef = useRef(null); // Ref for Achievements section
  
  const toggleAccordion = (index) => {
    setActive(active === index ? null : index);
  };

  const scrollToServices = () => {
    servicesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Array dial achievements
  const achievements = [
    { id: 1, number: 50, label: "Années d'expérience", suffix: "+" },
    { id: 2, number: 10000, label: "Hectares cultivés", suffix: "+" },
    { id: 3, number: 6, label: "Destinations mondiales", suffix: "+" },
    { id: 4, number: 5000, label: "Employés", suffix: "+" },
  ];

  // State + counter effect
  const [counts, setCounts] = useState(achievements.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once triggered
        }
      },
      { threshold: 0.3 }
    );

    if (achievementsRef.current) {
      observer.observe(achievementsRef.current);
    }

    return () => {
      if (achievementsRef.current) {
        observer.unobserve(achievementsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds animation
      const stepTime = 20;
      const steps = Math.round(duration / stepTime);

      const increments = achievements.map((item) => item.number / steps);

      let startTime = null;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCounts((prevCounts) =>
          prevCounts.map((count, i) =>
            Math.round(progress * increments[i] * steps)
          )
        );
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible]);

  // Farm items
  const farmItems = [
    {
      title: "La pépinière",
      text: "Cette activité est assurée par SAPIAMA, basée à quelques kilomètres de Taroudant...",
      img: "/capture1.jpg",
    },
    {
      title: "Le conditionnement",
      text: "La société SKS (Station d'Emballage Kabbage Souss) située dans la région de Sebt El Guerdane...",
      img: "/capture2.png",
    },
    {
      title: "L'export",
      text: "Le groupe exporte ses produits via GPA et Fresh Fruit...",
      img: "/capture4.png",
    },
    {
      title: "La production",
      text: "Les fermes sont certifiées Global Gap et Nurture, permettant au groupe d'accéder aux marchés...",
      img: "/capture3.png",
    },
  ];

  // HeroSlider state
  const images = [
    {
      id: 1,
      src: "/1.png",
      title: "À propos de nous",
      desc: "On fournit haut produits de qualité",
    },
    {
      id: 2,
      src: "/2.png",
      title: "À propos de nous",
      desc: "On fournit haut produits de qualité",
    },
    {
      id: 3,
      src: "/3.png",
      title: "À propos de nous",
      desc: "On fournit haut produits de qualité",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // World Map State
  const [activeContinent, setActiveContinent] = useState(null);

  const continents = [
    {
      id: "africa",
      name: "Afrique",
      details:
        "L'Afrique est connue pour sa diversité agricole et son potentiel d'exportation.",
      more: "Nous collaborons avec plusieurs pays africains pour développer des pratiques durables.",
      pinPosition: { top: "72%", left: "42%" },
    },
    {
      id: "europe",
      name: "Europe",
      details:
        "L'Europe bénéficie d'une agriculture moderne et d'un réseau d'import important.",
      more: "Nos exportations vers l'Europe incluent des produits bio et certifiés.",
      pinPosition: { top: "12%", left: "47%" },
    },
    {
      id: "america",
      name: "Amérique",
      details:
        "Les oranges nautiques marocaines et les citrons de Lisbonne ont gagné une forte popularité sur le marché américain en raison de leurs profils de saveur uniques et de leurs normes de qualité inébranlables. En outre, les mandarines marocaines de Murcott et les clémentines marocaines de clémentine sont très convoitées pour leur douceur et leur fraîcheur. Dans l'ensemble, le Maroc occupe une position centrale dans l'industrie des agrumes des États-Unis, fournissant systématiquement une sélection variée de produits haut de gamme tout au long de l'année.",
      more: "États-Unis",
      pinPosition: { top: "46%", left: "6.5%" },
    },
    {
      id: "asia",
      name: "Russie",
      details:
        "Le partenariat fructueux entre SKS et la Russie dans l'industrie des agrumes a été un véritable succès commercial, générant des revenus importants. Tirant parti de sa réputation d'excellence dans la culture des agrumes, SKS a exporté une large gamme de fruits vers la Russie, y compris des oranges juteuses, des citrons acidulés, des mandarines savoureuses et des pamplemousses rafraîchissants.",
      more: "Russie",
      pinPosition: { top: "13%", left: "70.5%" },
    },
    {
      id: "middle-east",
      name: "Moyen-Orient",
      details:
        "Le commerce des agrumes entre le Maroc et le Moyen-Orient est une pierre angulaire du commerce régional. La réputation du Maroc en matière de qualité exceptionnelle d'agrumes et son habileté à répondre aux préférences nuancées des consommateurs du Moyen-Orient soulignent son importance sur ce marché. Parmi les variétés d'agrumes exportées du Maroc vers le Moyen-Orient figurent les oranges de Maroc Navel, les citrons de Lisbonne, ainsi que les mandarines et clémentines recherchées.",
      more: "Moyen-Orient",
      pinPosition: { top: "72%", left: "66%" },
    },
    {
      id: "canada",
      name: "Canada",
      details:
        "Le succès du partenariat entre SKS et le Canada dans l'industrie des agrumes s'est avéré être une entreprise lucrative, qui se traduit par des revenus substantiels. S'appuyant sur sa réputation estimée pour la culture des agrumes, SKS a exporté un large éventail de fruits au Canada, y compris des oranges succulentes, des citrons zestes, de délicieuses mandarines et des pamplemousses revitalisants.",
      more: "Canada",
      pinPosition: { top: "12%", left: "19.5%" },
    },
  ];

  const toggleContinent = (continent) => {
    setActiveContinent(activeContinent?.id === continent.id ? null : continent);
  };

  const closeDetails = () => {
    setActiveContinent(null);
  };

  return (
    <div className="apropos-page">
      {/* Hero Slider */}
      <div className="hero-slider">
        <div
          className="main-image"
          style={{ backgroundImage: `url(${images[activeIndex].src})` }}
        >
          <div className="overlay"></div>
        <div className="hero-content">
            <h1>{images[activeIndex].title}</h1>
            <p className="hero-desc">{images[activeIndex].desc}</p>
            <button className="hero-btn" onClick={scrollToServices}>
              Explorer-vous
            </button>
        </div>
          <div className="fixed-thumbnails">
            {images.map((img, index) => (
              <div
                key={img.id}
                className={`thumb ${activeIndex === index ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <img src={img.src} alt={img.title} />
                </div>
            ))}
                </div>
                </div>
              </div>

      {/* Services Section */}
      <section className="services" ref={servicesRef}>
        <div className="services-container">
          <div className="big-img">
            <img src="/kabbage.png" alt="Farm overview" />
          </div>
          <div className="services-content">
            <h2>Présentation générale du groupe Kabbage</h2>
            <p>
              Le groupe Kabbage est un géant au Maroc avec plus de 50 ans d’expérience dans le secteur agricole. C'est un conglomérat de sociétés détenues par les héritiers de M. Abbès Kabbage, pionnier dans le développement de l’industrie des agrumes au Maroc, notamment dans la région du Souss où il a commencé son activité en 1957.

              En effet, la production est réalisée par la société historique "Groupe Abbès Kabbage", qui possède 2000 hectares répartis dans les régions de Souss, Gharb et Beni Mellal. Ces domaines, réorganisés par son fils, Tariq Kabbage, seraient des fermes d'agrumes modèles.

              Le groupe n'exportant pas ses produits sous forme brute, une station d'emballage appelée "Kabbage Souss Station" est responsable de l'emballage. Cette station couvre une superficie de 80.000 mètres carrés d'une capacité de réfrigération de 10.000 tonnes. La production annuelle de cette station est estimée à 30.000 tonnes.
            </p>
            <div className="accordions">
              {[
                {
                  title: "Le présent",
                  content:
                    "Depuis 2013, la stratégie s'est recentrée sur les agrumes à forte valeur ajoutée...",
                },
                {
                  title: "Le futur",
                  content:
                    "Production, Conditionnement, Pépinière et R&D, Commercialisation... Le groupe continue de se développer et d'innover.",
                },
              ].map((item, index) => (
                <div
                  className={`accordion ${active === index ? "active" : ""}`}
                  key={index}
                >
                  <div
                    className="accordion-header"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h4>{item.title}</h4>
                    <span>{active === index ? "−" : "+"}</span>
                  </div>
                  <div
                    className="accordion-content"
                    style={{
                      maxHeight: active === index ? "200px" : "0",
                      padding: active === index ? "10px 15px" : "0 15px",
                    }}
                  >
                    <p>{item.content}</p>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </section>

      {/* Experience the Farm Section */}
      <section className="experience-farm">
        <h2>Les activités du groupe</h2>
        <div className="farm-grid">
          {farmItems.map((item, index) => (
            <div className="farm-item" key={index}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
                </div>
          ))}
                </div>
      </section>

      {/* World Map Section */}
      <section className="world-map-section">
        <div className="map-title">
          <h2>Notre Présence Mondiale</h2>
          <p>Exportations vers 6 destinations majeures</p>
              </div>

        <div className="map-wrapper">
          <div className="map-container">
            <img
              src="/world-map-fullscreen.jpg"
              alt="World Map"
              className="world-map"
            />

            {continents.map((continent) => (
              <div
                key={continent.id}
                className={`map-pin-wrapper ${
                  activeContinent?.id === continent.id ? "active" : ""
                }`}
                style={{
                  top: continent.pinPosition.top,
                  left: continent.pinPosition.left,
                }}
                onClick={() => toggleContinent(continent)}
              >
                <div className="pin-dot"></div>
                <div className="pin-hitbox"></div>
                <div className="pin-tooltip">
                  <span>{continent.name}</span>
                </div>
                </div>
            ))}
              </div>
            </div>

        {/* Continent Details - Sous la carte */}
        {activeContinent && (
          <div className="continent-details-container">
            <div className="continent-details fade-in">
              <div className="details-header">
                <h3>{activeContinent.name}</h3>
                <button className="close-details" onClick={closeDetails}>
                  ×
                </button>
                </div>
              <div className="details-body">
                <div className="details-main">
                  <p className="details-text">{activeContinent.details}</p>
              </div>
                <div className="details-more">
                  <p className="more-text">{activeContinent.more}</p>
                </div>
              </div>
                </div>
              </div>
        )}
        </section>

      {/* Achievements Section */}
      <section className="achievements" ref={achievementsRef}>
        <div className="achievements-container">
          {/* Text à gauche */}
          <div className="achievements-text">
            <h4>RÉALISATIONS</h4>
            <h2>
             Fournir de la valeur
              <br /> depuis 1950
            </h2>
            </div>
            
          {/* Nombres à droite */}
          <div className="achievements-stats">
            {achievements.map((item, i) => (
              <div
                key={item.id}
                className={`stat ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.3}s` }} // décalage pour chaque chiffre
              >
                <h3>{counts[i]}{item.suffix}</h3>
                <p>{item.label}</p>
            </div>
            ))}
          </div>
      </div>
      </section>

      {/* CSS */}
      <style jsx>{`
        .apropos-page {
          font-family: 'Segoe UI', sans-serif;
          margin: 0;
          padding: 0;
        }

        /* Hero Slider */
        .hero-slider {
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        .main-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          position: relative; 
          display: flex;
          align-items: center;
          color: white;
          transition: background-image 1s ease-in-out;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.1);
          z-index: 1;
        }

        .hero-content { 
          position: relative;
          z-index: 2;
          text-align: left;
          max-width: 550px;
          margin-left: 60px;
          animation: slideIn 0.8s ease forwards;
        }

        @keyframes slideIn {
          from {opacity:0; transform: translateX(-20px);}
          to {opacity:1; transform: translateX(0);}
        }

        .hero-content h1 {
          font-size: 52px;
          margin-bottom: 15px;
        }

        .hero-desc {
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 25px;
          color: #f0f0f0;
        }

        .hero-btn {
          background: linear-gradient(135deg, #f97316, #facc15);
          border: none;
          padding: 14px 32px;
          border-radius: 30px;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          color: white;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .hero-btn:hover {
          transform: scale(1.05);
          background: linear-gradient(135deg, #ea580c, #f59e0b);
        }

        .fixed-thumbnails {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 20px;
          z-index: 3;
          animation: slideThumbs 0.5s ease forwards;
        }

        @keyframes slideThumbs {
          from {opacity:0; transform: translateY(20px);}
          to {opacity:1; transform: translateY(0);}
        }

        .thumb {
          cursor: pointer;
          border-radius: 16px;
          overflow: hidden;
          border: 3px solid transparent;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
        }

        .thumb img {
          width: 250px;
          height: 400px;
          object-fit: cover;
          border-radius: 14px;
        }

        .thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 10px 20px rgba(0,0,0,0.4);
        }

        .thumb.active {
          border: 3px solid #f97316;
          transform: scale(1.15);
          box-shadow: 0 12px 24px rgba(0,0,0,0.5);
        }

        /* Services Section */
        .services {
          padding: 80px 10%;
          background: #fefefeff;
        }

        .services-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
          color: #000;
        }

        .big-img img {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .services-content h2 {
          font-size: 28px;
          margin-bottom: 15px;
          color: #000;
        }

        .services-content p {
          margin-bottom: 20px;
          color: #000;
        }

        /* Accordions */
        .accordions {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .accordion {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .accordion-header {
          padding: 15px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f9f9f9;
        }

        .accordion-header h4 {
          margin: 0;
          font-size: 18px;
        }

        .accordion-header span {
          font-size: 22px;
          color: #f97316;
          font-weight: bold;
        }

        .accordion-content {
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .accordion-content p {
          margin: 0;
          padding-top: 5px;
          font-size: 15px;
          max-height: 800px;
        }

        /* Experience Farm Section */
        .experience-farm {
          padding: 80px 10%;
          text-align: center;
          background: #1c5609ff;
        }

        .experience-farm h2 {
          font-size: 36px;
          margin-bottom: 40px;
          color: #fff;
        }

        /* Grid layout 2x2 */
        .farm-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          justify-items: center;
          
        }

        .farm-item {
          display: flex;
          flex-direction: column;
          width: 400px;
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 35px rgba(255, 255, 255, 0.5);
          transition: transform 0.3s ease;
          background: #f37a24ff;
          padding-bottom: 15px;
        }

        .farm-item img {
          width: 100%;
          object-fit: cover;
          border-radius: 20px 20px 0 0;
          margin-bottom: 34px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .farm-item img:hover {
          transform: scale(1.1);
          cursor: pointer;
          
        }

        .farm-item h3 {
          margin: 0 10px 10px 10px;
          text-align: center;
          color: #fff;
          font-size: 20px;
        }

        .farm-item p {
          margin: 0 10px 15px 10px;
          text-align: center;
          color: #fff;
          font-size: 14px;
        }

        /* World Map Section */
        .world-map-section {
          padding: 80px 10%;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          text-align: center;
        }

        .map-title {
          margin-bottom: 40px;
        }

        .map-title h2 {
          font-size: 32px;
          color: #1e293b;
          margin-bottom: 10px;
        }

        .map-title p {
          font-size: 16px;
          color: #64748b;
          margin: 0;
        }

        .map-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          max-width: 1000px;
          width: 100%;
          margin-bottom: 40px; /* Space for details below */
        }

        .map-container {
          position: relative;
          width: 100%;
          height: 600px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          background: #fff;
          margin: 0;
          border: 1px solid #e2e8f0;
        }

        .world-map {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          display: block;
        }

        .map-pin-wrapper {
          position: absolute;
          cursor: pointer;
          transform: translate(-50%, -50%);
          z-index: 10;
          transition: all 0.3s ease;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .map-pin-wrapper:hover,
        .map-pin-wrapper.active {
          transform: translate(-50%, -50%) scale(1.2);
        }

        .pin-dot {
          width: 18px;
          height: 18px;
          background: #f97316;
          border-radius: 50%;
          border: 3px solid white;
          position: relative;
          z-index: 3;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
        }

        .map-pin-wrapper:hover .pin-dot,
        .map-pin-wrapper.active .pin-dot {
          background: #ea580c;
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.7);
          border-color: #fff;
        }

        .pin-hitbox {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          z-index: 1;
          background: transparent;
        }

        .pin-tooltip {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(31, 41, 55, 0.95);
          color: white;
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          z-index: 4;
          margin-top: 4px;
        }

        .pin-tooltip::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid rgba(31, 41, 55, 0.95);
        }

        .map-pin-wrapper:hover .pin-tooltip,
        .map-pin-wrapper.active .pin-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        /* Continent Details - Sous la carte */
        .continent-details-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .continent-details {
          background: #fff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin: 30px auto 0;
          max-width: 800px;
          border: 1px solid #e2e8f0;
          animation: slideUp 0.5s ease-out;
          transform-origin: top;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .details-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e5e7eb;
        }

        .details-header h3 {
          margin: 0;
          font-size: 24px;
          color: #f97316;
          font-weight: 600;
        }

        .close-details {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #6b7280;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .close-details:hover {
          background: #f3f4f6;
          color: #f97316;
          transform: rotate(90deg);
        }

        .details-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .details-main {
          flex: 1;
        }

        .details-text {
          margin: 0;
          line-height: 1.7;
          color: #374151;
          font-size: 16px;
          text-align: justify;
        }

        .details-more {
          border-top: 1px solid #e5e7eb;
          padding-top: 16px;
        }

        .more-text {
          margin: 0;
          line-height: 1.7;
          color: #6b7280;
          font-size: 15px;
          font-style: italic;
          font-weight: 500;
          text-align: center;
          padding: 12px;
          background: #f8fafc;
          border-radius: 8px;
          border-left: 4px solid #f97316;
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Achievements Section */
        .achievements {
          padding: 80px 10%;
          background-color: #166e30ff;
          color: #000;
        }

        .achievements-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 60px;
          flex-wrap: wrap;
        }

        /* Text */
        .achievements-text h4 {
          color: #f9e531ff;
          font-size: 14px;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .achievements-text h2 {
          font-size: 36px;
          font-weight: 700;
          margin: 0;
          color: rgba(255, 255, 255, 1); 
        }

        /* Stats */
        .achievements-stats {
          flex: 1;
          display: flex;
          justify-content: space-around;
          gap: 40px;
          flex-wrap: wrap;
        }

        .stat {
          text-align: center;
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s ease-out;
        }

        .stat.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stat h3 {
          font-size: 48px;
          font-weight: bold;
          color: #facc15;
          margin: 0 0 10px;
        }

        .stat p {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
          color: #ffffffff;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .services-container {
            grid-template-columns: 1fr;
          }
          .experience-farm h2 {
            font-size: 28px;
          }
          .farm-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .farm-item {
            width: 80%;
          }
          .hero-content h1 {
            font-size: 32px;
          }
          .hero-desc {
            font-size: 14px;
          }
          .thumb img {
            width: 120px;
            height: 90px; 
          }
          .world-map-section {
            padding: 60px 5%;
          }
          .map-container {
            height: 450px;
            border-radius: 16px;
          }
          .continent-details {
            margin: 20px auto 0;
            padding: 20px;
            max-width: 95%;
          }
          .details-header h3 {
            font-size: 20px;
          }
          .details-text {
            font-size: 15px;
          }
          .more-text {
            font-size: 14px;
          }
          .pin-tooltip {
            display: none;
          }
          .achievements-container {
            flex-direction: column;
            text-align: center;
          }
          .achievements-stats {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .world-map-section {
            padding: 40px 5%;
          }
          .map-container {
            height: 350px;
            border-radius: 12px;
          }
          .continent-details {
            margin: 15px auto 0;
            padding: 16px;
            border-radius: 10px;
          }
          .details-header {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
          .close-details {
            position: absolute;
            top: 12px;
            right: 12px;
          }
          .details-header h3 {
            font-size: 18px;
          }
          .details-text,
          .more-text {
            font-size: 14px;
          }
          .achievements {
            padding: 60px 5%;
          }
          .achievements-text h2 {
            font-size: 28px;
          }
          .stat h3 {
            font-size: 36px;
          }
          .stat p {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default APropos;