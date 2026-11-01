import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("ast_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ast_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (ticketItem) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) => i.matchId === ticketItem.matchId && i.categoryId === ticketItem.categoryId
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + ticketItem.quantity,
        };
        return updated;
      }
      return [...prevItems, ticketItem];
    });
  };

  const updateQuantity = (matchId, categoryId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(matchId, categoryId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.matchId === matchId && item.categoryId === categoryId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = (matchId, categoryId) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.matchId === matchId && item.categoryId === categoryId)
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  // Taxa de emissão digital simbólica (0 Kz ou custo fixo simulado de processamento)
  const serviceFee = items.length > 0 ? 500 : 0;
  const total = subtotal + serviceFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
        serviceFee,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
