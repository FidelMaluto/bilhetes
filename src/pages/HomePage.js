import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import HeroSection from "../components/home/HeroSection";
import FeaturedBanner from "../components/home/FeaturedBanner";
import HowItWorks from "../components/home/HowItWorks";
import MatchCard from "../components/matches/MatchCard";
import StadiumCard from "../components/stadiums/StadiumCard";
import { SPORTS, COMPETITIONS, STADIUMS, MATCHES } from "../data/sportsData";

const HomePage = () => {
  const [selectedSportTab, setSelectedSportTab] = useState("todos");

  const filteredMatches = selectedSportTab === "todos"
    ? MATCHES.slice(0, 6)
    : MATCHES.filter((m) => m.sportId === selectedSportTab).slice(0, 6);

  // Marquee competitions: Girabola and Unitel Basket
  const girabolaComp = COMPETITIONS.find((c) => c.id === "girabola");
  const unitelBasketComp = COMPETITIONS.find((c) => c.id === "unitel-basket");
  const otherCompetitions = COMPETITIONS.filter((c) => c.id !== "girabola" && c.id !== "unitel-basket").slice(0, 4);

  return (
    <div>
      {/* 1. Hero Section com foto de estádio e sobreposição escura */}
      <HeroSection />

      {/* 2. Cartão do Evento Principal (Clássico dos Clássicos: Petro vs 1º de Agosto) */}
      <FeaturedBanner />

      {/* 3. Próximos Jogos com cartões modernos e consistentes */}
      <section style={{ padding: "3.5rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginBottom: "2rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--primary-red)",
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: "0.82rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent-gold)" }}>
                  CALENDÁRIO NACIONAL
                </span>
              </div>
              <h2 className="title-section">
                Próximos Jogos em Destaque
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Acompanha os duelos mais aguardados do futebol, basquetebol, andebol e outras modalidades em Angola.
              </p>
            </div>

            <Link to="/jogos" className="btn btn-outline-red btn-sm">
              <span>Ver Todos os Jogos ({MATCHES.length})</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Sport Filter Tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              overflowX: "auto",
              paddingBottom: "0.85rem",
              marginBottom: "1.75rem",
              scrollbarWidth: "none",
            }}
          >
            {[
              { id: "todos", label: "Todos os Jogos" },
              { id: "futebol", label: "Futebol (Girabola)" },
              { id: "basquetebol", label: "Basquetebol (Unitel)" },
              { id: "andebol", label: "Andebol" },
              { id: "hoquei-patins", label: "Hóquei em Patins" },
              { id: "atletismo", label: "Atletismo" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSportTab(tab.id)}
                className={`btn btn-sm ${selectedSportTab === tab.id ? "btn-primary" : "btn-secondary"}`}
                style={{ borderRadius: "var(--radius-full)" }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Matches Grid */}
          <div className="grid-matches">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.75rem" }}>
            <Link to="/jogos" className="btn btn-primary btn-lg">
              <span>Explorar Todos os {MATCHES.length} Jogos e Bilhetes</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Secção Visual de Modalidades com cartões para Futebol, Basquetebol, Andebol, etc. */}
      <section style={{ padding: "4rem 0", backgroundColor: "var(--bg-surface-elevated)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2.25rem" }}>
            <div>
              <span className="badge badge-red" style={{ marginBottom: "0.5rem" }}>
                DIVERSIDADE DESPORTIVA NACIONAL
              </span>
              <h2 className="title-section">
                Modalidades Desportivas
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Do futebol rei aos pavilhões e pistas, descobre os eventos disponíveis em cada modalidade em Angola.
              </p>
            </div>
            <Link to="/modalidades" className="btn btn-secondary btn-sm">
              <span>Todas as 10 Modalidades</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Sports Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {SPORTS.map((sport) => {
              const availableEventsCount = MATCHES.filter((m) => m.sportId === sport.id).length;

              return (
                <Link
                  key={sport.id}
                  to={`/modalidades/${sport.slug}`}
                  className="card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "300px",
                    position: "relative",
                    textDecoration: "none",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <img
                    src={sport.image}
                    alt={sport.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.08)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(16,17,20,0.1) 0%, rgba(16,17,20,0.88) 100%)",
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      color: "#FFFFFF",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                      <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#FFFFFF" }}>
                        {sport.name}
                      </h3>
                      <span
                        style={{
                          backgroundColor: "rgba(255,255,255,0.22)",
                          backdropFilter: "blur(4px)",
                          color: "#FFFFFF",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          padding: "0.2rem 0.65rem",
                          borderRadius: "var(--radius-full)",
                        }}
                      >
                        {availableEventsCount} {availableEventsCount === 1 ? "evento" : "eventos"}
                      </span>
                    </div>

                    <p style={{ fontSize: "0.82rem", color: "#E2E5E9", lineHeight: 1.4, marginBottom: "1rem" }}>
                      {sport.shortDescription}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "var(--accent-gold)", fontWeight: 700 }}>
                      <span>Explorar eventos e bilhetes</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Secção de Competições Nacionais com Especial Destaque para Girabola e Unitel Basket */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginBottom: "2.5rem" }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: "0.5rem" }}>
                CAMPEONATOS DE ELITE
              </span>
              <h2 className="title-section">
                Competições Nacionais em Destaque
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                A emoção das maiores ligas profissionais de Angola: Girabola e Unitel Basket.
              </p>
            </div>
            <Link to="/competicoes" className="btn btn-secondary btn-sm">
              <span>Todas as Competições</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Marquee Competitions Spotlight Grid (Girabola & Unitel Basket side-by-side) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem", marginBottom: "2.5rem" }}>
            
            {/* Girabola Spotlight */}
            {girabolaComp && (
              <div
                className="card"
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  backgroundColor: "#171717",
                  color: "#FFFFFF",
                  border: "1px solid #333333",
                  borderTop: "3px solid var(--primary-red)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(180deg, rgba(23,23,23,0.7) 0%, rgba(23,23,23,0.95) 100%), url('${girabolaComp.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 1,
                  }}
                />
                <div style={{ position: "relative", zIndex: 2, padding: "2.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "360px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <span className="badge badge-red" style={{ fontSize: "0.72rem" }}>
                        FUTEBOL SÉNIOR MASCULINO
                      </span>
                      <span style={{ fontSize: "0.82rem", color: "var(--accent-gold)", fontWeight: 700 }}>
                        {girabolaComp.season}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.9rem", fontWeight: 900, color: "#FFFFFF", marginBottom: "0.6rem" }}>
                      {girabolaComp.name}
                    </h3>
                    <p style={{ color: "#A5A29C", fontSize: "0.92rem", lineHeight: 1.55, marginBottom: "1.5rem" }}>
                      {girabolaComp.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.25rem", fontSize: "0.85rem", color: "#A5A29C" }}>
                      <div><strong>16</strong> Clubes Nacionais</div>
                      <div>•</div>
                      <div><strong>{MATCHES.filter((m) => m.competitionId === "girabola").length}</strong> Jogos com Bilheteira</div>
                    </div>

                    <Link to="/competicoes/girabola" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                      <span>Consultar Jogos do Girabola</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Unitel Basket Spotlight */}
            {unitelBasketComp && (
              <div
                className="card"
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  backgroundColor: "#171717",
                  color: "#FFFFFF",
                  border: "1px solid #333333",
                  borderTop: "3px solid var(--accent-gold)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(180deg, rgba(23,23,23,0.7) 0%, rgba(23,23,23,0.95) 100%), url('${unitelBasketComp.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 1,
                  }}
                />
                <div style={{ position: "relative", zIndex: 2, padding: "2.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "360px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <span className="badge badge-gold" style={{ fontSize: "0.72rem" }}>
                        BASQUETEBOL NACIONAL
                      </span>
                      <span style={{ fontSize: "0.82rem", color: "#E8E4DC", fontWeight: 700 }}>
                        {unitelBasketComp.season}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.9rem", fontWeight: 900, color: "#FFFFFF", marginBottom: "0.6rem" }}>
                      {unitelBasketComp.name}
                    </h3>
                    <p style={{ color: "#A5A29C", fontSize: "0.92rem", lineHeight: 1.55, marginBottom: "1.5rem" }}>
                      {unitelBasketComp.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.25rem", fontSize: "0.85rem", color: "#A5A29C" }}>
                      <div><strong>10</strong> Equipas em Disputa</div>
                      <div>•</div>
                      <div><strong>{MATCHES.filter((m) => m.competitionId === "unitel-basket").length}</strong> Jogos com Bilheteira</div>
                    </div>

                    <Link to="/competicoes/unitel-basket" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                      <span>Consultar Jogos do Unitel Basket</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Other Competitions Compact Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {otherCompetitions.map((comp) => (
              <div
                key={comp.id}
                className="card"
                style={{
                  padding: "1.25rem",
                  backgroundColor: "var(--bg-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <div>
                  <span className="badge badge-neutral" style={{ fontSize: "0.68rem", marginBottom: "0.3rem" }}>
                    {comp.sportId.toUpperCase()}
                  </span>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800 }}>{comp.name}</h4>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{comp.season}</span>
                </div>
                <Link to={`/competicoes/${comp.id}`} className="btn-icon" style={{ backgroundColor: "var(--bg-muted)", color: "var(--text-primary)" }}>
                  <ChevronRight size={18} />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Recintos Desportivos Angolanos */}
      <section style={{ padding: "4rem 0", backgroundColor: "var(--bg-surface-elevated)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: "0.5rem" }}>
                PALCOS DO DESPORTO NACIONAL
              </span>
              <h2 className="title-section">
                Estádios e Pavilhões de Angola
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Conhece as grandes infraestruturas que acolhem a vibração dos adeptos angolanos.
              </p>
            </div>
            <Link to="/estadios" className="btn btn-secondary btn-sm">
              <span>Ver Todos os Recintos</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-stadiums">
            {STADIUMS.slice(0, 3).map((stadium) => (
              <StadiumCard key={stadium.id} stadium={stadium} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Como Funciona (Processo em 4 Etapas) */}
      <HowItWorks />
    </div>
  );
};

export default HomePage;
