import React from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, Sparkles } from "lucide-react";
import { getStadiumById, MATCHES } from "../data/sportsData";
import MatchCard from "../components/matches/MatchCard";

const StadiumDetailPage = () => {
  const { slug } = useParams();
  const stadium = getStadiumById(slug);

  if (!stadium) {
    return (
      <div className="container" style={{ padding: "5rem 1.25rem", textAlign: "center" }}>
        <h2>Recinto não encontrado</h2>
        <p style={{ color: "var(--text-secondary)", margin: "1rem 0 2rem" }}>
          O estádio ou pavilhão solicitado não foi encontrado no sistema.
        </p>
        <Link to="/estadios" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Voltar aos Estádios</span>
        </Link>
      </div>
    );
  }

  // Associated matches
  const hostedMatches = MATCHES.filter((m) => m.stadiumId === stadium.id);

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Stadium Banner */}
      <section
        style={{
          position: "relative",
          backgroundColor: "var(--inst-black)",
          color: "#FFFFFF",
          padding: "4rem 0 3.5rem",
          backgroundImage: `linear-gradient(180deg, rgba(16,17,20,0.8) 0%, rgba(16,17,20,0.95) 100%), url('${stadium.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <Link
            to="/estadios"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#9DA4B2", fontSize: "0.85rem", marginBottom: "1.25rem" }}
          >
            <ArrowLeft size={16} />
            <span>Voltar a todos os estádios</span>
          </Link>

          <div style={{ maxWidth: "800px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              <span className="badge badge-gold">
                {stadium.city}
              </span>
              <span className="badge badge-red">
                {stadium.capacity.toLocaleString()} Lugares Confirmados
              </span>
            </div>

            <h1 className="title-section" style={{ color: "#FFFFFF", marginBottom: "1rem" }}>
              {stadium.name}
            </h1>
            <p style={{ color: "#E2E5E9", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "2rem" }}>
              {stadium.description}
            </p>

            {/* Quick Specs */}
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
                fontSize: "0.88rem",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", color: "#9DA4B2", display: "block" }}>Localização</span>
                <strong>{stadium.location}</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#9DA4B2", display: "block" }}>Piso / Superfície</span>
                <strong>{stadium.surface}</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#9DA4B2", display: "block" }}>Ano de Abertura</span>
                <strong>{stadium.openedYear}</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#9DA4B2", display: "block" }}>Eventos Agendados</span>
                <strong style={{ color: "var(--accent-gold)" }}>{hostedMatches.length}</strong>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: "3.5rem" }}>
        
        {/* Hosted Matches Section */}
        <div style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            Próximos Jogos no {stadium.name}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            Bilhetes oficiais disponíveis para os eventos agendados neste recinto.
          </p>

          {hostedMatches.length > 0 ? (
            <div className="grid-matches">
              {hostedMatches.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          ) : (
            <div
              className="card"
              style={{
                padding: "3.5rem",
                textAlign: "center",
                color: "var(--text-secondary)",
              }}
            >
              <Calendar size={40} style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
              <p>Não há jogos com bilheteira aberta para este estádio no momento.</p>
            </div>
          )}
        </div>

        {/* Stadium Amenities / Services */}
        <div
          className="card"
          style={{
            padding: "2rem",
            backgroundColor: "var(--bg-surface)",
          }}
        >
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Sparkles size={20} color="var(--accent-gold)" />
            <span>Serviços e Acessibilidade do Recinto</span>
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
            {stadium.vipServices}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            <span className="badge badge-neutral">Acesso a Cadeirantes</span>
            <span className="badge badge-neutral">Portões de Torniquete Electrónico</span>
            <span className="badge badge-neutral">Zonas de Restauração & Bar</span>
            <span className="badge badge-neutral">Posto Médico de Emergência</span>
            <span className="badge badge-neutral">Segurança Policial e Privada</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StadiumDetailPage;
