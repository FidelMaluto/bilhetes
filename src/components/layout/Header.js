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

      {/* Main Header - Fundo Preto Carvão Sólido */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#171717",
          borderBottom: "1px solid #262626",
          transition: "background-color var(--transition-base), border-color var(--transition-base)",
        }}
      >
        <div className="container-wide" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px" }}>
          
          {/* Logo Oficial com Novas Cores */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "var(--primary-red)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                position: "relative",
              }}
            >
              <Ticket size={22} color="#FFFFFF" />
              <span
                style={{
                  position: "absolute",
                  bottom: "-2px",
                  right: "-2px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-gold)",
                  border: "2px solid #171717",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{ fontSize: "1.18rem", fontWeight: 900, letterSpacing: "-0.02em", color: "#E8E4DC" }}>
                  ANGOLA
                </span>
                <span style={{ fontSize: "1.18rem", fontWeight: 900, letterSpacing: "-0.02em", color: "var(--primary-red)" }}>
                  TICKETS
                </span>
              </div>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", color: "#A5A29C", textTransform: "uppercase" }}>
                Bilhética Desportiva
              </span>
            </div>
          </Link>

          {/* Desktop Nav - Navegação Simples e Institucional */}
          <nav style={{ display: "none", alignItems: "center", gap: "1.75rem" }} className="desktop-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  fontSize: "0.92rem",
                  fontWeight: isActive ? "700" : "500",
                  color: isActive ? "var(--primary-red)" : "#A5A29C",
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

          {/* Header Actions - Ícones Monocromáticos e Botão Sólido */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="btn-icon"
              title="Pesquisar jogos e recintos"
              style={{
                color: "#E8E4DC",
                backgroundColor: searchOpen ? "#262626" : "transparent",
              }}
              aria-label="Abrir pesquisa"
            >
              <Search size={19} color="#E8E4DC" />
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="btn-icon"
              title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
              style={{ color: "#E8E4DC" }}
              aria-label="Alternar tema"
            >
              {isDark ? <Sun size={19} color="#B08B42" /> : <Moon size={19} color="#E8E4DC" />}
            </button>

            {/* Favorites Button */}
            <Link
              to="/favoritos"
              className="btn-icon"
              title="Jogos Favoritos"
              style={{ color: "#E8E4DC", position: "relative" }}
              aria-label="Jogos Favoritos"
            >
              <Heart size={19} color="#E8E4DC" />
              {favorites.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    backgroundColor: "var(--primary-red)",
                    color: "#FFFFFF",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    width: "17px",
                    height: "17px",
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
              style={{ color: "#E8E4DC", position: "relative" }}
              aria-label="Carrinho de compras"
            >
              <ShoppingCart size={19} color="#E8E4DC" />
              {itemCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    backgroundColor: "var(--accent-gold)",
                    color: "#171717",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    width: "17px",
                    height: "17px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Area Link */}
            <Link
              to="/meus-bilhetes"
              className="btn btn-secondary btn-sm"
              style={{
                display: "none",
                alignItems: "center",
                gap: "0.4rem",
                backgroundColor: "#222222",
                borderColor: "#333333",
                color: "#E8E4DC",
              }}
              id="user-tickets-desktop-btn"
            >
              <User size={15} color="#E8E4DC" />
              <span>Meus Bilhetes</span>
            </Link>

            {/* Prominent CTA - Botão Principal Vermelho Sólido */}
            <Link to="/jogos" className="btn btn-primary btn-sm" style={{ display: "none" }} id="cta-buy-desktop">
              <Ticket size={15} color="#FFFFFF" />
              <span>Comprar Bilhete</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-icon"
              style={{ color: "#E8E4DC", display: "flex" }}
              id="mobile-menu-toggle"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X size={22} color="#E8E4DC" /> : <Menu size={22} color="#E8E4DC" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar - Fundo Sólido e Bordas Neutras */}
        {searchOpen && (
          <div
            style={{
              padding: "1rem 1.25rem",
              backgroundColor: "#1F1F1F",
              borderTop: "1px solid #2B2B2B",
              animation: "fadeIn 0.2s ease-in-out",
            }}
          >
            <div className="container">
              <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search
                    size={18}
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#A5A29C",
                    }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar por equipa, jogo (ex: Petro, 1.º de Agosto), estádio ou modalidade..."
                    autoFocus
                    className="form-control"
                    style={{
                      paddingLeft: "42px",
                      backgroundColor: "#171717",
                      borderColor: "#333333",
                      color: "#E8E4DC",
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Pesquisar
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="btn btn-secondary"
                  style={{ backgroundColor: "#262626", borderColor: "#333333", color: "#E8E4DC" }}
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
            top: "73px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 999,
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: "84%",
              maxWidth: "340px",
              height: "100%",
              backgroundColor: "#171717",
              color: "#E8E4DC",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              borderLeft: "1px solid #2E2E2E",
              animation: "fadeIn 0.2s ease-out",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #282828", paddingBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Ticket size={20} color="var(--primary-red)" />
                <span style={{ fontWeight: 800, fontSize: "1.05rem", color: "#E8E4DC" }}>Menu de Navegação</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="btn-icon" style={{ color: "#E8E4DC" }}>
                <X size={20} color="#E8E4DC" />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    padding: "0.8rem 1rem",
                    borderRadius: "6px",
                    fontSize: "0.95rem",
                    fontWeight: isActive ? 700 : 500,
                    backgroundColor: isActive ? "rgba(165, 31, 39, 0.2)" : "transparent",
                    color: isActive ? "var(--primary-red)" : "#E8E4DC",
                    textDecoration: "none",
                  })}
                >
                  {link.label === "Início" && <Compass size={18} color="#A5A29C" />}
                  {link.label === "Jogos" && <Ticket size={18} color="#A5A29C" />}
                  {link.label === "Modalidades" && <Layers size={18} color="#A5A29C" />}
                  {link.label === "Competições" && <Trophy size={18} color="#A5A29C" />}
                  {link.label === "Estádios" && <Shield size={18} color="#A5A29C" />}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>

            <hr style={{ borderColor: "#282828", margin: "0.5rem 0" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link
                to="/meus-bilhetes"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ justifyContent: "flex-start", width: "100%", backgroundColor: "#222222", borderColor: "#333333", color: "#E8E4DC" }}
              >
                <User size={18} color="#A5A29C" />
                <span>Meus Bilhetes Digitais</span>
              </Link>
              <Link
                to="/favoritos"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ justifyContent: "flex-start", width: "100%", backgroundColor: "#222222", borderColor: "#333333", color: "#E8E4DC" }}
              >
                <Heart size={18} color="var(--primary-red)" />
                <span>Favoritos ({favorites.length})</span>
              </Link>
              <Link
                to="/carrinho"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ justifyContent: "flex-start", width: "100%", backgroundColor: "#222222", borderColor: "#333333", color: "#E8E4DC" }}
              >
                <ShoppingCart size={18} color="var(--accent-gold)" />
                <span>Carrinho ({itemCount})</span>
              </Link>
              <Link
                to="/jogos"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ justifyContent: "center", width: "100%", marginTop: "0.25rem" }}
              >
                <Ticket size={18} color="#FFFFFF" />
                <span>Comprar Bilhete Agora</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Responsive layout queries */}
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
