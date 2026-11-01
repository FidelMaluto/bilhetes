import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

import HomePage from "./pages/HomePage";
import MatchesPage from "./pages/MatchesPage";
import MatchDetailPage from "./pages/MatchDetailPage";
import SportsPage from "./pages/SportsPage";
import SportDetailPage from "./pages/SportDetailPage";
import CompetitionsPage from "./pages/CompetitionsPage";
import CompetitionDetailPage from "./pages/CompetitionDetailPage";
import StadiumsPage from "./pages/StadiumsPage";
import StadiumDetailPage from "./pages/StadiumDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import UserTicketsPage from "./pages/UserTicketsPage";
import FavoritesPage from "./pages/FavoritesPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <FavoritesProvider>
          <CartProvider>
            <OrdersProvider>
              <Router>
                <ScrollToTop />
                <div className="app-container">
                  <Header />
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/jogos" element={<MatchesPage />} />
                      <Route path="/jogos/:id" element={<MatchDetailPage />} />
                      <Route path="/modalidades" element={<SportsPage />} />
                      <Route path="/modalidades/:slug" element={<SportDetailPage />} />
                      <Route path="/competicoes" element={<CompetitionsPage />} />
                      <Route path="/competicoes/:id" element={<CompetitionDetailPage />} />
                      <Route path="/estadios" element={<StadiumsPage />} />
                      <Route path="/estadios/:slug" element={<StadiumDetailPage />} />
                      <Route path="/carrinho" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/confirmacao/:orderId" element={<ConfirmationPage />} />
                      <Route path="/meus-bilhetes" element={<UserTicketsPage />} />
                      <Route path="/perfil" element={<UserTicketsPage />} />
                      <Route path="/historico" element={<UserTicketsPage />} />
                      <Route path="/favoritos" element={<FavoritesPage />} />
                      <Route path="/contacto" element={<ContactPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Router>
            </OrdersProvider>
          </CartProvider>
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
