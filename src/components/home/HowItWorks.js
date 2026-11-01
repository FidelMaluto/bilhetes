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
    title: "Selecciona o tipo de bilhete",
    description: "Consulta as categorias disponíveis: Bancada Geral, Central, VIP ou Camarote com vista privilegiada para o espectáculo.",
    icon: Ticket,
    color: "var(--accent-gold)",
  },
  {
    step: "03",
    title: "Confirma os dados da compra",
    description: "Revisa o teu carrinho e simula o pagamento através de Multicaixa Express ou Pagamento por Referência sem complicação.",
    icon: CheckSquare,
    color: "var(--confirm-green)",
  },
  {
    step: "04",
    title: "Recebe o teu bilhete digital",
    description: "O teu bilhete digital oficial é gerado imediatamente com QR Code exclusivo para entrada directa e rápida nos torniquetes.",
    icon: QrCode,
    color: "var(--primary-red)",
  },
];

const HowItWorks = () => {
  return (
    <section style={{ padding: "4.5rem 0", backgroundColor: "var(--bg-main)" }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 3rem" }}>
          <span className="badge badge-gold" style={{ marginBottom: "0.75rem" }}>
            PROCESSO SIMPLES & INTUITIVO
          </span>
          <h2 className="title-section" style={{ marginBottom: "0.75rem" }}>
            Como funciona a compra de bilhetes?
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Em apenas 4 passos rápidos, garante o teu lugar nas bancadas para apoiar as cores do teu clube em Angola.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="card"
                style={{
                  padding: "1.75rem 1.4rem",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  borderTop: `4px solid ${item.color}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      backgroundColor: "var(--bg-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: item.color,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <span
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: 900,
                      color: "var(--text-muted)",
                      opacity: 0.5,
                    }}
                  >
                    {item.step}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
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
