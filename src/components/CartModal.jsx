import React from "react";
import { useCart } from "../context/CartContext.jsx";
import { X, ShoppingBag, Trash2, Minus, Plus, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CartModal = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate

  if (!isOpen) return null;

  // Function to handle navigation to PaymentPage
  const handleCheckout = () => {
    onClose(); // Close the modal
    navigate("/payment"); // Navigate to PaymentPage
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-container" onClick={(e) => e.stopPropagation()}>
        <header className="cart-header">
          <h2><ShoppingBag size={24} /> Mon Panier</h2>
          <button className="close-btn" onClick={onClose}><X size={22} /></button>
        </header>

        <section className="cart-body">
          {items.length === 0 ? (
            <p className="empty-text">Ton panier est vide </p>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  {item.selectedPack && <p>Pack : {item.selectedPack}</p>}
                  {item.selectedCalibre && <p>Calibre : {item.selectedCalibre}</p>}
                  <p className="price">Prix : {item.unitPrice.toFixed(2)} €</p>

                  <div className="quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className="total">
                    Total: {(item.unitPrice * item.quantity).toFixed(2)} €
                  </p>

                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    <Trash2 size={16} /> Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {items.length > 0 && (
          <footer className="cart-footer">
            <div className="subtotal">
              <strong>Sous-total :</strong> {getSubtotal.toFixed(2)} €
            </div>
            <div className="footer-btns">
              <button className="clear-btn" onClick={clearCart}>
                <Trash2 size={16} /> Vider
              </button>
              <button className="checkout-btn" onClick={handleCheckout}>
                <CreditCard size={16} /> Commander
              </button>
            </div>
          </footer>
        )}

        <style>{`
          /* --- Overlay --- */
          .cart-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(-3px);
            display: flex; align-items: center; justify-content: center;
            z-index: 200;
            animation: fadeIn 0.3s ease-in-out;
          }

          /* --- Main Container --- */
          .cart-container {
            width: 90%;
            max-width: 620px;
            background: rgba(255, 255, 255, -4);
            backdrop-filter: blur(400px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.25);
            box-shadow: 0 8px 32px rgba(0,0,0,0.25);
            color: #fff;
            padding: 24px;
            overflow-y: auto;
            max-height: 80vh;
            animation: slideUp 0.35s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; } to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          /* --- Header --- */
          .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255,255,255,0.4);
            padding-bottom: 10px;
            margin-bottom: 15px;
            font-weight: 600;
            font-size: 1.3rem;
          }

          .close-btn {
            background: transparent;
            border: none;
            color: #fff;
            cursor: pointer;
            transition: transform 0.2s;
          }
          .close-btn:hover { transform: rotate(90deg); }

          /* --- Items --- */
          .cart-item {
            display: flex;
            gap: 14px;
            margin-bottom: 16px;
            border-bottom: 1px solid rgba(255,255,255,0.15);
            padding-bottom: 10px;
          }
          .cart-img {
            width: 90px; height: 90px;
            object-fit: cover;
            border-radius: 12px;
          }
          .cart-info h4 {
            font-size: 1.1rem;
            font-weight: 600;
          }
          .price { opacity: 0.9; }

          .quantity {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 6px;
          }
          .quantity button {
            background: rgba(255,255,255,0.15);
            border: none;
            color: #fff;
            width: 30px; height: 30px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
          }
          .quantity button:hover {
            background: rgba(255,255,255,0.3);
          }

          .remove-btn {
            margin-top: 10px;
            display: flex;
            align-items: center;
            gap: 5px;
            background: rgba(255, 75, 75, 0.2);
            border: 1px solid rgba(255, 129, 75, 0.3);
            color: #ffbaba;
            padding: 6px 10px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.25s;
          }
          .remove-btn:hover {
            background: rgba(255, 75, 75, 0.35);
            transform: scale(1.05);
          }

          /* --- Footer --- */
          .cart-footer {
            border-top: 1px solid rgba(255,255,255,0.2);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.30);
            padding-top: 10px;
            margin-top: 12px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .subtotal {
            font-size: 1.1rem;
            font-weight: bold;
          }

          .footer-btns {
            display: flex;
            justify-content: space-between;
          }

          .clear-btn, .checkout-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            border: none;
            padding: 10px 16px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.25s ease;
          }

          .clear-btn {
            background: linear-gradient(135deg, #ef4444, #ef5b0cff);
            color: white;
          }
          .clear-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(255, 77, 0, 0.8);
          }

          .checkout-btn {
            background: linear-gradient(135deg, #22c55e, #15803d);
            color: white;
          }
          .checkout-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(34,197,94,0.6);
          }

          .empty-text {
            text-align: center;
            padding: 40px 0;
            color: rgba(255,255,255,0.7);
            font-style: italic;
          }
        `}</style>
      </div>
    </div>
  );
};

export default CartModal;