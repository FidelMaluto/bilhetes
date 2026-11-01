import React from "react";
import { Link } from "react-router-dom";
import { Compass, Ticket } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div style={{ padding: "6rem 1.25rem", textAlign: "center" }}>
      <div className="container" style={{ maxWidth: "540px" }}>
        <div
          style={{
            fontSize: "5rem",
            fontWeight: 900,
            color: "var(--primary-red)",
            lineHeight: 1,
            marginBottom: "1rem",
            fontFamily: "monospace",
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>
          Página Não Encontrada
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.5, marginBottom: "2rem" }}>
          A página ou evento que procura não existe ou mudou de endereço no portal Angola Sports Tickets.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" className="btn btn-secondary">
            <Compass size={18} />
            <span>Página Inicial</span>
          </Link>
          <Link to="/jogos" className="btn btn-primary">
            <Ticket size={18} />
            <span>Ver Jogos Disponíveis</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
