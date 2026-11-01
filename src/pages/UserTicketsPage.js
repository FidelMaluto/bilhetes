import React, { useState } from "react";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Printer,
  ExternalLink,
  X
} from "lucide-react";
import { useOrders } from "../context/OrdersContext";
import { formatKz, formatDatePt } from "../data/sportsData";

const UserTicketsPage = () => {
  const { orders } = useOrders();
  const [selectedTicketOrder, setSelectedTicketOrder] = useState(null);

  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="badge badge-gold" style={{ marginBottom: "0.5rem" }}>
            ÁREA DO ADEPTO
          </span>
          <h1 className="title-section" style={{ marginBottom: "0.5rem" }}>
            Os Meus Bilhetes Digitais
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Consulta os teus bilhetes adquiridos, códigos QR de acesso aos estádios e histórico de compras.
          </p>
        </div>

        {/* Orders / Tickets List */}
        {orders.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {orders.map((order) => (
              <div
                key={order.id}
                className="card"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                }}
              >
                {/* Order Top Bar */}
                <div
                  style={{
                    backgroundColor: "var(--bg-surface-elevated)",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid var(--border-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        backgroundColor: "var(--primary-red)",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ticket size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>
                        Referência: {order.orderNumber}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                        Comprado em: {new Date(order.createdAt).toLocaleDateString("pt-AO")} • {order.paymentMethod}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span className="badge badge-green">
                      {order.paymentStatus || "Confirmado"}
                    </span>
                    <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--primary-red)" }}>
                      {formatKz(order.total)}
                    </span>
                  </div>
                </div>

                {/* Items in this Order */}
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "1.25rem",
                        padding: "1rem",
                        backgroundColor: "var(--bg-muted)",
                        borderRadius: "var(--radius-lg)",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: "240px" }}>
                        <span className="badge badge-red" style={{ fontSize: "0.7rem", marginBottom: "0.3rem" }}>
                          {item.categoryName} ({item.quantity} {item.quantity === 1 ? "lugar" : "lugares"})
                        </span>
                        <h3 style={{ fontSize: "1.15rem", fontWeight: 800 }}>
                          {item.matchTitle}
                        </h3>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <Calendar size={14} color="var(--primary-red)" />
                            {formatDatePt(item.matchDate)}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <Clock size={14} color="var(--accent-gold)" />
                            {item.matchTime}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <MapPin size={14} color="var(--confirm-green)" />
                            {item.stadiumName}
                          </span>
                        </div>
                      </div>

                      {/* View Ticket QR Button */}
                      <button
                        onClick={() => setSelectedTicketOrder(order)}
                        className="btn btn-primary btn-sm"
                      >
                        <Ticket size={16} />
                        <span>Ver Código QR de Entrada</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="card"
            style={{
              padding: "4rem 2rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.25rem",
            }}
          >
            <Ticket size={48} color="var(--text-muted)" style={{ opacity: 0.5 }} />
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700 }}>
              Ainda não tens nenhum bilhete digital emitido
            </h3>
            <p style={{ color: "var(--text-secondary)", maxWidth: "480px", fontSize: "0.92rem" }}>
              Quando realizares a simulação de compra para um jogo do Girabola, Unitel Basket ou outra modalidade, os teus bilhetes com QR Code aparecerão automaticamente aqui.
            </p>
            <Link to="/jogos" className="btn btn-primary">
              <span>Explorar Jogos e Comprar Bilhete</span>
            </Link>
          </div>
        )}

        {/* QR Code Modal Overlay */}
        {selectedTicketOrder && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.75)",
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              backdropFilter: "blur(6px)",
            }}
            onClick={() => setSelectedTicketOrder(null)}
          >
            <div
              className="card animate-fade-in"
              style={{
                width: "100%",
                maxWidth: "460px",
                backgroundColor: "var(--bg-surface)",
                padding: "2rem",
                borderRadius: "var(--radius-xl)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedTicketOrder(null)}
                className="btn-icon"
                style={{ position: "absolute", top: "16px", right: "16px", color: "var(--text-secondary)" }}
                aria-label="Fechar"
              >
                <X size={20} />
              </button>

              <span className="badge badge-gold" style={{ marginBottom: "0.75rem" }}>
                TORNIQUETE DE ACESSO
              </span>

              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.25rem" }}>
                {selectedTicketOrder.items[0]?.matchTitle}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                Apresente este código nos leitores digitais à entrada do estádio
              </p>

              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  marginBottom: "1.25rem",
                }}
              >
                <QRCodeSVG
                  value={selectedTicketOrder.qrCodeValue || `AST-${selectedTicketOrder.id}`}
                  size={190}
                  level="H"
                />
              </div>

              <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: "1.1rem", marginBottom: "1rem" }}>
                {selectedTicketOrder.orderNumber}
              </div>

              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                Titular: <strong>{selectedTicketOrder.customer?.fullName}</strong>
                <br />
                Sector: {selectedTicketOrder.items[0]?.sector}
              </div>

              <div style={{ display: "flex", gap: "0.75rem", width: "100%" }}>
                <Link
                  to={`/confirmacao/${selectedTicketOrder.id}`}
                  className="btn btn-secondary"
                  style={{ flex: 1, fontSize: "0.85rem" }}
                  onClick={() => setSelectedTicketOrder(null)}
                >
                  <ExternalLink size={15} />
                  <span>Ver Bilhete Completo</span>
                </Link>
                <button
                  onClick={() => window.print()}
                  className="btn btn-primary"
                  style={{ flex: 1, fontSize: "0.85rem" }}
                >
                  <Printer size={15} />
                  <span>Imprimir</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserTicketsPage;
