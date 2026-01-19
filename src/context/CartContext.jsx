import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "myshop_cart_v1";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Failed to parse cart from storage", e);
      return [];
    }
  });

  // UI state for sidebar
  const [isOpen, setIsOpen] = useState(false);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [items]);

  // addItem: expects an object with at least { id?, sku?, name, unitPrice, quantity? }
  // If caller didn't provide id, we generate a unique id so item won't overwrite others.
  const addItem = (newItem) => {
    setItems((prev) => {
      const item = { ...newItem };
      if (!item.id) {
        // fallback unique id
        item.id = `${(item.sku || item.name).toString().replace(/\s+/g, "_")}-${Date.now()}-${Math.floor(Math.random()*1000)}`;
      }
      item.quantity = Math.max(1, item.quantity || 1);

      // try to find exact same id
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p));
      }

      // OPTIONAL: merge if same sku + same pack + same calibre (helpful if calling code passes different id)
      const mergeCandidateIndex = prev.findIndex(
        (p) =>
          p.sku &&
          item.sku &&
          p.sku === item.sku &&
          p.selectedPack === item.selectedPack &&
          p.selectedCalibre === item.selectedCalibre &&
          p.unitPrice === item.unitPrice
      );
      if (mergeCandidateIndex > -1) {
        const copy = [...prev];
        copy[mergeCandidateIndex] = {
          ...copy[mergeCandidateIndex],
          quantity: copy[mergeCandidateIndex].quantity + item.quantity,
        };
        return copy;
      }

      return [...prev, item];
    });
    openCart(); // optional: open cart UI on add
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQuantity = (id, newQty) =>
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, Math.floor(newQty || 0)) } : i))
        .filter((i) => i.quantity > 0)
    );

  const clearCart = () => setItems([]);

  const getItemCount = useMemo(() => items.reduce((a, b) => a + (b.quantity || 0), 0), [items]);

  const getSubtotal = useMemo(() => items.reduce((acc, it) => acc + (it.unitPrice || 0) * (it.quantity || 0), 0), [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((s) => !s);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        getSubtotal,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
