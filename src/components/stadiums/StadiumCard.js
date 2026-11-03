import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Users, Calendar, ArrowRight } from "lucide-react";
import { MATCHES } from "../../data/sportsData";

const StadiumCard = ({ stadium }) => {
  // Calculate associated upcoming events strictly from local dataset
  const associatedMatches = MATCHES.filter((m) => m.stadiumId === stadium.id);

  return (
    <div
      className="card animate-fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border-color)",
        height: "100%",
      }}
    >
      {/* Stadium Image with Badges */}
      <div style={{ position: "relative", height: "190px", overflow: "hidden" }}>
        <img
          src={stadium.image}
          alt={stadium.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.04)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(23,23,23,0.85) 100%)",
          }}
        />

        {/* Capacity badge */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "#171717",
            padding: "0.25rem 0.6rem",
            borderRadius: "var(--radius-sm)",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            color: "var(--accent-gold)",
            fontSize: "0.72rem",
            fontWeight: 700,
            border: "1px solid #333333",
          }}
        >
          <Users size={12} />
          <span>{stadium.capacity.toLocaleString()} espectadores</span>
        </div>

        {/* City tag */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "12px",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.8rem",
            fontWeight: 600,
          }}
        >
          <MapPin size={14} color="var(--primary-red)" />
          <span>{stadium.city}</span>
        </div>
      </div>

      {/* Stadium Details */}
      <div style={{ padding: "1.2rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.35rem" }}>
            {stadium.name}
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "0.85rem", lineHeight: 1.4 }}>
            {stadium.location}
          </p>

          {/* Hosted Sports */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
            {stadium.sports.map((sp) => (
              <span key={sp} className="badge badge-neutral" style={{ fontSize: "0.68rem" }}>
                {sp}
              </span>
            ))}
          </div>
        </div>

        {/* Associated upcoming matches info & CTA */}
        <div
          style={{
            paddingTop: "0.85rem",
            borderTop: "1px solid var(--border-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            <Calendar size={14} color="var(--primary-red)" />
            <span>
              <strong>{associatedMatches.length}</strong> {associatedMatches.length === 1 ? "evento agendado" : "eventos agendados"}
            </span>
          </div>

          <Link
            to={`/estadios/${stadium.id}`}
            className="btn btn-secondary btn-sm"
            style={{ padding: "0.4rem 0.85rem", fontSize: "0.78rem" }}
          >
            <span>Ver Recinto</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StadiumCard;
