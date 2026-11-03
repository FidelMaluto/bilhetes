import React from "react";
import { Search, Ticket, CheckSquare, QrCode } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Escolhe o evento",
    description: "Navega pelos jogos do Girabola, Unitel Basket, Taça de Angola ou filtra pela tua modalidade e estádio favorito.",
    icon: Search,
    color: "var(--primary-red)",
  },
  {
    step: "02",
    title: "Selecciona o sector",
    description: "Consulta as categorias disponíveis: Bancada Geral, Central, VIP ou Camarote com vista privilegiada para o espectáculo.",
    icon: Ticket,
    color: "var(--accent-gold)",
  },
  {
    step: "03",
    title: "Confirma os dados da compra",
    description: "Revisa o teu carrinho e simula o pagamento através de Multicaixa Express ou Pagamento por Referência sem complicação.",
    icon: CheckSquare,
    color: "var(--primary-red)",
  },
  {
    step: "04",
    title: "Recebe o teu bilhete digital",
    description: "O teu bilhete digital oficial é gerado imediatamente com QR Code exclusivo para entrada directa e rápida nos torniquetes.",
    icon: QrCode,
    color: "var(--accent-gold)",
  },
];

const HowItWorks = () => {
  return (
    <section style={{ padding: "4rem 0", backgroundColor: "var(--bg-main)" }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 2.75rem" }}>
          <span className="badge badge-gold" style={{ marginBottom: "0.6rem" }}>
            PROCESSO SIMPLES & INSTITUCIONAL
          </span>
          <h2 className="title-section" style={{ marginBottom: "0.6rem" }}>
            Como funciona a compra de bilhetes?
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Em 4 passos simples, garante o teu lugar nas bancadas para apoiar os clubes e atletas de Angola.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="card"
                style={{
                  padding: "1.6rem 1.3rem",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                  borderTop: `3px solid ${item.color}`,
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "8px",
                      backgroundColor: "var(--bg-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: item.color,
                    }}
                  >
                    <Icon size={22} color={item.color} />
                  </div>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 900,
                      color: "var(--text-muted)",
                      opacity: 0.6,
                    }}
                  >
                    {item.step}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
