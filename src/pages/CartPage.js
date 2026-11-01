import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Calendar,
  MapPin,
  Clock,
  Ticket
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatKz, formatDatePt } from "../data/sportsData";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, serviceFee, total, itemCount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: "5rem 1.25rem", textAlign: "center" }}>
        <div
          style={{
            maxWidth: "460px",
            margin: "0 auto",
            backgroundColor: "var(--bg-surface)",
            padding: "3rem 2rem",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "var(--bg-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              color: "var(--text-muted)",
            }}
          >
            <ShoppingCart size={36} />
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>
            O teu carrinho está vazio
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.5, marginBottom: "2rem" }}>
            Ainda não adicionaste nenhum bilhete. Consulta o calendário de jogos e escolhe o teu lugar nas bancadas.
          </p>
          <Link to="/jogos" className="btn btn-primary" style={{ width: "100%" }}>
            <Ticket size={18} />
            <span>Explorar Jogos Disponíveis</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: "0.4rem" }}>
              CARRINHO DE COMPRAS
            </span>
            <h1 className="title-section">
              Resumo dos Teus Bilhetes ({itemCount})
            </h1>
          </div>

          <button
            onClick={clearCart}
            className="btn btn-secondary btn-sm"
            style={{ color: "var(--primary-red)" }}
          >
            <Trash2 size={16} />
            <span>Esvaziar Carrinho</span>
          </button>
        </div>

        {/* Content Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
          
          {/* Left: Cart Items List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {items.map((item) => (
              <div
                key={`${item.matchId}-${item.categoryId}`}
                className="card"
                style={{
                  padding: "1.25rem",
                  backgroundColor: "var(--bg-surface)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                  <div>
                    <span className="badge badge-red" style={{ fontSize: "0.72rem", marginBottom: "0.4rem" }}>
                      {item.categoryName}
                    </span>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 800 }}>
                      <Link to={`/jogos/${item.matchId}`} style={{ color: "var(--text-primary)" }}>
                        {item.matchTitle}
                      </Link>
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.4rem" }}>
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

                  <button
                    onClick={() => removeFromCart(item.matchId, item.categoryId)}
                    className="btn-icon"
                    style={{ color: "var(--text-muted)", flexShrink: 0 }}
                    title="Remover este bilhete"
                    aria-label="Remover bilhete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Sector detail */}
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", backgroundColor: "var(--bg-muted)", padding: "0.45rem 0.75rem", borderRadius: "var(--radius-sm)" }}>
                  Sector: <strong>{item.sector}</strong>
                </div>

                {/* Bottom Row: Quantity Stepper & Price */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid var(--border-color)",
                  }}
                >
                  {/* Quantity Stepper */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      Qtd:
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "var(--bg-muted)",
                        borderRadius: "var(--radius-md)",
                        padding: "0.2rem",
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.matchId, item.categoryId, item.quantity - 1)}
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "4px",
                          backgroundColor: "var(--bg-surface)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-primary)",
                        }}
                        aria-label="Diminuir"
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ width: "32px", textAlign: "center", fontWeight: 700, fontSize: "0.9rem" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.matchId, item.categoryId, item.quantity + 1)}
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "4px",
                          backgroundColor: "var(--primary-red)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#FFFFFF",
                        }}
                        aria-label="Aumentar"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block" }}>
                      {item.quantity} x {formatKz(item.unitPrice)}
                    </span>
                    <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--primary-red)" }}>
                      {formatKz(item.quantity * item.unitPrice)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/jogos"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 600, marginTop: "0.5rem" }}
            >
              <ArrowLeft size={16} />
              <span>Adicionar mais jogos ou modalidades</span>
            </Link>
          </div>

          {/* Right: Checkout Order Summary Box */}
          <div style={{ position: "sticky", top: "90px" }}>
            <div
              className="card"
              style={{
                padding: "1.75rem",
                backgroundColor: "var(--bg-surface)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                Total da Encomenda
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.92rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                  <span>Subtotal dos Bilhetes:</span>
                  <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{formatKz(subtotal)}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                  <span>Taxa de Emissão Digital (Simulação):</span>
                  <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{formatKz(serviceFee)}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "0.85rem",
                    borderTop: "1px solid var(--border-color)",
                    fontSize: "1.3rem",
                    fontWeight: 900,
                  }}
                >
                  <span>Total a Pagar:</span>
                  <span style={{ color: "var(--primary-red)" }}>{formatKz(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate("/checkout")}
                className="btn btn-primary btn-lg"
                style={{ width: "100%", marginTop: "0.5rem" }}
              >
                <span>Avançar para Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--confirm-green)" }}>
                <ShieldCheck size={16} />
                <span>Simulação de Pagamento Multicaixa 100% Segura</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CartPage;
