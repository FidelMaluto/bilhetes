import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Heart, ChevronRight, Flame, Ticket } from "lucide-react";
import { formatKz, formatDatePt, getCompetitionById, getStadiumById } from "../../data/sportsData";
import { useFavorites } from "../../context/FavoritesContext";
import { useToast } from "../../context/ToastContext";

const MatchCard = ({ match }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const favorite = isFavorite(match.id);

  const competition = getCompetitionById(match.competitionId);
  const stadium = getStadiumById(match.stadiumId);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(match.id);
    if (!favorite) {
      showToast(`Adicionado aos favoritos: ${match.title}`, "info");
    } else {
      showToast(`Removido dos favoritos: ${match.title}`, "info");
    }
  };

  return (
    <div
      className="card animate-fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "100%",
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Top Banner with Competition & Badges */}
      <div
        style={{
          padding: "0.75rem 1.1rem",
          backgroundColor: "var(--bg-surface-elevated)",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
          <span className="badge badge-gold" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
            {competition ? competition.name : "Competição"}
          </span>
          {match.isDerby && (
            <span className="badge badge-red" style={{ fontSize: "0.7rem" }}>
              <Flame size={11} />
              <span>Clássico</span>
            </span>
          )}
          <span className="badge badge-neutral" style={{ fontSize: "0.68rem" }}>
            {match.round}
          </span>
        </div>

        <button
          onClick={handleFavoriteClick}
          style={{
            padding: "4px",
            color: favorite ? "var(--primary-red)" : "var(--text-secondary)",
            transition: "color 0.15s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title={favorite ? "Remover dos favoritos" : "Guardar como favorito"}
          aria-label="Favorito"
        >
          <Heart size={18} fill={favorite ? "var(--primary-red)" : "transparent"} />
        </button>
      </div>

      {/* Main Face-Off Area */}
      <div style={{ padding: "1.25rem 1.15rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        
        {/* Teams Visual Faceoff */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
          
          {/* Home Team */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center", gap: "0.45rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                backgroundColor: match.homeTeam.badgeColor || "var(--primary-red)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "0.95rem",
                border: "1px solid var(--border-color)",
              }}
            >
              {match.homeTeam.badgeText || match.homeTeam.shortName.substring(0, 3).toUpperCase()}
            </div>
            <strong style={{ fontSize: "0.92rem", lineHeight: 1.25, color: "var(--text-primary)" }}>
              {match.homeTeam.shortName}
            </strong>
            <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
              {match.homeTeam.city}
            </span>
          </div>

          {/* VS Divider - Sóbrio e Discreto */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0.5rem" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                color: "var(--text-secondary)",
                backgroundColor: "var(--bg-muted)",
                padding: "0.2rem 0.55rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-color)",
                letterSpacing: "0.05em",
              }}
            >
              VS
            </span>
          </div>

          {/* Away Team */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center", gap: "0.45rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                backgroundColor: match.awayTeam.badgeColor || "var(--inst-black)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "0.95rem",
                border: "1px solid var(--border-color)",
              }}
            >
              {match.awayTeam.badgeText || match.awayTeam.shortName.substring(0, 3).toUpperCase()}
            </div>
            <strong style={{ fontSize: "0.92rem", lineHeight: 1.25, color: "var(--text-primary)" }}>
              {match.awayTeam.shortName}
            </strong>
            <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
              {match.awayTeam.city}
            </span>
          </div>
        </div>

        {/* Match Time & Location Strip */}
        <div
          style={{
            backgroundColor: "var(--bg-surface-elevated)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-color)",
            padding: "0.65rem 0.85rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            fontSize: "0.8rem",
            marginBottom: "1.1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "var(--text-secondary)" }}>
            <Calendar size={14} color="var(--primary-red)" />
            <strong style={{ color: "var(--text-primary)" }}>{formatDatePt(match.date)}</strong>
            <span style={{ color: "var(--text-muted)" }}>•</span>
            <Clock size={13} color="var(--accent-gold)" />
            <span>{match.time}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "var(--text-secondary)" }}>
            <MapPin size={14} color="var(--text-muted)" />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {stadium ? stadium.name : match.province}
            </span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0.75rem",
            borderTop: "1px solid var(--border-color)",
          }}
        >
          <div>
            <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", display: "block", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              A partir de
            </span>
            <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--primary-red)" }}>
              {formatKz(match.startingPrice)}
            </span>
          </div>

          <Link
            to={`/jogos/${match.id}`}
            className="btn btn-primary btn-sm"
            style={{ padding: "0.5rem 1rem" }}
          >
            <Ticket size={14} />
            <span>Ver Bilhetes</span>
            <ChevronRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default MatchCard;
