import React from "react";
import { Link } from "react-router-dom";
import { Flame, Calendar, Clock, MapPin, Ticket, ArrowRight, ShieldCheck } from "lucide-react";
import { formatKz, formatDatePt, MATCHES, getStadiumById, getCompetitionById } from "../../data/sportsData";

const FeaturedBanner = () => {
  // Select marquee match: match-01 (Clássico Petro vs 1º de Agosto)
  const featuredMatch = MATCHES.find((m) => m.id === "match-01") || MATCHES[0];
  const stadium = getStadiumById(featuredMatch.stadiumId);
  const competition = getCompetitionById(featuredMatch.competitionId);

  return (
    <section style={{ padding: "2.5rem 0 1.5rem" }}>
      <div className="container">
        
        {/* Section Mini Tag */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "var(--primary-red)",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: "0.82rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)" }}>
              Evento em Destaque Nacional
            </span>
          </div>
          <span className="badge badge-red" style={{ fontSize: "0.72rem" }}>
            <Flame size={13} />
            <span>Clássico dos Clássicos</span>
          </span>
        </div>

        {/* The Premium Feature Card */}
        <div
          style={{
            position: "relative",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            backgroundColor: "var(--inst-black)",
            color: "#FFFFFF",
            boxShadow: "0 20px 45px -12px rgba(16, 17, 20, 0.45)",
            border: "1.5px solid rgba(214, 40, 40, 0.35)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {/* Background Ambient Imagery & Dark Overlays */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(90deg, rgba(16, 17, 20, 0.94) 0%, rgba(16, 17, 20, 0.82) 50%, rgba(16, 17, 20, 0.72) 100%), url('${featuredMatch.bannerImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 1,
            }}
          />

          {/* Left Side: Match Details & Pitch Context */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "clamp(1.75rem, 3.5vw, 3rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1.5rem",
            }}
          >
            <div>
              {/* Competition & Status Badges */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                <span className="badge badge-gold" style={{ fontSize: "0.75rem" }}>
                  {competition ? competition.name : "Girabola"} {competition?.season}
                </span>
                <span className="badge badge-neutral" style={{ fontSize: "0.75rem" }}>
                  {featuredMatch.round}
                </span>
                <span className="badge badge-green" style={{ fontSize: "0.75rem" }}>
                  <ShieldCheck size={13} />
                  <span>Bilheteira Aberta</span>
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  marginBottom: "0.85rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {featuredMatch.title}
              </h2>

              <p style={{ color: "#E2E5E9", fontSize: "0.95rem", lineHeight: 1.5, maxWidth: "560px", marginBottom: "1.5rem" }}>
                {featuredMatch.description}
              </p>

              {/* Meta strip: Date, Time, Venue */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  padding: "0.9rem 1.2rem",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  fontSize: "0.88rem",
                  backdropFilter: "blur(6px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Calendar size={17} color="var(--primary-red)" />
                  <span style={{ fontWeight: 600 }}>{formatDatePt(featuredMatch.date)}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Clock size={17} color="var(--accent-gold)" />
                  <span style={{ fontWeight: 600 }}>{featuredMatch.time}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <MapPin size={17} color="var(--confirm-green)" />
                  <span>{stadium ? stadium.name : featuredMatch.province}</span>
                </div>
              </div>
            </div>

            {/* Price & CTA Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <div>
                <span style={{ fontSize: "0.78rem", color: "#9DA4B2", display: "block" }}>
                  Preço a partir de
                </span>
                <span style={{ fontSize: "1.65rem", fontWeight: 900, color: "var(--accent-gold)" }}>
                  {formatKz(featuredMatch.startingPrice)}
                </span>
              </div>

              <Link
                to={`/jogos/${featuredMatch.id}`}
                className="btn btn-primary btn-lg"
                style={{ padding: "0.85rem 1.8rem" }}
              >
                <Ticket size={18} />
                <span>Comprar Bilhete</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Right Side: Club Emblems Face-Off Showpiece */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, rgba(214, 40, 40, 0.12) 0%, rgba(16, 17, 20, 0.4) 100%)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "380px",
                backgroundColor: "rgba(22, 24, 31, 0.75)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                padding: "2rem 1.5rem",
                backdropFilter: "blur(12px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
                textAlign: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
                
                {/* Home Club: Petro de Luanda */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "16px",
                      backgroundColor: featuredMatch.homeTeam.badgeColor || "#F4B942",
                      color: "#101114",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "1.25rem",
                      boxShadow: "0 8px 20px rgba(244, 185, 66, 0.35)",
                      border: "3px solid #FFFFFF",
                    }}
                  >
                    {featuredMatch.homeTeam.badgeText}
                  </div>
                  <strong style={{ fontSize: "0.95rem", color: "#FFFFFF" }}>
                    {featuredMatch.homeTeam.shortName}
                  </strong>
                  <span style={{ fontSize: "0.72rem", color: "var(--accent-gold)" }}>
                    {featuredMatch.homeTeam.nickname}
                  </span>
                </div>

                {/* VS Badge */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "var(--primary-red)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "0.9rem",
                    boxShadow: "0 4px 12px rgba(214, 40, 40, 0.4)",
                  }}
                >
                  VS
                </div>

                {/* Away Club: 1.º de Agosto */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "16px",
                      backgroundColor: featuredMatch.awayTeam.badgeColor || "#D62828",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "1.25rem",
                      boxShadow: "0 8px 20px rgba(214, 40, 40, 0.35)",
                      border: "3px solid #FFFFFF",
                    }}
                  >
                    {featuredMatch.awayTeam.badgeText}
                  </div>
                  <strong style={{ fontSize: "0.95rem", color: "#FFFFFF" }}>
                    {featuredMatch.awayTeam.shortName}
                  </strong>
                  <span style={{ fontSize: "0.72rem", color: "var(--primary-red)" }}>
                    {featuredMatch.awayTeam.nickname}
                  </span>
                </div>

              </div>

              {/* Stadium info snippet */}
              <div
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.78rem",
                  color: "#9DA4B2",
                }}
              >
                Palco: <strong style={{ color: "#FFFFFF" }}>Estádio Nacional 11 de Novembro</strong>
                <br />
                Capacidade: <span style={{ color: "var(--accent-gold)" }}>48.500 Lugares</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturedBanner;
