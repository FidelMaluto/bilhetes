import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  AlertTriangle,
  Lock,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { useToast } from "../context/ToastContext";
import { formatKz, PROVINCES } from "../data/sportsData";

const CheckoutPage = () => {
  const { items, subtotal, serviceFee, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "9",
    province: "Luanda",
    nif: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("express"); // "express" | "referencia" | "transferencia"
  const [expressPhone, setExpressPhone] = useState("923 456 789");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: "5rem 1.25rem", textAlign: "center" }}>
        <h2>Não existem bilhetes para finalizar</h2>
        <p style={{ color: "var(--text-secondary)", margin: "1rem 0 2rem" }}>
          O teu carrinho está vazio. Escolhe os jogos primeiro.
        </p>
        <Link to="/jogos" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Ver Jogos Disponíveis</span>
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      showToast("Por favor, preencha todos os campos obrigatórios.", "error");
      return;
    }

    // Start simulation animation
    setIsProcessing(true);
    setProcessingStep("A contactar o servidor seguro da EMIS / Multicaixa Express...");

    setTimeout(() => {
      setProcessingStep("A emitir autorização de bilhética desportiva...");
    }, 1200);

    setTimeout(() => {
      setProcessingStep("A gerar bilhetes digitais com QR Code único...");
    }, 2400);

    setTimeout(() => {
      // Build order object
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const orderId = `AST-2026-${randomSuffix}`;

      const newOrder = {
        id: orderId,
        orderNumber: orderId,
        createdAt: new Date().toISOString(),
        customer: { ...formData },
        items: [...items],
        subtotal,
        serviceFee,
        total,
        paymentMethod:
          paymentMethod === "express"
            ? "Multicaixa Express"
            : paymentMethod === "referencia"
            ? "Pagamento por Referência Multicaixa"
            : "Transferência Bancária Imediata",
        paymentStatus: "Confirmado com Sucesso (Simulado)",
        qrCodeValue: `ANGOLA-TICKETS-VERIFIED-${orderId}-${Date.now()}`,
      };

      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      showToast("Compra simulada concluída com sucesso!", "success");
      navigate(`/confirmacao/${orderId}`);
    }, 3600);
  };

  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <Link
            to="/carrinho"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "0.75rem" }}
          >
            <ArrowLeft size={16} />
            <span>Voltar ao Carrinho</span>
          </Link>
          <h1 className="title-section">
            Checkout & Emissão de Bilhetes
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Preencha os dados do titular e conclua a simulação de pagamento nacional.
          </p>
        </div>

        {/* Clear Disclaimer Banner Required by Rules */}
        <div
          style={{
            backgroundColor: "rgba(244, 185, 66, 0.15)",
            border: "1.5px solid var(--accent-gold)",
            borderRadius: "var(--radius-lg)",
            padding: "1rem 1.25rem",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.85rem",
          }}
        >
          <AlertTriangle size={22} color="#D97706" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <strong style={{ display: "block", color: "var(--text-primary)", fontSize: "0.95rem", marginBottom: "0.2rem" }}>
              Ambiente de Demonstração Front-End
            </strong>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
              Esta plataforma é exclusivamente destinada à demonstração front-end. <strong>Nenhum valor monetário real será debitado</strong> da sua conta bancária ou cartão Multicaixa Express. Os dados e referências gerados são estritamente simulados.
            </p>
          </div>
        </div>

        {/* Form and Summary Grid */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
            
            {/* Left: Inputs & Payment Simulation */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              
              {/* Step 1: Customer Details */}
              <div
                className="card"
                style={{
                  padding: "1.75rem",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary-red)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                    }}
                  >
                    1
                  </span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                    Dados do Titular dos Bilhetes
                  </h3>
                </div>

                <div className="form-group">
                  <label className="form-label">Nome Completo *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Ex: Manuel António Bernardo"
                    required
                    className="form-control"
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">E-mail para envio do bilhete *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu.email@exemplo.ao"
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Telemóvel (WhatsApp / SMS) *</label>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <span
                        style={{
                          backgroundColor: "var(--bg-muted)",
                          padding: "0.75rem 0.85rem",
                          borderRadius: "var(--radius-md)",
                          fontSize: "0.95rem",
                          fontWeight: 600,
                          border: "1.5px solid var(--border-color)",
                        }}
                      >
                        +244
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="923 456 789"
                        required
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Província de Residência</label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      {PROVINCES.filter((p) => p !== "Todas as Províncias").map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">NIF (Opcional para recibo)</label>
                    <input
                      type="text"
                      name="nif"
                      value={formData.nif}
                      onChange={handleInputChange}
                      placeholder="Ex: 005928172LA041"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Simulation Methods */}
              <div
                className="card"
                style={{
                  padding: "1.75rem",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "var(--accent-gold)",
                      color: "var(--inst-black)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                    }}
                  >
                    2
                  </span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                    Método de Pagamento Simulado
                  </h3>
                </div>

                {/* Option 1: Multicaixa Express */}
                <div
                  onClick={() => setPaymentMethod("express")}
                  style={{
                    padding: "1rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    border: paymentMethod === "express" ? "2px solid var(--primary-red)" : "1.5px solid var(--border-color)",
                    backgroundColor: paymentMethod === "express" ? "var(--primary-red-light)" : "var(--bg-surface)",
                    cursor: "pointer",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <Smartphone size={24} color="var(--primary-red)" />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "1rem" }}>Multicaixa Express</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        Notificação instantânea para autorização na aplicação móvel
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "express"}
                    onChange={() => setPaymentMethod("express")}
                  />
                </div>

                {paymentMethod === "express" && (
                  <div style={{ backgroundColor: "var(--bg-muted)", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.25rem" }}>
                    <label className="form-label" style={{ fontSize: "0.82rem" }}>
                      Número de Telemóvel associado ao Multicaixa Express:
                    </label>
                    <input
                      type="text"
                      value={expressPhone}
                      onChange={(e) => setExpressPhone(e.target.value)}
                      className="form-control"
                      placeholder="923 000 000"
                    />
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.4rem", display: "block" }}>
                      Irá receber um pedido de validação demonstrativo de {formatKz(total)}.
                    </span>
                  </div>
                )}

                {/* Option 2: Referência Multicaixa */}
                <div
                  onClick={() => setPaymentMethod("referencia")}
                  style={{
                    padding: "1rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    border: paymentMethod === "referencia" ? "2px solid var(--primary-red)" : "1.5px solid var(--border-color)",
                    backgroundColor: paymentMethod === "referencia" ? "var(--primary-red-light)" : "var(--bg-surface)",
                    cursor: "pointer",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <CreditCard size={24} color="var(--accent-gold)" />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "1rem" }}>Pagamento por Referência Multicaixa</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        Pagamento no ATM, internet banking ou app do seu banco
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "referencia"}
                    onChange={() => setPaymentMethod("referencia")}
                  />
                </div>

                {paymentMethod === "referencia" && (
                  <div style={{ backgroundColor: "var(--bg-muted)", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.25rem", fontSize: "0.88rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                      <span>Entidade:</span>
                      <strong>00124 (Bilhetes Angola)</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                      <span>Referência Simulada:</span>
                      <strong>924 812 045</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Montante:</span>
                      <strong style={{ color: "var(--primary-red)" }}>{formatKz(total)}</strong>
                    </div>
                  </div>
                )}

                {/* Option 3: Transferência Bancária */}
                <div
                  onClick={() => setPaymentMethod("transferencia")}
                  style={{
                    padding: "1rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    border: paymentMethod === "transferencia" ? "2px solid var(--primary-red)" : "1.5px solid var(--border-color)",
                    backgroundColor: paymentMethod === "transferencia" ? "var(--primary-red-light)" : "var(--bg-surface)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <Building size={24} color="var(--confirm-green)" />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "1rem" }}>Transferência Bancária Directa</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        Confirmação simulada imediata com IBAN nacional
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "transferencia"}
                    onChange={() => setPaymentMethod("transferencia")}
                  />
                </div>
              </div>

            </div>

            {/* Right: Order Summary Sticky Card */}
            <div style={{ position: "sticky", top: "90px" }}>
              <div
                className="card"
                style={{
                  padding: "1.75rem",
                  backgroundColor: "var(--bg-surface)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                  Resumo da Compra
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.88rem" }}>
                  {items.map((it) => (
                    <div key={`${it.matchId}-${it.categoryId}`} style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <strong>{it.quantity}x {it.categoryName}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                          {it.matchTitle}
                        </div>
                      </div>
                      <span style={{ fontWeight: 700 }}>{formatKz(it.quantity * it.unitPrice)}</span>
                    </div>
                  ))}

                  <div style={{ borderTop: "1px dashed var(--border-color)", paddingTop: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                      <span>Subtotal:</span>
                      <span>{formatKz(subtotal)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", marginTop: "0.3rem" }}>
                      <span>Taxa de Emissão Digital:</span>
                      <span>{formatKz(serviceFee)}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid var(--border-color)",
                      fontSize: "1.3rem",
                      fontWeight: 900,
                    }}
                  >
                    <span>Total:</span>
                    <span style={{ color: "var(--primary-red)" }}>{formatKz(total)}</span>
                  </div>
                </div>

                {/* Submit simulated checkout button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%", marginTop: "0.5rem" }}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>A Processar Simulação...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      <span>Confirmar e Gerar Bilhete Digital</span>
                    </>
                  )}
                </button>

                {isProcessing && (
                  <div style={{ textAlign: "center", fontSize: "0.82rem", color: "var(--accent-gold)", fontWeight: 600 }}>
                    {processingStep}
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--confirm-green)" }}>
                  <ShieldCheck size={16} />
                  <span>Bilhetes Oficiais Emitidos com Código QR</span>
                </div>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};

export default CheckoutPage;
