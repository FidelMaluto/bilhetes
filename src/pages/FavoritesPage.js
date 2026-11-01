import React from "react";
import { Link } from "react-router-dom";
import { Heart, Ticket } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { MATCHES } from "../data/sportsData";
import MatchCard from "../components/matches/MatchCard";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const favoriteMatches = MATCHES.filter((m) => favorites.includes(m.id));

  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="badge badge-red" style={{ marginBottom: "0.5rem" }}>
            JOGOS GUARDADOS
          </span>
          <h1 className="title-section" style={{ marginBottom: "0.5rem" }}>
            Os Teus Jogos Favoritos ({favoriteMatches.length})
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Acompanha os duelos que adicionaste aos favoritos para garantir bilhetes assim que decidires ir ao estádio.
          </p>
        </div>

        {/* Matches Grid */}
        {favoriteMatches.length > 0 ? (
          <div className="grid-matches">
            {favoriteMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
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
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
              }}
            >
              <Heart size={32} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700 }}>
              Ainda não tens nenhum jogo nos favoritos
            </h3>
            <p style={{ color: "var(--text-secondary)", maxWidth: "460px", fontSize: "0.92rem" }}>
              Clica no ícone de coração nos cartões dos jogos para os guardares aqui e acederes facilmente aos bilhetes.
            </p>
            <Link to="/jogos" className="btn btn-primary">
              <Ticket size={18} />
              <span>Explorar Próximos Jogos</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default FavoritesPage;
