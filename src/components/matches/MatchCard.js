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
        border: "1.5px solid var(--border-color)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Top Banner with Competition & Badges */}
      <div
        style={{
          padding: "0.85rem 1.15rem",
          backgroundColor: "var(--bg-surface-elevated)",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
          <span className="badge badge-gold" style={{ fontSize: "0.7rem", fontWeight: 800 }}>
            {competition ? competition.name : "Competição"}
          </span>
          {match.isDerby && (
            <span className="badge badge-red" style={{ fontSize: "0.7rem" }}>
              <Flame size={12} />
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
            transition: "transform 0.15s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title={favorite ? "Remover dos favoritos" : "Guardar como favorito"}
          aria-label="Favorito"
        >
          <Heart size={19} fill={favorite ? "var(--primary-red)" : "transparent"} />
        </button>
      </div>

      {/* Main Face-Off Area */}
      <div style={{ padding: "1.35rem 1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        
        {/* Teams Visual Faceoff */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          
          {/* Home Team */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                backgroundColor: match.homeTeam.badgeColor || "var(--primary-red)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "1rem",
                boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
                border: "2.5px solid var(--bg-surface)",
              }}
            >
              {match.homeTeam.badgeText || match.homeTeam.shortName.substring(0, 3).toUpperCase()}
            </div>
            <strong style={{ fontSize: "0.95rem", lineHeight: 1.2, color: "var(--text-primary)" }}>
              {match.homeTeam.shortName}
            </strong>
            <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
              {match.homeTeam.city}
            </span>
          </div>

          {/* VS Divider */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0.6rem" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 900,
                color: "#FFFFFF",
                backgroundColor: "var(--inst-black)",
                padding: "0.25rem 0.6rem",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--border-color)",
              }}
            >
              VS
            </span>
          </div>

          {/* Away Team */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                backgroundColor: match.awayTeam.badgeColor || "var(--inst-black)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "1rem",
                boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
                border: "2.5px solid var(--bg-surface)",
              }}
            >
              {match.awayTeam.badgeText || match.awayTeam.shortName.substring(0, 3).toUpperCase()}
            </div>
            <strong style={{ fontSize: "0.95rem", lineHeight: 1.2, color: "var(--text-primary)" }}>
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
            backgroundColor: "var(--bg-muted)",
            borderRadius: "var(--radius-md)",
            padding: "0.75rem 0.9rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.45rem",
            fontSize: "0.82rem",
            marginBottom: "1.2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)" }}>
            <Calendar size={15} color="var(--primary-red)" />
            <strong style={{ color: "var(--text-primary)" }}>{formatDatePt(match.date)}</strong>
            <span style={{ color: "var(--text-muted)" }}>•</span>
            <Clock size={14} color="var(--accent-gold)" />
            <span>{match.time}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)" }}>
            <MapPin size={15} color="var(--confirm-green)" />
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
            <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block" }}>
              A partir de
            </span>
            <span style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--primary-red)" }}>
              {formatKz(match.startingPrice)}
            </span>
          </div>

          <Link
            to={`/jogos/${match.id}`}
            className="btn btn-primary btn-sm"
            style={{ padding: "0.55rem 1.1rem" }}
          >
            <Ticket size={15} />
            <span>Ver Bilhetes</span>
            <ChevronRight size={15} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default MatchCard;
