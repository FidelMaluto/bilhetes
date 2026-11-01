import React from "react";
import { Link } from "react-router-dom";
import { Ticket, MapPin, Phone, Mail, ShieldCheck, Award, ArrowRight } from "lucide-react";
import { SPORTS } from "../../data/sportsData";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "var(--inst-black)",
        color: "#E2E5E9",
        borderTop: "3px solid var(--primary-red)",
        marginTop: "auto",
        transition: "background-color var(--transition-base)",
      }}
    >
      {/* Top Pre-Footer with Quick Callout */}
      <div style={{ backgroundColor: "#15171D", padding: "1.75rem 0", borderBottom: "1px solid #232733" }}>
        <div className="container-wide" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: "var(--primary-red)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
              }}
            >
              <Award size={24} />
            </div>
            <div>
              <h4 style={{ color: "#FFFFFF", fontSize: "1.05rem", fontWeight: 700 }}>
                O Maior Portal de Bilhética Desportiva de Angola
              </h4>
              <p style={{ color: "#9DA4B2", fontSize: "0.85rem" }}>
                Garante o teu bilhete digital com segurança, rapidez e sem filas para os grandes palcos nacionais.
              </p>
            </div>
          </div>
          <Link to="/jogos" className="btn btn-gold btn-sm">
            <span>Explorar Calendário de Jogos</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-wide" style={{ padding: "4rem 1.25rem 2.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {/* Column 1: Brand & Identity */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: "var(--primary-red)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                }}
              >
                <Ticket size={20} />
              </div>
              <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
                ANGOLA <span style={{ color: "var(--primary-red)" }}>TICKETS</span>
              </span>
            </div>
            <p style={{ color: "#9DA4B2", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              Plataforma digital dedicada à divulgação, promoção e bilhética de eventos desportivos em Angola. Girabola, Unitel Basket, Taça de Angola e selecções nacionais num só lugar.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-gold)", fontSize: "0.85rem", fontWeight: 600 }}>
              <ShieldCheck size={18} />
              <span>Simulação Front-End 100% Segura</span>
            </div>
          </div>

          {/* Column 2: Navegação Rápida */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "1.2rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Navegação
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.9rem" }}>
              <li>
                <Link to="/" style={{ color: "#9DA4B2", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--accent-gold)"} onMouseLeave={(e) => e.target.style.color = "#9DA4B2"}>
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link to="/jogos" style={{ color: "#9DA4B2", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--accent-gold)"} onMouseLeave={(e) => e.target.style.color = "#9DA4B2"}>
                  Próximos Jogos & Bilhetes
                </Link>
              </li>
              <li>
                <Link to="/modalidades" style={{ color: "#9DA4B2", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--accent-gold)"} onMouseLeave={(e) => e.target.style.color = "#9DA4B2"}>
                  Modalidades Desportivas
                </Link>
              </li>
              <li>
                <Link to="/competicoes" style={{ color: "#9DA4B2", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--accent-gold)"} onMouseLeave={(e) => e.target.style.color = "#9DA4B2"}>
                  Competições Nacionais
                </Link>
              </li>
              <li>
                <Link to="/estadios" style={{ color: "#9DA4B2", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--accent-gold)"} onMouseLeave={(e) => e.target.style.color = "#9DA4B2"}>
                  Estádios e Pavilhões
                </Link>
              </li>
              <li>
                <Link to="/meus-bilhetes" style={{ color: "#9DA4B2", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--accent-gold)"} onMouseLeave={(e) => e.target.style.color = "#9DA4B2"}>
                  Meus Bilhetes Digitais
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Principais Modalidades & Ligas */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "1.2rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Modalidades em Foco
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.9rem" }}>
              {SPORTS.slice(0, 6).map((sport) => (
                <li key={sport.id}>
                  <Link
                    to={`/modalidades/${sport.slug}`}
                    style={{ color: "#9DA4B2", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--accent-gold)")}
                    onMouseLeave={(e) => (e.target.style.color = "#9DA4B2")}
                  >
                    {sport.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contacto & Apoio */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "1.2rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Contactos & Apoio
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.88rem", color: "#9DA4B2" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                <MapPin size={18} color="var(--primary-red)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>Complexo Desportivo da Cidadela / Talatona, Luanda - Angola</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <Phone size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                <span>+244 923 000 000 / +244 912 000 000</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <Mail size={18} color="var(--confirm-green)" style={{ flexShrink: 0 }} />
                <span>suporte@angolatickets.ao</span>
              </div>
              <Link to="/contacto" className="btn btn-outline-gold btn-sm" style={{ marginTop: "0.5rem" }}>
                Fale Connosco / Perguntas
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            marginTop: "3.5rem",
            paddingTop: "2rem",
            borderTop: "1px solid #232733",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            fontSize: "0.82rem",
            color: "#777D87",
          }}
        >
          <div>
            © 2026 Angola Sports Tickets. Todos os direitos reservados. Feito com paixão pelo desporto angolano.
          </div>
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
            <Link to="/contacto" style={{ color: "#777D87" }}>Termos de Uso</Link>
            <Link to="/contacto" style={{ color: "#777D87" }}>Privacidade e Proteção de Dados</Link>
            <Link to="/contacto" style={{ color: "#777D87" }}>Regulamento de Recintos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
