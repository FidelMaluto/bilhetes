import React from "react";
import { useParams, Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {
  CheckCircle2,
  Printer,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  User,
  Ticket,
  ArrowRight
} from "lucide-react";
import { useOrders } from "../context/OrdersContext";
import { formatKz, formatDatePt } from "../data/sportsData";

const ConfirmationPage = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="container" style={{ padding: "5rem 1.25rem", textAlign: "center" }}>
        <h2>Encomenda não encontrada</h2>
        <p style={{ color: "var(--text-secondary)", margin: "1rem 0 2rem" }}>
          Não foi possível encontrar a encomenda solicitada.
        </p>
        <Link to="/jogos" className="btn btn-primary">
          Voltar aos Jogos
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        
        {/* Success Header (Hidden in Print) */}
        <div className="no-print" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "var(--confirm-green-light)",
              color: "var(--confirm-green)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              border: "1px solid rgba(43, 122, 75, 0.25)",
            }}
          >
            <CheckCircle2 size={42} />
          </div>

          <span className="badge badge-green" style={{ marginBottom: "0.5rem" }}>
            COMPRA SIMULADA CONFIRMADA
          </span>
          <h1 className="title-section" style={{ marginBottom: "0.5rem" }}>
            O teu Bilhete Digital está Pronto!
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Agradecemos a tua preferência. Apresenta o código QR nos torniquetes de entrada do estádio.
          </p>

          {/* Top Actions */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <button onClick={handlePrint} className="btn btn-primary">
              <Printer size={18} />
              <span>Imprimir / Salvar em PDF</span>
            </button>
            <Link to="/meus-bilhetes" className="btn btn-secondary">
              <Ticket size={18} />
              <span>Ver Meus Bilhetes</span>
            </Link>
          </div>
        </div>

        {/* Digital Ticket Stubs Representation */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {order.items.map((item, index) => (
            <div
              key={`${item.matchId}-${index}`}
              className="ticket-stub"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "2px solid var(--border-color)",
                borderRadius: "var(--radius-xl)",
              }}
            >
              {/* Top Angola Ticket Header Strip */}
              <div
                style={{
                  backgroundColor: "var(--inst-black)",
                  color: "#FFFFFF",
                  padding: "1rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "3px solid var(--primary-red)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      backgroundColor: "var(--primary-red)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                    }}
                  >
                    <Ticket size={16} />
                  </div>
                  <span style={{ fontWeight: 900, fontSize: "1.05rem", letterSpacing: "-0.02em" }}>
                    ANGOLA <span style={{ color: "var(--primary-red)" }}>TICKETS</span>
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span className="badge badge-gold" style={{ fontSize: "0.72rem" }}>
                    BILHETE DIGITAL OFICIAL
                  </span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#9DA4B2" }}>
                    #{order.orderNumber}
                  </span>
                </div>
              </div>

              {/* Main Ticket Information Body */}
              <div style={{ padding: "1.75rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.75rem", alignItems: "center" }}>
                
                {/* Left: Match & Event Information */}
                <div>
                  <span className="badge badge-red" style={{ marginBottom: "0.5rem" }}>
                    {item.categoryName}
                  </span>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "0.85rem", lineHeight: 1.2 }}>
                    {item.matchTitle}
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Calendar size={16} color="var(--primary-red)" />
                      <strong style={{ color: "var(--text-primary)" }}>{formatDatePt(item.matchDate)}</strong>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Clock size={16} color="var(--accent-gold)" />
                      <span>{item.matchTime} (Portas abrem 3h antes)</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <MapPin size={16} color="var(--confirm-green)" />
                      <span>{item.stadiumName}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <User size={16} color="var(--text-secondary)" />
                      <span>Titular: <strong>{order.customer.fullName}</strong></span>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--bg-muted)",
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.82rem",
                    }}
                  >
                    <div>Sector / Porta: <strong>{item.sector}</strong></div>
                    <div style={{ marginTop: "0.25rem" }}>Quantidade de Entradas: <strong>{item.quantity} Pessoa(s)</strong></div>
                  </div>
                </div>

                {/* Right: QR Code & Verification Data */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1.25rem",
                    backgroundColor: "var(--bg-muted)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px dashed var(--border-color)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      padding: "0.75rem",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      marginBottom: "0.85rem",
                    }}
                  >
                    <QRCodeSVG
                      value={order.qrCodeValue || `AST-${order.id}`}
                      size={160}
                      level="H"
                      includeMargin={false}
                    />
                  </div>

                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                    Código de Acesso aos Torniquetes
                  </span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 900, fontFamily: "monospace", letterSpacing: "0.1em" }}>
                    {order.orderNumber}
                  </span>

                  {/* Simulated barcode lines */}
                  <div style={{ display: "flex", gap: "3px", height: "24px", alignItems: "center", marginTop: "0.75rem", opacity: 0.7 }}>
                    {[6, 2, 8, 4, 10, 3, 7, 5, 2, 9, 4, 8, 2, 6, 3, 7, 4, 9, 3, 5, 2, 8].map((h, i) => (
                      <div key={i} style={{ width: "3px", height: `${h * 2.2}px`, backgroundColor: "var(--text-primary)" }} />
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom security watermark bar */}
              <div
                style={{
                  padding: "0.6rem 1.5rem",
                  backgroundColor: "var(--bg-muted)",
                  borderTop: "1px solid var(--border-color)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ShieldCheck size={14} color="var(--confirm-green)" />
                  <span>Bilhete Oficial Autenticado digitalmente pela plataforma Angola Sports Tickets</span>
                </div>
                <span>Preço: {formatKz(item.quantity * item.unitPrice)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation Buttons (Hidden in Print) */}
        <div className="no-print" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <Link to="/" className="btn btn-secondary">
            <span>Voltar à Página Inicial</span>
          </Link>
          <Link to="/jogos" className="btn btn-primary">
            <span>Explorar Outros Jogos</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ConfirmationPage;
