import React from "react";
import { Link } from "react-router-dom";
import { Ticket, MapPin, Phone, Mail, ShieldCheck, Award, ArrowRight } from "lucide-react";
import { SPORTS } from "../../data/sportsData";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#171717",
        color: "#E8E4DC",
        borderTop: "2px solid var(--primary-red)",
        marginTop: "auto",
        transition: "background-color var(--transition-base)",
      }}
    >
      {/* Top Pre-Footer with Quick Callout */}
      <div style={{ backgroundColor: "#1B1B1B", padding: "1.75rem 0", borderBottom: "1px solid #282828" }}>
        <div className="container-wide" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "8px",
                backgroundColor: "var(--primary-red)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
              }}
            >
              <Award size={22} color="#FFFFFF" />
            </div>
            <div>
              <h4 style={{ color: "#E8E4DC", fontSize: "1rem", fontWeight: 700 }}>
                Portal Oficial de Bilhética Desportiva de Angola
              </h4>
              <p style={{ color: "#A5A29C", fontSize: "0.85rem" }}>
                Garante o teu bilhete digital com segurança, rapidez e sem filas para os grandes palcos nacionais.
              </p>
            </div>
          </div>
          <Link
            to="/jogos"
            className="btn btn-secondary btn-sm"
            style={{ backgroundColor: "#262626", borderColor: "#383838", color: "#E8E4DC" }}
          >
            <span>Explorar Calendário de Jogos</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-wide" style={{ padding: "3.5rem 1.25rem 2.5rem" }}>
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
                  borderRadius: "6px",
                  backgroundColor: "var(--primary-red)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                }}
              >
                <Ticket size={20} color="#FFFFFF" />
              </div>
              <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#E8E4DC", letterSpacing: "-0.02em" }}>
                ANGOLA <span style={{ color: "var(--primary-red)" }}>TICKETS</span>
              </span>
            </div>
            <p style={{ color: "#A5A29C", fontSize: "0.86rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              Plataforma digital dedicada à divulgação, promoção e bilhética de eventos desportivos em Angola. Girabola, Unitel Basket, Taça de Angola e selecções nacionais num só lugar.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-gold)", fontSize: "0.82rem", fontWeight: 600 }}>
              <ShieldCheck size={17} />
              <span>Plataforma Segura e Autêntica</span>
            </div>
          </div>

          {/* Column 2: Navegação Rápida */}
          <div>
            <h4 style={{ color: "#E8E4DC", fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.2rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Navegação
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.88rem" }}>
              <li>
                <Link to="/" style={{ color: "#A5A29C", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#E8E4DC"} onMouseLeave={(e) => e.target.style.color = "#A5A29C"}>
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link to="/jogos" style={{ color: "#A5A29C", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#E8E4DC"} onMouseLeave={(e) => e.target.style.color = "#A5A29C"}>
                  Próximos Jogos & Bilhetes
                </Link>
              </li>
              <li>
                <Link to="/modalidades" style={{ color: "#A5A29C", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#E8E4DC"} onMouseLeave={(e) => e.target.style.color = "#A5A29C"}>
                  Modalidades Desportivas
                </Link>
              </li>
              <li>
                <Link to="/competicoes" style={{ color: "#A5A29C", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#E8E4DC"} onMouseLeave={(e) => e.target.style.color = "#A5A29C"}>
                  Competições Nacionais
                </Link>
              </li>
              <li>
                <Link to="/estadios" style={{ color: "#A5A29C", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#E8E4DC"} onMouseLeave={(e) => e.target.style.color = "#A5A29C"}>
                  Estádios e Pavilhões
                </Link>
              </li>
              <li>
                <Link to="/meus-bilhetes" style={{ color: "#A5A29C", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#E8E4DC"} onMouseLeave={(e) => e.target.style.color = "#A5A29C"}>
                  Meus Bilhetes Digitais
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Principais Modalidades & Ligas */}
          <div>
            <h4 style={{ color: "#E8E4DC", fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.2rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Modalidades em Foco
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.88rem" }}>
              {SPORTS.slice(0, 6).map((sport) => (
                <li key={sport.id}>
                  <Link
                    to={`/modalidades/${sport.slug}`}
                    style={{ color: "#A5A29C", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.target.style.color = "#E8E4DC")}
                    onMouseLeave={(e) => (e.target.style.color = "#A5A29C")}
                  >
                    {sport.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contacto & Apoio */}
          <div>
            <h4 style={{ color: "#E8E4DC", fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.2rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Contactos & Apoio
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.86rem", color: "#A5A29C" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                <MapPin size={17} color="var(--primary-red)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>Complexo Desportivo da Cidadela / Talatona, Luanda - Angola</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <Phone size={17} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                <span>+244 923 000 000 / +244 912 000 000</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <Mail size={17} color="#E8E4DC" style={{ flexShrink: 0 }} />
                <span>suporte@angolatickets.ao</span>
              </div>
              <Link
                to="/contacto"
                className="btn btn-secondary btn-sm"
                style={{ marginTop: "0.5rem", backgroundColor: "#242424", borderColor: "#333333", color: "#E8E4DC" }}
              >
                Fale Connosco / Perguntas
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            marginTop: "3.5rem",
            paddingTop: "1.75rem",
            borderTop: "1px solid #262626",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            fontSize: "0.8rem",
            color: "#777570",
          }}
        >
          <div>
            © 2026 Angola Sports Tickets. Todos os direitos reservados. Bilhética desportiva nacional.
          </div>
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
            <Link to="/contacto" style={{ color: "#777570" }}>Termos de Uso</Link>
            <Link to="/contacto" style={{ color: "#777570" }}>Privacidade e Proteção de Dados</Link>
            <Link to="/contacto" style={{ color: "#777570" }}>Regulamento de Recintos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
