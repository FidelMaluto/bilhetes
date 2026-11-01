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
        height: "100%",
      }}
    >
      {/* Stadium Image with Badges */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img
          src={stadium.image}
          alt={stadium.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(16,17,20,0.75) 100%)",
          }}
        />

        {/* Capacity badge */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: "rgba(16, 17, 20, 0.85)",
            backdropFilter: "blur(6px)",
            padding: "0.3rem 0.65rem",
            borderRadius: "var(--radius-full)",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            color: "var(--accent-gold)",
            fontSize: "0.75rem",
            fontWeight: 700,
            border: "1px solid rgba(244, 185, 66, 0.3)",
          }}
        >
          <Users size={13} />
          <span>{stadium.capacity.toLocaleString()} espectadores</span>
        </div>

        {/* City tag */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.82rem",
            fontWeight: 600,
          }}
        >
          <MapPin size={15} color="var(--primary-red)" />
          <span>{stadium.city}</span>
        </div>
      </div>

      {/* Stadium Details */}
      <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.4rem" }}>
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
            to={`/estadios/${stadium.slug}`}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: "0.8rem", padding: "0.45rem 0.85rem" }}
          >
            <span>Ver Recinto</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StadiumCard;
