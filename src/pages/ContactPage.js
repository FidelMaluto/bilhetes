import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";
import { useToast } from "../context/ToastContext";

const faqs = [
  {
    question: "Como recebo o meu bilhete após a confirmação?",
    answer:
      "O bilhete digital é gerado imediatamente na página de confirmação da plataforma com um código QR único. Fica igualmente guardado na secção 'Meus Bilhetes' no seu navegador e pode ser descarregado em formato PDF ou impresso.",
  },
  {
    question: "Preciso de imprimir o bilhete para entrar no estádio?",
    answer:
      "Não é obrigatório imprimir. Pode apresentar o código QR directamente no ecrã do seu telemóvel nos leitores ópticos dos torniquetes de entrada do Estádio 11 de Novembro, Coqueiros, Kilamba ou qualquer outro recinto oficial.",
  },
  {
    question: "Os preços e bilhetes são reais?",
    answer:
      "Esta aplicação web é um protótipo demonstrativo oficial de front-end. Nenhum valor monetário real é cobrado e os bilhetes gerados destinam-se exclusivamente à demonstração e teste da experiência de utilizador.",
  },
  {
    question: "Com que antecedência devo chegar ao recinto desportivo?",
    answer:
      "Recomendamos a chegada com pelo menos 2 a 3 horas de antecedência em relação ao apito inicial, especialmente nos jogos de grande procura e nos clássicos (como Petro de Luanda vs 1.º de Agosto), de modo a evitar filas nos portões.",
  },
  {
    question: "Quais os métodos de pagamento simulados disponíveis?",
    answer:
      "A plataforma simula pagamentos através da rede Multicaixa Express (notificação telemóvel), Pagamento por Referência Multicaixa (entidade e referência) e Transferência Bancária imediata.",
  },
];

const ContactPage = () => {
  const { showToast } = useToast();
  const [openFaq, setOpenFaq] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "informacoes",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast("Por favor, preencha todos os campos obrigatórios.", "warning");
      return;
    }
    setSubmitted(true);
    showToast("A sua mensagem foi enviada com sucesso! Responderemos em breve.", "success");
    setFormData({ name: "", email: "", phone: "", subject: "informacoes", message: "" });
  };

  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: "3rem", textAlign: "center", maxWidth: "680px", margin: "0 auto 3rem" }}>
          <span className="badge badge-gold" style={{ marginBottom: "0.5rem" }}>
            APOIO AO ADEPTO
          </span>
          <h1 className="title-section" style={{ marginBottom: "0.6rem" }}>
            Fale Connosco & Perguntas Frequentes
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Tem dúvidas sobre o processo de aquisição de bilhetes, acesso aos estádios ou regulamentos desportivos? Estamos aqui para ajudar.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem", marginBottom: "4rem" }}>
          
          {/* Left: Contact Info Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div
              className="card"
              style={{
                padding: "1.75rem",
                backgroundColor: "var(--bg-surface)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                Canais de Atendimento
              </h3>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "var(--primary-red-light)",
                    color: "var(--primary-red)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Sede Operacional em Luanda</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Complexo Desportivo da Cidadela / Rua Comandante Gika, Luanda, Angola
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "var(--accent-gold-light)",
                    color: "#B45309",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Linha de Apoio Telefónico</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    +244 923 000 000 / +244 912 000 000
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "var(--confirm-green-light)",
                    color: "var(--confirm-green)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Correio Electrónico</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    suporte@angolatickets.ao
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "var(--bg-muted)",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Clock size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Horário de Suporte</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Segunda a Sábado: 08h00 - 20h00
                    <br />
                    Dias de Jogos: Activo até 2h após o apito final
                  </div>
                </div>
              </div>
            </div>

            {/* Quality assurance box */}
            <div
              style={{
                padding: "1.25rem",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "var(--bg-surface-elevated)",
                border: "1px solid var(--border-color)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <ShieldCheck size={24} color="var(--confirm-green)" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Plataforma com validação digital em conformidade com as federações desportivas angolanas.
              </span>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div
            className="card"
            style={{
              padding: "2rem",
              backgroundColor: "var(--bg-surface)",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              Enviar Mensagem
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Preencha o formulário abaixo para dúvidas, apoio ou esclarecimentos de bilhética.
            </p>

            {submitted && (
              <div
                style={{
                  backgroundColor: "var(--confirm-green-light)",
                  border: "1px solid var(--confirm-green)",
                  color: "var(--confirm-green)",
                  padding: "1rem",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                <CheckCircle2 size={18} />
                <span>Obrigado! A sua mensagem foi enviada. Responderemos em menos de 24 horas.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome"
                  className="form-control"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">E-mail *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu.email@exemplo.ao"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Telemóvel</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+244 923 000 000"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Assunto</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-control"
                >
                  <option value="informacoes">Informações sobre Jogos</option>
                  <option value="bilhetes">Dúvidas sobre Bilhetes Digitais</option>
                  <option value="recintos">Acessibilidade de Estádios</option>
                  <option value="parcerias">Clubes e Associações Desportivas</option>
                  <option value="outro">Outro Assunto</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Mensagem *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escreva a sua mensagem detalhada..."
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                <Send size={16} />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              Perguntas Frequentes
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
              Respostas às principais dúvidas sobre o portal Angola Sports Tickets.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="card"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    overflow: "hidden",
                    border: isOpen ? "1.5px solid var(--primary-red)" : "1px solid var(--border-color)",
                    transition: "border-color 0.2s",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: "100%",
                      padding: "1.1rem 1.4rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textAlign: "left",
                      color: "var(--text-primary)",
                      fontWeight: 700,
                      fontSize: "1rem",
                      backgroundColor: "var(--bg-surface)",
                    }}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={20} color="var(--primary-red)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: "0 1.4rem 1.25rem",
                        color: "var(--text-secondary)",
                        fontSize: "0.92rem",
                        lineHeight: 1.6,
                        borderTop: "1px solid var(--border-color)",
                        paddingTop: "1rem",
                      }}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
