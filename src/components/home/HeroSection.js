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
        minHeight: "620px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--inst-black)",
        backgroundImage: `linear-gradient(180deg, rgba(16, 17, 20, 0.76) 0%, rgba(16, 17, 20, 0.90) 65%, var(--bg-main) 100%), url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=2000&q=88')`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        color: "#FFFFFF",
        padding: "4.5rem 0 3.5rem",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial lighting for premium depth */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(214, 40, 40, 0.16) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244, 185, 66, 0.12) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ maxWidth: "860px" }}>
          
          {/* Badge Tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              backgroundColor: "rgba(214, 40, 40, 0.22)",
              border: "1.5px solid rgba(214, 40, 40, 0.45)",
              borderRadius: "var(--radius-full)",
              padding: "0.4rem 1rem",
              marginBottom: "1.5rem",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-gold)",
                display: "inline-block",
                boxShadow: "0 0 8px var(--accent-gold)",
              }}
            />
            <span style={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.06em", color: "#FFFFFF" }}>
              BILHÉTICA DESPORTIVA NACIONAL DE ANGOLA
            </span>
          </div>

          {/* Main Title */}
          <h1
            className="title-hero"
            style={{
              color: "#FFFFFF",
              marginBottom: "1.25rem",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            O desporto angolano, <span style={{ color: "var(--accent-gold)" }}>mais perto de ti.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
              color: "#E2E5E9",
              lineHeight: 1.6,
              marginBottom: "2rem",
              fontWeight: 400,
              maxWidth: "740px",
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            Descobre os jogos, escolhe o teu lugar e vive a emoção nas bancadas dos maiores estádios e pavilhões de Angola.
          </p>

          {/* Search Box Form */}
          <div
            style={{
              backgroundColor: "rgba(22, 24, 31, 0.85)",
              borderRadius: "var(--radius-xl)",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              padding: "0.75rem",
              backdropFilter: "blur(16px)",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.45)",
              marginBottom: "1.5rem",
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
                  size={20}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#777D87",
                  }}
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pesquisar por clube (Petro, 1.º de Agosto...), estádio ou modalidade..."
                  style={{
                    width: "100%",
                    padding: "0.9rem 1rem 0.9rem 44px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backgroundColor: "rgba(255, 255, 255, 0.96)",
                    color: "var(--inst-black)",
                    outline: "none",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: "0.9rem 1.75rem", fontSize: "0.95rem" }}
              >
                <Search size={18} />
                <span>Pesquisar Jogos</span>
              </button>

              <Link
                to="/jogos"
                className="btn btn-gold"
                style={{ padding: "0.9rem 1.5rem", fontSize: "0.95rem" }}
              >
                <span>Explorar Todos</span>
                <ArrowRight size={18} />
              </Link>
            </form>

            {/* Quick Filter Chips */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginTop: "0.75rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <span style={{ fontSize: "0.78rem", color: "#9DA4B2", fontWeight: 600 }}>
                Acessos Rápidos:
              </span>
              {quickSports.map((qs) => (
                <Link
                  key={qs.name}
                  to={qs.path}
                  style={{
                    fontSize: "0.75rem",
                    color: "#FFFFFF",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    transition: "all 0.15s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--primary-red)";
                    e.currentTarget.style.borderColor = "var(--primary-red)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  }}
                >
                  {qs.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Demonstrative Metrics Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "1.25rem",
              paddingTop: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--accent-gold)", lineHeight: 1 }}>
                {SPORTS.length}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#D1D5DB", lineHeight: 1.2 }}>
                Modalidades<br />Oficiais
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#FFFFFF", lineHeight: 1 }}>
                {MATCHES.length}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#D1D5DB", lineHeight: 1.2 }}>
                Eventos com<br />Bilheteira Aberta
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--primary-red)", lineHeight: 1 }}>
                {COMPETITIONS.length}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#D1D5DB", lineHeight: 1.2 }}>
                Competições<br />Nacionais
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--confirm-green)", lineHeight: 1 }}>
                {STADIUMS.length}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#D1D5DB", lineHeight: 1.2 }}>
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
