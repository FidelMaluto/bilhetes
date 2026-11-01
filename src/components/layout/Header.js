import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Ticket,
  Search,
  ShoppingCart,
  Heart,
  User,
  Sun,
  Moon,
  Menu,
  X,
  Compass,
  Trophy,
  Shield,
  Layers
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const { favorites } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jogos?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Início", path: "/" },
    { label: "Jogos", path: "/jogos" },
    { label: "Modalidades", path: "/modalidades" },
    { label: "Competições", path: "/competicoes" },
    { label: "Estádios", path: "/estadios" },
  ];

  return (
    <>
      {/* Top Angola Flag Ribbon */}
      <div className="angola-stripe-top" />

      {/* Main Sticky Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "var(--bg-surface)",
          borderBottom: "1px solid var(--border-color)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "background-color var(--transition-base), border-color var(--transition-base)",
        }}
      >
        <div className="container-wide" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                backgroundColor: "var(--primary-red)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                boxShadow: "0 4px 12px rgba(214, 40, 40, 0.35)",
                position: "relative",
              }}
            >
              <Ticket size={24} />
              <span
                style={{
                  position: "absolute",
                  bottom: "-3px",
                  right: "-3px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-gold)",
                  border: "2px solid var(--bg-surface)",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{ fontSize: "1.2rem", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
                  ANGOLA
                </span>
                <span style={{ fontSize: "1.2rem", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--primary-red)" }}>
                  TICKETS
                </span>
              </div>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                Bilhética Desportiva
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "none", alignItems: "center", gap: "1.75rem" }} className="desktop-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  fontSize: "0.95rem",
                  fontWeight: isActive ? "700" : "500",
                  color: isActive ? "var(--primary-red)" : "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color var(--transition-fast)",
                  padding: "0.4rem 0",
                  borderBottom: isActive ? "2px solid var(--primary-red)" : "2px solid transparent",
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Header Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="btn-icon"
              title="Pesquisar jogos e recintos"
              style={{
                color: "var(--text-primary)",
                backgroundColor: searchOpen ? "var(--bg-muted)" : "transparent",
              }}
              aria-label="Abrir pesquisa"
            >
              <Search size={20} />
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="btn-icon"
              title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
              style={{ color: "var(--text-primary)" }}
              aria-label="Alternar tema"
            >
              {isDark ? <Sun size={20} color="var(--accent-gold)" /> : <Moon size={20} />}
            </button>

            {/* Favorites Button */}
            <Link
              to="/favoritos"
              className="btn-icon"
              title="Jogos Favoritos"
              style={{ color: "var(--text-primary)", position: "relative" }}
              aria-label="Jogos Favoritos"
            >
              <Heart size={20} />
              {favorites.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    backgroundColor: "var(--primary-red)",
                    color: "#FFFFFF",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              to="/carrinho"
              className="btn-icon"
              title="Carrinho de Compras"
              style={{ color: "var(--text-primary)", position: "relative" }}
              aria-label="Carrinho de compras"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    backgroundColor: "var(--accent-gold)",
                    color: "var(--inst-black)",
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Area Link */}
            <Link
              to="/meus-bilhetes"
              className="btn-secondary btn-sm"
              style={{ display: "none", alignItems: "center", gap: "0.4rem" }}
              id="user-tickets-desktop-btn"
            >
              <User size={16} />
              <span>Meus Bilhetes</span>
            </Link>

            {/* Prominent CTA */}
            <Link to="/jogos" className="btn btn-primary btn-sm" style={{ display: "none" }} id="cta-buy-desktop">
              <Ticket size={16} />
              <span>Comprar Bilhete</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-icon"
              style={{ color: "var(--text-primary)", display: "flex" }}
              id="mobile-menu-toggle"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div
            style={{
              padding: "1rem 1.25rem",
              backgroundColor: "var(--bg-surface-elevated)",
              borderTop: "1px solid var(--border-color)",
              animation: "fadeIn 0.2s ease-in-out",
            }}
          >
            <div className="container">
              <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search
                    size={20}
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--text-secondary)",
                    }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar por equipa, jogo (ex: Petro, 1.º de Agosto), estádio ou modalidade..."
                    autoFocus
                    className="form-control"
                    style={{ paddingLeft: "44px" }}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Pesquisar
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "76px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 999,
            display: "flex",
            justifyContent: "flex-end",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: "82%",
              maxWidth: "340px",
              height: "100%",
              backgroundColor: "var(--bg-surface)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              boxShadow: "-8px 0 25px rgba(0,0,0,0.3)",
              animation: "fadeIn 0.25s ease-out",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Ticket size={20} color="var(--primary-red)" />
                <span style={{ fontWeight: 800, fontSize: "1.1rem" }}>Menu de Navegação</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="btn-icon">
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    padding: "0.85rem 1rem",
                    borderRadius: "10px",
                    fontSize: "1rem",
                    fontWeight: isActive ? 700 : 500,
                    backgroundColor: isActive ? "var(--primary-red-light)" : "transparent",
                    color: isActive ? "var(--primary-red)" : "var(--text-primary)",
                    textDecoration: "none",
                  })}
                >
                  {link.label === "Início" && <Compass size={18} />}
                  {link.label === "Jogos" && <Ticket size={18} />}
                  {link.label === "Modalidades" && <Layers size={18} />}
                  {link.label === "Competições" && <Trophy size={18} />}
                  {link.label === "Estádios" && <Shield size={18} />}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>

            <hr style={{ borderColor: "var(--border-color)", margin: "0.5rem 0" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link
                to="/meus-bilhetes"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ justifyContent: "flex-start", width: "100%" }}
              >
                <User size={18} />
                <span>Meus Bilhetes Digitais</span>
              </Link>
              <Link
                to="/favoritos"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ justifyContent: "flex-start", width: "100%" }}
              >
                <Heart size={18} color="var(--primary-red)" />
                <span>Favoritos ({favorites.length})</span>
              </Link>
              <Link
                to="/carrinho"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-gold"
                style={{ justifyContent: "center", width: "100%", marginTop: "0.5rem" }}
              >
                <ShoppingCart size={18} />
                <span>Carrinho ({itemCount})</span>
              </Link>
              <Link
                to="/jogos"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ justifyContent: "center", width: "100%" }}
              >
                <Ticket size={18} />
                <span>Comprar Bilhete Agora</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Style query for desktop navigation display */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          #user-tickets-desktop-btn {
            display: inline-flex !important;
          }
          #cta-buy-desktop {
            display: inline-flex !important;
          }
          #mobile-menu-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
