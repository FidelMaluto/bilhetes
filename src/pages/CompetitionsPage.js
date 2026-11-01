import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { COMPETITIONS, MATCHES } from "../data/sportsData";

const CompetitionsPage = () => {
  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <span className="badge badge-gold" style={{ marginBottom: "0.5rem" }}>
            CAMPEONATOS & TAÇAS
          </span>
          <h1 className="title-section" style={{ marginBottom: "0.6rem" }}>
            Competições Desportivas Nacionais
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "720px" }}>
            Acompanha as principais ligas, taças e torneios de Angola. Descobre o calendário de jogos, as equipas participantes e garante o teu bilhete oficial.
          </p>
        </div>

        {/* Competitions Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "2rem",
          }}
        >
          {COMPETITIONS.map((comp) => {
            const matchesCount = MATCHES.filter((m) => m.competitionId === comp.id).length;

            return (
              <div
                key={comp.id}
                className="card animate-fade-in"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                {/* Visual Header */}
                <div style={{ height: "180px", position: "relative", overflow: "hidden" }}>
                  <img
                    src={comp.image}
                    alt={comp.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.06)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(16,17,20,0.8) 100%)",
                    }}
                  />
                  <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                    <span className="badge badge-gold" style={{ fontSize: "0.72rem" }}>
                      {comp.sportId.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ position: "absolute", bottom: "14px", left: "16px", color: "#FFFFFF" }}>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#FFFFFF" }}>
                      {comp.name}
                    </h3>
                    <span style={{ fontSize: "0.8rem", color: "var(--accent-gold)" }}>
                      {comp.season}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                      Organização: <strong>{comp.organizer}</strong>
                    </div>

                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                      {comp.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.25rem",
                        padding: "0.75rem 1rem",
                        backgroundColor: "var(--bg-muted)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "0.82rem",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <Users size={15} color="var(--primary-red)" />
                        <span><strong>{comp.teamsCount}</strong> Clubes</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <Calendar size={15} color="var(--accent-gold)" />
                        <span><strong>{matchesCount}</strong> Jogos disponíveis</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/competicoes/${comp.id}`}
                    className="btn btn-primary btn-sm"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <span>Consultar Eventos de {comp.name}</span>
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

export default CompetitionsPage;
