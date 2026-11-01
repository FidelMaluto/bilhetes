import React from "react";
import { STADIUMS } from "../data/sportsData";
import StadiumCard from "../components/stadiums/StadiumCard";

const StadiumsPage = () => {
  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <span className="badge badge-gold" style={{ marginBottom: "0.5rem" }}>
            INFRAESTRUTURAS DESPORTIVAS
          </span>
          <h1 className="title-section" style={{ marginBottom: "0.6rem" }}>
            Estádios e Pavilhões de Angola
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "720px" }}>
            Conhece os templos do desporto nacional. Dos 48.500 lugares do mítico Estádio 11 de Novembro às catedrais do basquetebol e andebol na Cidadela e no Kilamba.
          </p>
        </div>

        {/* Stadiums Grid */}
        <div className="grid-stadiums">
          {STADIUMS.map((stadium) => (
            <StadiumCard key={stadium.id} stadium={stadium} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default StadiumsPage;
