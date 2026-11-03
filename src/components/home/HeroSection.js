import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { SPORTS, COMPETITIONS, STADIUMS, MATCHES } from "../../data/sportsData";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/jogos?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/jogos");
    }
  };

  const quickSports = [
    { name: "Girabola", path: "/competicoes/girabola" },
    { name: "Unitel Basket", path: "/competicoes/unitel-basket" },
    { name: "Palancas Negras", path: "/jogos?q=Palancas" },
    { name: "Andebol", path: "/modalidades/andebol" },
    { name: "Estádio 11 de Novembro", path: "/estadios/estadio-11-de-novembro" },
  ];

  return (
    <section
      style={{
        position: "relative",
        minHeight: "580px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#171717",
        backgroundImage: `linear-gradient(180deg, rgba(23, 23, 23, 0.86) 0%, rgba(23, 23, 23, 0.94) 75%, var(--bg-main) 100%), url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=2000&q=85')`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        color: "#E8E4DC",
        padding: "4.5rem 0 3.5rem",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ maxWidth: "860px" }}>
          
          {/* Badge Tag Institucional */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              backgroundColor: "#222222",
              border: "1px solid #333333",
              borderRadius: "var(--radius-sm)",
              padding: "0.4rem 0.9rem",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-gold)",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.06em", color: "#E8E4DC", textTransform: "uppercase" }}>
              Plataforma Oficial de Bilhética Desportiva de Angola
            </span>
          </div>

          {/* Main Title - Tipografia Forte com Destaque Dourado/Vermelho Moderado */}
          <h1
            className="title-hero"
            style={{
              color: "#FFFFFF",
              marginBottom: "1.2rem",
            }}
          >
            O desporto angolano, <span style={{ color: "var(--accent-gold)" }}>mais perto de ti.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(1.02rem, 2vw, 1.2rem)",
              color: "#A5A29C",
              lineHeight: 1.6,
              marginBottom: "2rem",
              fontWeight: 400,
              maxWidth: "720px",
            }}
          >
            Descobre os jogos oficiais, escolhe o teu lugar e garante os teus bilhetes com segurança e rapidez para os maiores estádios e pavilhões de Angola.
          </p>

          {/* Search Box Form - Fundo Sólido, Bordas Neutras e Aspecto Simples */}
          <div
            style={{
              backgroundColor: "#222222",
              borderRadius: "var(--radius-lg)",
              border: "1px solid #333333",
              padding: "0.85rem",
              marginBottom: "1.75rem",
            }}
          >
            <form
              onSubmit={handleSearch}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
                alignItems: "center",
              }}
            >
              <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
                <Search
                  size={18}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#A5A29C",
                  }}
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pesquisar por clube (Petro, 1.º de Agosto...), estádio ou modalidade..."
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem 0.85rem 42px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid #383838",
                    backgroundColor: "#171717",
                    color: "#E8E4DC",
                    outline: "none",
                    fontSize: "0.92rem",
                    fontWeight: 500,
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: "0.85rem 1.6rem", fontSize: "0.92rem" }}
              >
                <Search size={16} />
                <span>Pesquisar</span>
              </button>

              <Link
                to="/jogos"
                className="btn btn-secondary"
                style={{
                  padding: "0.85rem 1.4rem",
                  fontSize: "0.92rem",
                  backgroundColor: "#2C2C2C",
                  borderColor: "#3D3D3D",
                  color: "#E8E4DC",
                }}
              >
                <span>Ver Todos</span>
                <ArrowRight size={16} />
              </Link>
            </form>

            {/* Quick Filter Chips */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                flexWrap: "wrap",
                marginTop: "0.75rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid #2B2B2B",
              }}
            >
              <span style={{ fontSize: "0.76rem", color: "#A5A29C", fontWeight: 600 }}>
                Acessos Rápidos:
              </span>
              {quickSports.map((qs) => (
                <Link
                  key={qs.name}
                  to={qs.path}
                  style={{
                    fontSize: "0.75rem",
                    color: "#E8E4DC",
                    backgroundColor: "#171717",
                    padding: "0.22rem 0.65rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid #333333",
                    transition: "border-color 0.15s ease, color 0.15s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--primary-red)";
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#333333";
                    e.currentTarget.style.color = "#E8E4DC";
                  }}
                >
                  {qs.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Demonstrative Metrics Row - Minimalismo Institucional */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "1.25rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid #262626",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--accent-gold)", lineHeight: 1 }}>
                {SPORTS.length}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#A5A29C", lineHeight: 1.25 }}>
                Modalidades<br />Oficiais
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#FFFFFF", lineHeight: 1 }}>
                {MATCHES.length}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#A5A29C", lineHeight: 1.25 }}>
                Eventos com<br />Bilhetes Activos
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--primary-red)", lineHeight: 1 }}>
                {COMPETITIONS.length}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#A5A29C", lineHeight: 1.25 }}>
                Competições<br />Nacionais
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#E8E4DC", lineHeight: 1 }}>
                {STADIUMS.length}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#A5A29C", lineHeight: 1.25 }}>
                Estádios &<br />Pavilhões
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
