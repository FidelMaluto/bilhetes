import React from "react";
import { Users, ShieldCheck } from "lucide-react";
import { formatKz } from "../../data/sportsData";

const StadiumSectorMap = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-color)",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 800 }}>
            Mapa Interactivo de Sectores
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
            Clique num sector no mapa ou na lista abaixo para seleccionar a sua bancada.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--confirm-green)" }}>
          <ShieldCheck size={16} />
          <span>Assentos Certificados</span>
        </div>
      </div>

      {/* Visual SVG Stadium Stadium Representation */}
      <div
        style={{
          width: "100%",
          backgroundColor: "var(--bg-muted)",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem 1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 600 360"
          style={{ width: "100%", maxWidth: "540px", height: "auto" }}
        >
          {/* Outer Stadium Ellipse */}
          <ellipse
            cx="300"
            cy="180"
            rx="280"
            ry="165"
            fill="none"
            stroke="var(--border-color)"
            strokeWidth="3"
            strokeDasharray="6 4"
          />

          {/* Bancada Geral - Top / North Sector */}
          <path
            d="M 90,110 Q 300,20 510,110 L 460,135 Q 300,60 140,135 Z"
            fill={selectedCategory === "geral" ? "var(--primary-red)" : "rgba(214, 40, 40, 0.25)"}
            stroke="var(--primary-red)"
            strokeWidth="2"
            style={{ cursor: "pointer", transition: "all 0.2s" }}
            onClick={() => onSelectCategory("geral")}
          >
            <title>Bancada Geral Norte</title>
          </path>
          <text x="300" y="85" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            BANCADA GERAL NORTE
          </text>

          {/* Bancada Central - Left / West */}
          <path
            d="M 60,130 Q 35,180 60,230 L 120,215 Q 105,180 120,145 Z"
            fill={selectedCategory === "central" ? "var(--accent-gold)" : "rgba(244, 185, 66, 0.3)"}
            stroke="var(--accent-gold)"
            strokeWidth="2"
            style={{ cursor: "pointer", transition: "all 0.2s" }}
            onClick={() => onSelectCategory("central")}
          >
            <title>Bancada Central Poente</title>
          </path>
          <text x="75" y="185" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="700" transform="rotate(-90 75,185)">
            CENTRAL POENTE
          </text>

          {/* Bancada Central - Right / East */}
          <path
            d="M 540,130 Q 565,180 540,230 L 480,215 Q 495,180 480,145 Z"
            fill={selectedCategory === "central" ? "var(--accent-gold)" : "rgba(244, 185, 66, 0.3)"}
            stroke="var(--accent-gold)"
            strokeWidth="2"
            style={{ cursor: "pointer", transition: "all 0.2s" }}
            onClick={() => onSelectCategory("central")}
          >
            <title>Bancada Central Nascente</title>
          </path>
          <text x="525" y="185" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="700" transform="rotate(90 525,185)">
            CENTRAL NASCENTE
          </text>

          {/* Bancada VIP / Camarote - Bottom / South */}
          <path
            d="M 140,225 Q 300,300 460,225 L 510,250 Q 300,340 90,250 Z"
            fill={selectedCategory === "vip" ? "var(--confirm-green)" : "rgba(33, 139, 82, 0.3)"}
            stroke="var(--confirm-green)"
            strokeWidth="2"
            style={{ cursor: "pointer", transition: "all 0.2s" }}
            onClick={() => onSelectCategory("vip")}
          >
            <title>Bancada VIP Sul / Camarotes</title>
          </path>
          <text x="300" y="295" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            SECTOR VIP / TRIBUNA DE HONRA
          </text>

          {/* Pitch / Arena Field */}
          <rect
            x="150"
            y="125"
            width="300"
            height="110"
            rx="12"
            fill="#2D6A4F"
            stroke="#52B788"
            strokeWidth="2"
          />
          {/* Halfway line */}
          <line x1="300" y1="125" x2="300" y2="235" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
          {/* Center circle */}
          <circle cx="300" cy="180" r="30" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
          {/* Penalty boxes */}
          <rect x="150" y="145" width="40" height="70" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
          <rect x="410" y="145" width="40" height="70" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
          
          <text x="300" y="184" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800" opacity="0.9">
            CAMPO DE JOGO
          </text>
        </svg>
      </div>

      {/* Legend & Sector Selector Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                padding: "0.85rem",
                borderRadius: "var(--radius-md)",
                border: isSelected ? "2px solid var(--primary-red)" : "1.5px solid var(--border-color)",
                backgroundColor: isSelected ? "var(--primary-red-light)" : "var(--bg-surface)",
                cursor: "pointer",
                transition: "all var(--transition-fast)",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: "0.9rem", color: isSelected ? "var(--primary-red)" : "var(--text-primary)" }}>
                  {cat.name}
                </span>
                <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--primary-red)" }}>
                  {formatKz(cat.price)}
                </span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.3 }}>
                {cat.description}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                <Users size={12} />
                <span>{cat.available} lugares disponíveis</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StadiumSectorMap;
