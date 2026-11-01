import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Ticket } from "lucide-react";
import { getCompetitionById, MATCHES, getSportById } from "../data/sportsData";
import MatchCard from "../components/matches/MatchCard";

const CompetitionDetailPage = () => {
  const { id } = useParams();
  const competition = getCompetitionById(id);

  if (!competition) {
    return (
      <div className="container" style={{ padding: "5rem 1.25rem", textAlign: "center" }}>
        <h2>Competição não encontrada</h2>
        <p style={{ color: "var(--text-secondary)", margin: "1rem 0 2rem" }}>
          A competição seleccionada não foi encontrada nos registos oficiais.
        </p>
        <Link to="/competicoes" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Voltar a Competições</span>
        </Link>
      </div>
    );
  }

  const sport = getSportById(competition.sportId);
  const matches = MATCHES.filter((m) => m.competitionId === competition.id);

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Header Banner */}
      <section
        style={{
          position: "relative",
          backgroundColor: "var(--inst-black)",
          color: "#FFFFFF",
          padding: "4rem 0 3.5rem",
          backgroundImage: `linear-gradient(180deg, rgba(16,17,20,0.85) 0%, rgba(16,17,20,0.96) 100%), url('${competition.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <Link
            to="/competicoes"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#9DA4B2", fontSize: "0.85rem", marginBottom: "1.25rem" }}
          >
            <ArrowLeft size={16} />
            <span>Voltar a todas as competições</span>
          </Link>

          <div style={{ maxWidth: "800px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
              <span className="badge badge-gold">
                {competition.season}
              </span>
              <span className="badge badge-red">
                {sport ? sport.name : competition.sportId}
              </span>
            </div>

            <h1 className="title-section" style={{ color: "#FFFFFF", marginBottom: "1rem" }}>
              {competition.name}
            </h1>
            <p style={{ color: "#E2E5E9", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "2rem" }}>
              {competition.description}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
                padding: "1rem 1.25rem",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderRadius: "var(--radius-md)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "0.9rem",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", color: "#9DA4B2", display: "block" }}>Organização</span>
                <strong>{competition.organizer}</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#9DA4B2", display: "block" }}>Participantes</span>
                <strong>{competition.teamsCount} Equipas Oficiais</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#9DA4B2", display: "block" }}>Jogos Anunciados</span>
                <strong style={{ color: "var(--accent-gold)" }}>{matches.length} Duelos Disponíveis</strong>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Matches Grid */}
      <div className="container" style={{ marginTop: "3.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
            Jogos Disponíveis para {competition.name}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Reserva o teu bilhete oficial com antecedência e garante os melhores lugares.
          </p>
        </div>

        {matches.length > 0 ? (
          <div className="grid-matches">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div
            className="card"
            style={{
              padding: "3.5rem 2rem",
              textAlign: "center",
              color: "var(--text-secondary)",
            }}
          >
            <Ticket size={40} style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
            <p>De momento não existem jogos com bilheteira aberta para esta competição.</p>
            <p style={{ fontSize: "0.85rem", marginTop: "0.4rem" }}>
              Novos jogos da próxima jornada serão adicionados em breve.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitionDetailPage;
