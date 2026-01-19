import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { ShoppingCart } from 'lucide-react';
import CartModal from './CartModal.jsx';

const CartButton = () => {
  const { getItemCount } = useCart(); // Changed `count` to `getItemCount` to match CartContext
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="cart-button"
        onClick={() => setIsModalOpen(true)}
      >
        <ShoppingCart size={20} />
        <span className="cart-count">{getItemCount}</span>
      </button>
      <CartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <style jsx>{`
        .cart-button {
          position: relative;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
        }
        .cart-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }
        .cart-count {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #f97316;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          border: 2px solid white;
          min-width: 20px;
        }
        .cart-count:empty {
          display: none;
        }
      `}</style>
    </>
  );
};

export default CartButton;