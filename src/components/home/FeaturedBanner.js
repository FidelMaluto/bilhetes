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
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "var(--primary-red)",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)" }}>
              Evento em Destaque Nacional
            </span>
          </div>
          <span className="badge badge-red" style={{ fontSize: "0.7rem" }}>
            <Flame size={12} />
            <span>Clássico dos Clássicos</span>
          </span>
        </div>

        {/* The Feature Card - Sólido e Institucional */}
        <div
          style={{
            position: "relative",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            backgroundColor: "#171717",
            color: "#E8E4DC",
            border: "1px solid #333333",
            boxShadow: "var(--shadow-sm)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {/* Background Dark Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(90deg, rgba(23, 23, 23, 0.95) 0%, rgba(23, 23, 23, 0.88) 50%, rgba(23, 23, 23, 0.80) 100%), url('${featuredMatch.bannerImage}')`,
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
              padding: "clamp(1.75rem, 3vw, 2.75rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1.5rem",
            }}
          >
            <div>
              {/* Competition & Status Badges */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                <span className="badge badge-gold" style={{ fontSize: "0.72rem" }}>
                  {competition ? competition.name : "Girabola"} {competition?.season}
                </span>
                <span className="badge badge-neutral" style={{ fontSize: "0.72rem", backgroundColor: "#262626", borderColor: "#383838", color: "#A5A29C" }}>
                  {featuredMatch.round}
                </span>
                <span className="badge badge-green" style={{ fontSize: "0.72rem" }}>
                  <ShieldCheck size={12} />
                  <span>Bilheteira Aberta</span>
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3.2vw, 2.35rem)",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  marginBottom: "0.85rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {featuredMatch.title}
              </h2>

              <p style={{ color: "#A5A29C", fontSize: "0.92rem", lineHeight: 1.55, maxWidth: "560px", marginBottom: "1.5rem" }}>
                {featuredMatch.description}
              </p>

              {/* Meta strip: Date, Time, Venue */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  padding: "0.85rem 1.1rem",
                  backgroundColor: "#222222",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid #333333",
                  fontSize: "0.85rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Calendar size={16} color="var(--primary-red)" />
                  <span style={{ fontWeight: 600, color: "#E8E4DC" }}>{formatDatePt(featuredMatch.date)}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Clock size={16} color="var(--accent-gold)" />
                  <span style={{ fontWeight: 600, color: "#E8E4DC" }}>{featuredMatch.time}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <MapPin size={16} color="#A5A29C" />
                  <span style={{ color: "#A5A29C" }}>{stadium ? stadium.name : featuredMatch.province}</span>
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
                borderTop: "1px solid #2B2B2B",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", color: "#A5A29C", display: "block", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Preço a partir de
                </span>
                <span style={{ fontSize: "1.55rem", fontWeight: 900, color: "var(--accent-gold)" }}>
                  {formatKz(featuredMatch.startingPrice)}
                </span>
              </div>

              <Link
                to={`/jogos/${featuredMatch.id}`}
                className="btn btn-primary btn-lg"
                style={{ padding: "0.8rem 1.6rem" }}
              >
                <Ticket size={17} />
                <span>Comprar Bilhete</span>
                <ArrowRight size={17} />
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
              backgroundColor: "#1F1F1F",
              borderLeft: "1px solid #2B2B2B",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "360px",
                backgroundColor: "#171717",
                borderRadius: "var(--radius-lg)",
                border: "1px solid #333333",
                padding: "2rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
                textAlign: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
                
                {/* Home Club: Petro de Luanda */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.55rem" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "10px",
                      backgroundColor: featuredMatch.homeTeam.badgeColor || "#B08B42",
                      color: "#171717",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "1.2rem",
                      border: "1px solid #333333",
                    }}
                  >
                    {featuredMatch.homeTeam.badgeText}
                  </div>
                  <strong style={{ fontSize: "0.92rem", color: "#E8E4DC" }}>
                    {featuredMatch.homeTeam.shortName}
                  </strong>
                  <span style={{ fontSize: "0.72rem", color: "var(--accent-gold)" }}>
                    {featuredMatch.homeTeam.nickname}
                  </span>
                </div>

                {/* VS Badge */}
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    backgroundColor: "#262626",
                    color: "#E8E4DC",
                    border: "1px solid #3A3A3A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "0.82rem",
                  }}
                >
                  VS
                </div>

                {/* Away Club: 1.º de Agosto */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.55rem" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "10px",
                      backgroundColor: featuredMatch.awayTeam.badgeColor || "var(--primary-red)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "1.2rem",
                      border: "1px solid #333333",
                    }}
                  >
                    {featuredMatch.awayTeam.badgeText}
                  </div>
                  <strong style={{ fontSize: "0.92rem", color: "#E8E4DC" }}>
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
                  backgroundColor: "#222222",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid #2E2E2E",
                  fontSize: "0.78rem",
                  color: "#A5A29C",
                }}
              >
                Palco: <strong style={{ color: "#E8E4DC" }}>Estádio Nacional 11 de Novembro</strong>
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
