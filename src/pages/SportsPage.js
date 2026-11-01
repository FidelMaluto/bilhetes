import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Ticket } from "lucide-react";
import { SPORTS, MATCHES } from "../data/sportsData";

const SportsPage = () => {
  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: "3rem" }}>
          <span className="badge badge-gold" style={{ marginBottom: "0.5rem" }}>
            PANORAMA DESPORTIVO NACIONAL
          </span>
          <h1 className="title-section" style={{ marginBottom: "0.6rem" }}>
            Modalidades Desportivas de Angola
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "700px" }}>
            Explora os eventos oficiais das 10 principais modalidades praticadas em Angola, desde as grandes ligas aos campeonatos de formação e meetings nacionais.
          </p>
        </div>

        {/* Sports Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {SPORTS.map((sport) => {
            const eventsCount = MATCHES.filter((m) => m.sportId === sport.id).length;

            return (
              <div
                key={sport.id}
                className="card animate-fade-in"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                {/* Image */}
                <div style={{ height: "190px", position: "relative", overflow: "hidden" }}>
                  <img
                    src={sport.image}
                    alt={sport.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.35s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.06)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(16,17,20,0.7) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "14px",
                      color: "#FFFFFF",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                    }}
                  >
                    {sport.name}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "1rem" }}>
                      {sport.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "var(--bg-muted)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "0.82rem",
                        color: "var(--text-secondary)",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <Ticket size={16} color="var(--primary-red)" />
                      <span>
                        <strong>{eventsCount}</strong> {eventsCount === 1 ? "evento com bilheteira aberta" : "eventos com bilheteira aberta"}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/modalidades/${sport.slug}`}
                    className="btn btn-secondary btn-sm"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <span>Ver Eventos de {sport.name}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default SportsPage;
