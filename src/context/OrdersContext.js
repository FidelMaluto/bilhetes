import React, { createContext, useContext, useState, useEffect } from "react";

const OrdersContext = createContext();

const INITIAL_DEMO_ORDER = {
  id: "AST-2026-9812",
  orderNumber: "AST-2026-9812",
  createdAt: "2026-11-01T14:30:00.000Z",
  customer: {
    fullName: "Manuel António Bernardo",
    email: "manuel.bernardo@exemplo.ao",
    phone: "+244 923 456 789",
    province: "Luanda",
    nif: "005928172LA041",
  },
  items: [
    {
      matchId: "match-01",
      matchTitle: "Petro de Luanda vs 1.º de Agosto",
      matchDate: "2026-11-15",
      matchTime: "16:30",
      stadiumName: "Estádio Nacional 11 de Novembro",
      categoryId: "central",
      categoryName: "Bancada Central",
      unitPrice: 5000,
      quantity: 2,
      sector: "Bancada Central Nascente/Poente - Porta 4, Fila 12, Lugares 45-46",
    },
  ],
  subtotal: 10000,
  serviceFee: 500,
  total: 10500,
  paymentMethod: "Multicaixa Express",
  paymentStatus: "Confirmado (Simulação)",
  qrCodeValue: "AST-VALID-2026-9812-PETRO-DAGOSTO-SEC-CENTRAL-QTY2",
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("ast_orders");
      return saved ? JSON.parse(saved) : [INITIAL_DEMO_ORDER];
    } catch (e) {
      return [INITIAL_DEMO_ORDER];
    }
  });

  useEffect(() => {
    localStorage.setItem("ast_orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const getOrderById = (orderId) => {
    return orders.find(
      (o) => o.id === orderId || o.orderNumber === orderId
    );
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, getOrderById }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
