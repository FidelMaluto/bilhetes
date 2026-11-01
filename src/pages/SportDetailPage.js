import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Ticket, ArrowRight } from "lucide-react";
import { getSportById, MATCHES, COMPETITIONS, formatKz } from "../data/sportsData";
import MatchCard from "../components/matches/MatchCard";

const SportDetailPage = () => {
  const { slug } = useParams();
  const sport = getSportById(slug);

  if (!sport) {
    return (
      <div className="container" style={{ padding: "5rem 1.25rem", textAlign: "center" }}>
        <h2>Modalidade não encontrada</h2>
        <p style={{ color: "var(--text-secondary)", margin: "1rem 0 2rem" }}>
          A modalidade desportiva solicitada não existe no catálogo.
        </p>
        <Link to="/modalidades" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Voltar a Modalidades</span>
        </Link>
      </div>
    );
  }

  // Filter matches for this sport
  const sportMatches = MATCHES.filter((m) => m.sportId === sport.id);
  // Associated competitions
  const associatedCompetitions = COMPETITIONS.filter((c) => c.sportId === sport.id);

  // Participating teams extracted from matches
  const teamMap = new Map();
  sportMatches.forEach((m) => {
    if (m.homeTeam && !teamMap.has(m.homeTeam.id)) teamMap.set(m.homeTeam.id, m.homeTeam);
    if (m.awayTeam && !teamMap.has(m.awayTeam.id)) teamMap.set(m.awayTeam.id, m.awayTeam);
  });
  const participatingTeams = Array.from(teamMap.values());

  // Ticket price range
  const prices = sportMatches.map((m) => m.startingPrice);
  const minPrice = prices.length ? Math.min(...prices) : 1000;
  const maxPrice = prices.length
    ? Math.max(...sportMatches.flatMap((m) => m.categories.map((c) => c.price)))
    : 15000;

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Sport Hero Banner */}
      <section
        style={{
          position: "relative",
          backgroundColor: "var(--inst-black)",
          color: "#FFFFFF",
          padding: "4rem 0 3.5rem",
          backgroundImage: `linear-gradient(180deg, rgba(16,17,20,0.85) 0%, rgba(16,17,20,0.96) 100%), url('${sport.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <Link
            to="/modalidades"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#9DA4B2", fontSize: "0.85rem", marginBottom: "1.25rem" }}
          >
            <ArrowLeft size={16} />
            <span>Voltar a todas as modalidades</span>
          </Link>

          <div style={{ maxWidth: "800px" }}>
            <span className="badge badge-red" style={{ marginBottom: "0.75rem" }}>
              MODALIDADE OFICIAL
            </span>
            <h1 className="title-section" style={{ color: "#FFFFFF", marginBottom: "1rem" }}>
              {sport.name} em Angola
            </h1>
            <p style={{ color: "#E2E5E9", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "2rem" }}>
              {sport.description}
            </p>

            {/* Quick Metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "1rem",
                padding: "1rem 1.25rem",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderRadius: "var(--radius-md)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "0.9rem",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", color: "#9DA4B2", display: "block" }}>Eventos Disponíveis</span>
                <strong style={{ fontSize: "1.25rem", color: "var(--accent-gold)" }}>{sportMatches.length} jogos</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#9DA4B2", display: "block" }}>Competições Activas</span>
                <strong style={{ fontSize: "1.25rem", color: "#FFFFFF" }}>{associatedCompetitions.length}</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#9DA4B2", display: "block" }}>Preço dos Bilhetes</span>
                <strong style={{ fontSize: "1.1rem", color: "var(--primary-red)" }}>
                  {formatKz(minPrice)} - {formatKz(maxPrice)}
                </strong>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: "3.5rem" }}>
        
        {/* Next Matches Section */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                Próximos Jogos de {sport.name}
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                Garante já a tua entrada para os duelos mais electrizantes.
              </p>
            </div>
          </div>

          {sportMatches.length > 0 ? (
            <div className="grid-matches">
              {sportMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div
              className="card"
              style={{
                padding: "3rem",
                textAlign: "center",
                color: "var(--text-secondary)",
              }}
            >
              <Ticket size={40} style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
              <p>Não existem jogos agendados no momento para {sport.name}.</p>
              <p style={{ fontSize: "0.85rem", marginTop: "0.3rem" }}>
                Novos calendários oficiais serão anunciados brevemente pelas federações desportivas.
              </p>
            </div>
          )}
        </div>

        {/* Associated Competitions */}
        {associatedCompetitions.length > 0 && (
          <div style={{ marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.25rem" }}>
              Competições Associadas
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {associatedCompetitions.map((comp) => (
                <div
                  key={comp.id}
                  className="card"
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "var(--bg-surface)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span className="badge badge-gold" style={{ marginBottom: "0.5rem" }}>
                      {comp.organizer}
                    </span>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                      {comp.name}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "1rem" }}>
                      {comp.description}
                    </p>
                  </div>
                  <Link to={`/competicoes/${comp.id}`} className="btn btn-outline-red btn-sm">
                    <span>Ver Detalhes da Competição</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Participating Clubs / Teams */}
        {participatingTeams.length > 0 && (
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.25rem" }}>
              Clubes e Equipas em Destaque
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
              {participatingTeams.map((team) => (
                <div
                  key={team.id}
                  className="card"
                  style={{
                    padding: "1.25rem 1rem",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      backgroundColor: team.badgeColor || "var(--primary-red)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1.05rem",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    }}
                  >
                    {team.badgeText || team.shortName.substring(0, 3)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700 }}>{team.shortName}</h4>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{team.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SportDetailPage;
