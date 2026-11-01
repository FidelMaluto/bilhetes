import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  ShoppingCart,
  Ticket,
  ShieldCheck,
  AlertCircle,
  Plus,
  Minus,
  ArrowLeft,
  Share2,
} from "lucide-react";
import {
  getMatchById,
  getCompetitionById,
  getStadiumById,
  formatKz,
  formatDatePt,
  MATCHES,
} from "../data/sportsData";
import StadiumSectorMap from "../components/matches/StadiumSectorMap";
import MatchCard from "../components/matches/MatchCard";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useToast } from "../context/ToastContext";

const MatchDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const match = getMatchById(id);

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState(
    match ? match.categories[0].id : "geral"
  );
  const [quantities, setQuantities] = useState(() => {
    if (!match) return {};
    const init = {};
    match.categories.forEach((cat) => {
      init[cat.id] = cat.id === match.categories[0].id ? 1 : 0;
    });
    return init;
  });

  if (!match) {
    return (
      <div className="container" style={{ padding: "5rem 1.25rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>Jogo não encontrado</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
          O evento que procura não existe ou já foi concluído.
        </p>
        <Link to="/jogos" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Voltar ao Calendário de Jogos</span>
        </Link>
      </div>
    );
  }

  const competition = getCompetitionById(match.competitionId);
  const stadium = getStadiumById(match.stadiumId);
  const favorite = isFavorite(match.id);

  const handleQuantityChange = (catId, delta) => {
    setQuantities((prev) => {
      const current = prev[catId] || 0;
      const next = Math.max(0, Math.min(10, current + delta));
      return { ...prev, [catId]: next };
    });
  };

  // Calculate current selection total
  const selectedItems = match.categories
    .filter((cat) => (quantities[cat.id] || 0) > 0)
    .map((cat) => ({
      ...cat,
      quantity: quantities[cat.id],
      total: cat.price * quantities[cat.id],
    }));

  const selectionTotal = selectedItems.reduce((acc, curr) => acc + curr.total, 0);
  const totalTickets = selectedItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleAddToCart = () => {
    if (totalTickets === 0) {
      showToast("Por favor, selecione pelo menos 1 bilhete.", "warning");
      return;
    }

    selectedItems.forEach((item) => {
      addToCart({
        matchId: match.id,
        matchTitle: match.title,
        matchDate: match.date,
        matchTime: match.time,
        stadiumName: stadium ? stadium.name : match.province,
        categoryId: item.id,
        categoryName: item.name,
        unitPrice: item.price,
        quantity: item.quantity,
        sector: item.sector,
      });
    });

    showToast(
      `${totalTickets} ${totalTickets === 1 ? "bilhete adicionado" : "bilhetes adicionados"} ao carrinho!`,
      "success"
    );
  };

  const handleBuyNow = () => {
    if (totalTickets === 0) {
      // Auto add 1 ticket of current category if 0
      addToCart({
        matchId: match.id,
        matchTitle: match.title,
        matchDate: match.date,
        matchTime: match.time,
        stadiumName: stadium ? stadium.name : match.province,
        categoryId: match.categories[0].id,
        categoryName: match.categories[0].name,
        unitPrice: match.categories[0].price,
        quantity: 1,
        sector: match.categories[0].sector,
      });
      navigate("/carrinho");
      return;
    }

    handleAddToCart();
    navigate("/carrinho");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: match.title,
        text: `Bilhetes para ${match.title} em Angola`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link do jogo copiado para a área de transferência!", "info");
    }
  };

  // Related matches
  const relatedMatches = MATCHES.filter(
    (m) => m.id !== match.id && (m.sportId === match.sportId || m.competitionId === match.competitionId)
  ).slice(0, 3);

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Top Breadcrumb & Actions Bar */}
      <div style={{ backgroundColor: "var(--bg-surface)", borderBottom: "1px solid var(--border-color)", padding: "0.85rem 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <Link
            to="/jogos"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.88rem", color: "var(--text-secondary)", fontWeight: 600 }}
          >
            <ArrowLeft size={16} />
            <span>Voltar a todos os jogos</span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              onClick={() => toggleFavorite(match.id)}
              className="btn btn-secondary btn-sm"
              style={{ color: favorite ? "var(--primary-red)" : "inherit" }}
            >
              <Heart size={16} fill={favorite ? "var(--primary-red)" : "transparent"} />
              <span>{favorite ? "Favorito" : "Guardar"}</span>
            </button>
            <button onClick={handleShare} className="btn btn-secondary btn-sm">
              <Share2 size={16} />
              <span>Partilhar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Match Header Hero Banner */}
      <section
        style={{
          position: "relative",
          backgroundColor: "var(--inst-black)",
          color: "#FFFFFF",
          padding: "3.5rem 0 3rem",
          backgroundImage: `linear-gradient(180deg, rgba(16,17,20,0.85) 0%, rgba(16,17,20,0.96) 100%), url('${match.bannerImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "900px" }}>
            
            {/* Badges */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
              <span className="badge badge-gold" style={{ fontSize: "0.78rem" }}>
                {competition ? competition.name : "Competição"}
              </span>
              <span className="badge badge-neutral" style={{ fontSize: "0.78rem" }}>
                {match.round}
              </span>
              <span className="badge badge-green" style={{ fontSize: "0.78rem" }}>
                {match.status}
              </span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: "clamp(1.9rem, 4.5vw, 3rem)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.15 }}>
              {match.title}
            </h1>

            {/* Details strip */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
                padding: "1rem 1.25rem",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderRadius: "var(--radius-md)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "0.92rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Calendar size={18} color="var(--primary-red)" />
                <span style={{ fontWeight: 600 }}>{formatDatePt(match.date)}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Clock size={18} color="var(--accent-gold)" />
                <span style={{ fontWeight: 600 }}>{match.time} (Hora de Luanda)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <MapPin size={18} color="var(--confirm-green)" />
                <span>{stadium ? `${stadium.name} (${stadium.city})` : match.province}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ marginTop: "2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
          
          {/* Left Column: Visual Map & Ticket Category Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Visual Sector Map Component */}
            <StadiumSectorMap
              categories={match.categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                // Also bump quantity to at least 1 if 0
                if (!quantities[catId]) {
                  setQuantities((prev) => ({ ...prev, [catId]: 1 }));
                }
              }}
            />

            {/* Categories Selection List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>
                  Categorias de Bilhetes Disponíveis
                </h3>
                <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                  Máximo de 10 bilhetes por categoria
                </span>
              </div>

              {match.categories.map((cat) => {
                const qty = quantities[cat.id] || 0;
                const isSelected = selectedCategory === cat.id;

                return (
                  <div
                    key={cat.id}
                    className="card"
                    style={{
                      padding: "1.25rem",
                      border: isSelected ? "2px solid var(--primary-red)" : "1.5px solid var(--border-color)",
                      backgroundColor: "var(--bg-surface)",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      transition: "border-color 0.2s",
                    }}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <div style={{ flex: 1, minWidth: "220px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        <h4 style={{ fontSize: "1.05rem", fontWeight: 700 }}>{cat.name}</h4>
                        {cat.id === "estudante" && (
                          <span className="badge badge-gold" style={{ fontSize: "0.68rem" }}>
                            Comprovativo Escolar
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                        {cat.description}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        <MapPin size={13} />
                        <span>{cat.sector}</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary-red)" }}>
                          {formatKz(cat.price)}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                          por bilhete
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "var(--bg-muted)",
                          borderRadius: "var(--radius-md)",
                          padding: "0.25rem",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleQuantityChange(cat.id, -1)}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "var(--bg-surface)",
                            color: "var(--text-primary)",
                          }}
                          disabled={qty <= 0}
                          aria-label="Diminuir quantidade"
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ width: "36px", textAlign: "center", fontWeight: 700, fontSize: "0.95rem" }}>
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(cat.id, 1)}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "var(--primary-red)",
                            color: "#FFFFFF",
                          }}
                          disabled={qty >= 10}
                          aria-label="Aumentar quantidade"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stadium Information Card */}
            {stadium && (
              <div
                className="card"
                style={{
                  padding: "1.5rem",
                  backgroundColor: "var(--bg-surface)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800 }}>
                  Sobre o Recinto: {stadium.name}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {stadium.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                  <div><strong>Capacidade:</strong> {stadium.capacity.toLocaleString()} lugares</div>
                  <div><strong>Piso:</strong> {stadium.surface}</div>
                  <div><strong>Localização:</strong> {stadium.location}</div>
                </div>
              </div>
            )}

            {/* Entry Guidelines & Security Rules */}
            <div
              style={{
                backgroundColor: "var(--bg-surface-elevated)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-color)",
                padding: "1.5rem",
              }}
            >
              <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <AlertCircle size={18} color="var(--accent-gold)" />
                <span>Normas de Acesso ao Recinto Desportivo</span>
              </h4>
              <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <li>A abertura das portas do estádio ocorre habitualmente <strong>3 horas antes</strong> do início oficial da partida.</li>
                <li>É obrigatória a apresentação do bilhete digital no smartphone com o código QR legível ou impresso em formato físico.</li>
                <li>Proibida a entrada com recipientes de vidro, objectos pontiagudos, artefactos pirotécnicos ou materiais inflamáveis.</li>
                <li>Menores de idade devem estar acompanhados por um encarregado de educação ou responsável legal.</li>
              </ul>
            </div>

          </div>

          {/* Right Column: Order Summary Floating Box */}
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>Resumo da Selecção</h3>
                <span className="badge badge-gold">{totalTickets} {totalTickets === 1 ? "Bilhete" : "Bilhetes"}</span>
              </div>

              {/* Items in current selection */}
              {selectedItems.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {selectedItems.map((item) => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{item.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                          {item.quantity}x {formatKz(item.price)}
                        </div>
                      </div>
                      <div style={{ fontWeight: 800, color: "var(--primary-red)" }}>
                        {formatKz(item.total)}
                      </div>
                    </div>
                  ))}

                  <div style={{ borderTop: "1px dashed var(--border-color)", paddingTop: "0.85rem", marginTop: "0.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.15rem", fontWeight: 900 }}>
                      <span>Subtotal:</span>
                      <span style={{ color: "var(--primary-red)" }}>{formatKz(selectionTotal)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "1.5rem 0", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  <Ticket size={36} color="var(--text-muted)" style={{ margin: "0 auto 0.75rem", opacity: 0.5 }} />
                  <p>Nenhum bilhete seleccionado ainda.</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
                    Escolha a quantidade nas opções ao lado.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  onClick={handleAddToCart}
                  disabled={totalTickets === 0}
                  className="btn btn-secondary"
                  style={{ width: "100%", opacity: totalTickets === 0 ? 0.6 : 1 }}
                >
                  <ShoppingCart size={18} />
                  <span>Adicionar ao Carrinho</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "0.9rem" }}
                >
                  <Ticket size={18} />
                  <span>Comprar Bilhete Agora</span>
                </button>
              </div>

              {/* Secure Notice */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--confirm-green)", marginTop: "0.5rem" }}>
                <ShieldCheck size={16} />
                <span>Simulação 100% Segura e Oficial</span>
              </div>
            </div>
          </div>

        </div>

        {/* Related Matches Section */}
        {relatedMatches.length > 0 && (
          <div style={{ marginTop: "4.5rem" }}>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: "1.5rem" }}>
              Outros Jogos Recomendados
            </h3>
            <div className="grid-matches">
              {relatedMatches.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MatchDetailPage;
