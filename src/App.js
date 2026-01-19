import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Produits from "./pages/Produits";
import ClementineVarieties from "./pages/ClementineVarieties";
import OrangeVarieties from "./pages/OrangeVarieties";
import Mandarine from "./pages/Mandarine";
import APropos from "./pages/APropos";
import Services from "./pages/Services";
import Clementine from "./pages/Clementine";
import PageTransition from "./pages/PageTransition";
import Citron from "./pages/Citron";
import Orange from "./pages/Orange";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forget_password";
import VerifyOTP from "./pages/verify_otp";
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { CartProvider } from "./context/CartContext.jsx";
import ProfileMenu from "./components/ProfileMenu.jsx";
import CartButton from "./components/CartButton.jsx";
import PaymentPage from "./pages/PaymentPage";

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppContent({ isAuthenticated, onLogin }) {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeBrand, setActiveBrand] = useState(null);

  const brands = [
    { src: "/brand1.png", name: "IRIS MAROC" },
    { src: "/brand2.png", name: "ATLANTIC" },
    { src: "/brand3.png", name: "CLEMENTINE" },
    { src: "/brand4.png", name: "ZAGORA" },
    { src: "/brand5.png", name: "GUERDANE" },
    { src: "/brand6.png", name: "ALIAS" },
    { src: "/brand7.png", name: "ANGIE" },
  ];

  const itemWidth = 280;
  const maxIndex = brands.length - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [maxIndex, isAuthenticated]);

  const handleBrandClick = (index) => {
    setActiveBrand(index);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/register" element={<Register onRegister={onLogin} />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PageTransition>
                  <div className="hero-content">
                    <h2>SOCIÉTÉ D'EXPORTATION AGRICOLE EL KABBAGE</h2>
                    <p>
                      Découvrez la fraîcheur naturelle dans un design moderne et lumineux.
                      Profitez d’une expérience unique avec nos produits
                    </p>
                    <a href="#contact" className="btn-primary">
                      CLIQUEZ ICI
                    </a>
                  </div>
                  <section className="produits">
                    <h2>Nos Produits</h2>
                    <div className="cards">
                      <div className="card">
                        <img src="produit1.jpeg" alt="Produit 1" />
                        <h3>Clémentine</h3>
                      </div>
                      <div className="card">
                        <img src="produit2.jpeg" alt="Produit 2" />
                        <h3>Citron Lime</h3>
                      </div>
                      <div className="card">
                        <img src="produit3.jpeg" alt="Produit 3" />
                        <h3>Mandarine</h3>
                      </div>
                      <div className="card">
                        <img src="produit4.jpeg" alt="Produit 4" />
                        <h3>Orange</h3>
                      </div>
                    </div>
                  </section>
                  <section className="brands-gallery">
                    <h2>Nos Marques</h2>
                    <div className="carousel">
                      <button className="carousel-arrow left" onClick={prevSlide}>
                        <ChevronLeft size={28} />
                      </button>
                      <div
                        className="carousel-track"
                        style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
                      >
                        {brands.map((brand, index) => (
                          <div
                            className={`brand-item ${activeBrand === index ? "active" : ""}`}
                            key={index}
                            onClick={() => handleBrandClick(index)}
                          >
                            <img src={brand.src} alt={brand.name} />
                            <p>{brand.name}</p>
                          </div>
                        ))}
                      </div>
                      <button className="carousel-arrow right" onClick={nextSlide}>
                        <ChevronRight size={28} />
                      </button>
                    </div>
                  </section>
                  <section className="production-calendar-section">
                    <div className="calendar-container">
                      <h2>Calendrier Annuel De Production</h2>
                      <table className="production-calendar">
                        <thead>
                          <tr>
                            <th>Mois</th>
                            <th>Clémentine</th>
                            <th>Orange</th>
                            <th>Mandarine</th>
                            <th>Citron</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
                          ].map((month, index) => (
                            <tr key={index}>
                              <td>{month}</td>
                              <td>{[false, false, false, true, true, true, true, true, true, true, true, false][index] ? '🍑' : ''}</td>
                              <td>{[false, false, false, false, false, false, true, true, true, true, true, true][index] ? '🍑' : ''}</td>
                              <td>{[false, false, false, false, false, false, true, true, true, true, true, true][index] ? '🍑' : ''}</td>
                              <td>{[false, false, false, false, false, true, true, true, true, true, true, true][index] ? '🍑' : ''}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <style jsx>{`
                        .calendar-container {
                          width: 100%;
                          max-width: 1000px;
                          margin: 40px auto;
                          padding: 25px;
                          background: rgba(0, 0, 0, 0.43);
                          border-radius: 18px;
                          backdrop-filter: blur(12px);
                          border: 1px solid rgba(255, 255, 255, 0.15);
                          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
                          color: #fff;
                          text-align: center;
                        }

                        .calendar-container h2 {
                          font-size: 2rem;
                          margin-bottom: 20px;
                          color: #fffefeff;
                          text-transform: uppercase;
                          letter-spacing: 1.2px;
                        }

                        .production-calendar {
                          width: 100%;
                          min-width: 700px;
                          border-collapse: separate;
                          border-spacing: 0;
                          font-size: 15px;
                          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        }

                        .production-calendar th,
                        .production-calendar td {
                          padding: 15px 20px;
                          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                        }

                        .production-calendar th {
                          background: rgba(145, 255, 90, 0.2);
                          font-weight: 600;
                          text-transform: uppercase;
                          letter-spacing: 0.6px;
                          position: sticky;
                          top: 0;
                          z-index: 1;
                        }

                        .production-calendar tr:last-child td {
                          border-bottom: none;
                        }

                        .production-calendar tr:hover {
                          background: rgba(255, 255, 255, 0.1);
                          transition: background 0.3s ease;
                        }

                        .production-calendar td {
                          font-size: 1.2rem;
                        }

                        .production-calendar td:where(:nth-child(2), :nth-child(3), :nth-child(4), :nth-child(5)) {
                          color: #22c55e;
                        }

                        @media (max-width: 1200px) {
                          .calendar-container {
                            max-width: 900px;
                            padding: 20px;
                          }
                          .production-calendar {
                            min-width: 650px;
                          }
                          .production-calendar th,
                          .production-calendar td {
                            padding: 12px 18px;
                          }
                        }

                        @media (max-width: 768px) {
                          .calendar-container {
                            margin: 25px auto;
                            padding: 15px;
                          }
                          .calendar-container h2 {
                            font-size: 1.6rem;
                          }
                          .production-calendar {
                            min-width: 550px;
                            font-size: 13px;
                          }
                          .production-calendar th,
                          .production-calendar td {
                            padding: 10px 12px;
                          }
                          .production-calendar td {
                            font-size: 1rem;
                          }
                        }
                      `}</style>
                    </div>
                  </section>
                  <section className="contact" id="contact">
                    <h2>Contactez-nous</h2>
                    <div className="contact-container">
                      <div className="contact-form">
                        <form>
                          <div className="form-group">
                            <input type="text" placeholder="Votre Nom" name="name" required />
                          </div>
                          <div className="form-group">
                            <input type="email" placeholder="Votre Email" name="email" required />
                          </div>
                          <div className="form-group">
                            <textarea placeholder="Votre Message" name="message" rows="5" required></textarea>
                          </div>
                          <button type="submit" className="submit-btn">Envoyer</button>
                        </form>
                      </div>
                      <div className="contact-info">
                        <h3>Restez Connecté</h3>
                        <div className="info-grid">
                          <div className="info-card">
                            <MapPin size={22} color="#ffaa33" />
                            <p><strong>Adresse :</strong> 123 Rue des Agrumes, Casablanca, Maroc</p>
                          </div>
                          <div className="info-card">
                            <Phone size={22} color="#ffaa33" />
                            <p><strong>Téléphone :</strong> +212 6 12 34 56 78</p>
                          </div>
                          <div className="info-card">
                            <Mail size={22} color="#ffaa33" />
                            <p><strong>Email :</strong> contact@elkabbage.ma</p>
                          </div>
                        </div>
                        <div className="social-links">
                          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Facebook size={28} color="#ffaa33" />
                          </a>
                          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Instagram size={28} color="#ffaa33" />
                          </a>
                          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Twitter size={28} color="#ffaa33" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <style jsx>{`
                      .contact {
                        padding: 10px 50px;
                        background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(15, 15, 45, 0.1));
                        border-radius: 20px;
                        backdrop-filter: blur(18px);
                        margin: 60px auto;
                        max-width: 1500px;
                        max-height: 90vh; /* limite la hauteur à 90% de la fenêtre */
                        overflow-y: auto; /* active le scroll vertical si contenu dépasse */
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
                        text-align: center;
                        border: 1px solid rgba(255, 170, 51, 0.2);
                      }


                      .contact h2 {
                        font-size: 2.8rem;
                        color: #ffaa33;
                        margin-bottom: 50px;
                        text-transform: uppercase;
                        letter-spacing: 2.5px;
                        animation: fadeIn 1s ease-in-out;
                      }

                      @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-30px); }
                        to { opacity: 1; transform: translateY(0); }
                      }

                      .contact-container {
                        display: flex;
                        justify-content: space-between;
                        text-shadow: 0 0 15px rgba(255, 170, 51, 0.6);
                        gap: 50px;
                        align-items: stretch;
                      }

                      .contact-form, .contact-info {
                        flex: 1;
                        padding: 35px;
                        background: rgba(255, 255, 255, 0.12);
                        border-radius: 18px;
                        backdrop-filter: blur(12px);
                        border: 1px solid rgba(255, 255, 255, 0.25);
                        transition: transform 0.4s ease, box-shadow 0.4s ease;
                      }

                      .contact-form:hover, .contact-info:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 15px 40px rgba(255, 170, 51, 0.4);
                      }

                      .contact-form form {
                        display: flex;
                        flex-direction: column;
                        gap: 30px;
                      }

                      .form-group {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                      }

                      .contact-form input,
                      .contact-form textarea {
                        padding: 18px 25px;
                        border: none;
                        border-radius: 12px;
                        background: rgba(255, 255, 255, 0.18);
                        color: #fff;
                        font-size: 1.2rem;
                        outline: none;
                        transition: all 0.4s ease;
                        border: 1px solid rgba(255, 255, 255, 0.15);
                      }

                      .contact-form input:focus,
                      .contact-form textarea:focus {
                        background: rgba(255, 255, 255, 0.3);
                        box-shadow: 0 0 20px rgba(255, 170, 51, 0.5);
                        border-color: rgba(255, 170, 51, 0.6);
                      }

                      .contact-form textarea {
                        resize: vertical;
                        min-height: 180px;
                      }

                      .submit-btn {
                        padding: 18px 40px;
                        background: linear-gradient(45deg, #ffaa33, #ff8800);
                        color: #fff;
                        border: none;
                        border-radius: 12px;
                        font-size: 1.3rem;
                        cursor: pointer;
                        transition: all 0.4s ease;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                        box-shadow: 0 5px 15px rgba(255, 170, 51, 0.3);
                      }

                      .submit-btn:hover {
                        background: linear-gradient(45deg, #ff8800, #ff6600);
                        transform: scale(1.1);
                        box-shadow: 0 8px 20px rgba(255, 170, 51, 0.5);
                      }

                      .contact-info h3 {
                        font-size: 2rem;
                        text-shadow: 0 0 15px rgba(255, 170, 51, 0.6);
                        color: #ffaa33;
                        margin-bottom: 25px;
                        text-shadow: 0 0 8px rgba(255, 170, 51, 0.4);
                        animation: fadeIn 1s ease-in-out;
                      }

                      .info-grid {
                        display: grid;
                        gap: 20px;
                        margin-bottom: 30px;
                      }

                      .info-card {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        padding: 15px 20px;
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 10px;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                      }

                      .info-card:hover {
                        transform: translateX(10px);
                        box-shadow: 0 5px 15px rgba(255, 170, 51, 0.2);
                      }

                      .info-card p {
                        font-size: 1.2rem;
                        margin: 0;
                        color: #e6e6e6;
                        line-height: 1.7;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                      }

                      .social-links {
                        display: flex;
                        gap: 25px;
                        justify-content: center;
                        padding-top: 15px;
                        border-top: 1px solid rgba(255, 170, 51, 0.2);
                      }

                      .social-icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 50px;
                        height: 50px;
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 50%;
                        transition: all 0.4s ease;
                      }

                      .social-icon:hover {
                        background: rgba(255, 170, 51, 0.2);
                        transform: scale(1.3) rotate(10deg);
                        box-shadow: 0 0 20px rgba(255, 170, 51, 0.3);
                      }

                      @media (max-width: 768px) {
                        .contact {
                          padding: 40px 20px;
                          margin: 30px auto;
                        }
                        .contact h2 {
                          font-size: 1.8rem;
                          margin-bottom: 30px;
                        }
                        .contact-container {
                          flex-direction: column;
                          gap: 30px;
                        }
                        .contact-form, .contact-info {
                          padding: 20px;
                        }
                        .contact-form input,
                        .contact-form textarea {
                          padding: 12px 15px;
                          font-size: 1rem;
                        }
                        .submit-btn {
                          padding: 12px 25px;
                          font-size: 1.1rem;
                        }
                        .contact-info h3 {
                          font-size: 1.5rem;
                        }
                        .info-card {
                          padding: 10px 15px;
                        }
                        .info-card p {
                          font-size: 1rem;
                        }
                        .social-links {
                          gap: 15px;
                        }
                        .social-icon {
                          width: 40px;
                          height: 40px;
                        }
                      }
                    `}</style>
                  </section>
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route path="/clementine-varieties" element={<ProtectedRoute isAuthenticated={isAuthenticated}><PageTransition><ClementineVarieties /></PageTransition></ProtectedRoute>} />
          <Route path="/orange-varieties" element={<ProtectedRoute isAuthenticated={isAuthenticated}><PageTransition><OrangeVarieties /></PageTransition></ProtectedRoute>} />
          <Route path="/produits" element={<ProtectedRoute isAuthenticated={isAuthenticated}><PageTransition><Produits /></PageTransition></ProtectedRoute>} />
          <Route path="/a-propos" element={<ProtectedRoute isAuthenticated={isAuthenticated}><PageTransition><APropos /></PageTransition></ProtectedRoute>} />
          <Route path="/services" element={<ProtectedRoute isAuthenticated={isAuthenticated}><PageTransition><Services /></PageTransition></ProtectedRoute>} />
          <Route path="/Clementine" element={<ProtectedRoute isAuthenticated={isAuthenticated}><PageTransition><Clementine /></PageTransition></ProtectedRoute>} />
          <Route path="/Mandarine" element={<ProtectedRoute isAuthenticated={isAuthenticated}><PageTransition><Mandarine /></PageTransition></ProtectedRoute>} />
          <Route path="/Citron" element={<ProtectedRoute isAuthenticated={isAuthenticated}><PageTransition><Citron /></PageTransition></ProtectedRoute>} />
          <Route path="/Orange" element={<ProtectedRoute isAuthenticated={isAuthenticated}><PageTransition><Orange /></PageTransition></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute isAuthenticated={isAuthenticated}><PageTransition><PaymentPage /></PageTransition></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <CartProvider>
        <div className="App">
          {isAuthenticated && (
            <div className="navbar">
              <h1>🍊Lemon</h1>
              <ul>
                <li><Link to="/" className="nav-button">Accueil</Link></li>
                <li><Link to="/a-propos" className="nav-button">À propos</Link></li>
                <li><Link to="/produits" className="nav-button">Produits</Link></li>
                <li><Link to="/services" className="nav-button">Services</Link></li>
                <li><a href="#contact" className="nav-button">Contact</a></li>
                <li>
                  <CartButton />
                </li>
                <li>
                  <ProfileMenu
                    user={JSON.parse(localStorage.getItem("currentUser") || "{}")}
                    onLogout={handleLogout}
                    onChangeAccount={() => {
                      localStorage.removeItem("currentUser");
                      setIsAuthenticated(false);
                    }}
                  />
                </li>
              </ul>
            </div>
          )}
          <AppContent isAuthenticated={isAuthenticated} onLogin={handleAuth} />
          {isAuthenticated && (
            <footer>
              <p>&copy; 2025 Lemon Export. Tous droits réservés.</p>
            </footer>
          )}
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;