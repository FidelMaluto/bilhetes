import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, RotateCcw } from "lucide-react";
import MatchCard from "../components/matches/MatchCard";
import { MATCHES, SPORTS, COMPETITIONS, PROVINCES } from "../data/sportsData";

const MatchesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialSport = searchParams.get("sport") || "todos";

  const [search, setSearch] = useState(initialQuery);
  const [selectedSport, setSelectedSport] = useState(initialSport);
  const [selectedCompetition, setSelectedCompetition] = useState("todos");
  const [selectedProvince, setSelectedProvince] = useState("Todas as Províncias");
  const [sortBy, setSortBy] = useState("date-asc");

  // Filter and sort matches
  const filteredMatches = useMemo(() => {
    return MATCHES.filter((match) => {
      // Search query filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = match.title.toLowerCase();
        const homeName = match.homeTeam.name.toLowerCase();
        const awayName = match.awayTeam.name.toLowerCase();
        const stadiumId = match.stadiumId.toLowerCase();
        const desc = match.description.toLowerCase();
        const comp = match.competitionId.toLowerCase();

        if (
          !matchTitle.includes(q) &&
          !homeName.includes(q) &&
          !awayName.includes(q) &&
          !stadiumId.includes(q) &&
          !desc.includes(q) &&
          !comp.includes(q)
        ) {
          return false;
        }
      }

      // Sport filter
      if (selectedSport !== "todos" && match.sportId !== selectedSport) {
        return false;
      }

      // Competition filter
      if (selectedCompetition !== "todos" && match.competitionId !== selectedCompetition) {
        return false;
      }

      // Province filter
      if (
        selectedProvince !== "Todas as Províncias" &&
        match.province !== selectedProvince
      ) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "date-asc") {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === "price-asc") {
        return a.startingPrice - b.startingPrice;
      }
      if (sortBy === "price-desc") {
        return b.startingPrice - a.startingPrice;
      }
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [search, selectedSport, selectedCompetition, selectedProvince, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setSelectedSport("todos");
    setSelectedCompetition("todos");
    setSelectedProvince("Todas as Províncias");
    setSortBy("date-asc");
    setSearchParams({});
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedSport !== "todos" ||
    selectedCompetition !== "todos" ||
    selectedProvince !== "Todas as Províncias" ||
    sortBy !== "date-asc";

  return (
    <div style={{ padding: "2.5rem 0 5rem" }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="badge badge-gold" style={{ marginBottom: "0.5rem" }}>
            BILHETEIRA NACIONAL
          </span>
          <h1 className="title-section" style={{ marginBottom: "0.5rem" }}>
            Calendário de Jogos & Eventos
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Encontra e reserva bilhetes oficiais para os jogos do Girabola, Unitel Basket, Taça e muito mais.
          </p>
        </div>

        {/* Search & Top Action Bar */}
        <div
          style={{
            backgroundColor: "var(--bg-surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-color)",
            padding: "1.25rem",
            marginBottom: "2rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            {/* Search Input */}
            <div style={{ position: "relative", flex: 2, minWidth: "260px" }}>
              <Search
                size={18}
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar por equipa (Petro, 1.º de Agosto...), estádio ou cidade..."
                className="form-control"
                style={{ paddingLeft: "42px" }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                  aria-label="Limpar pesquisa"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sport Select */}
            <div style={{ flex: 1, minWidth: "160px" }}>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="form-control"
              >
                <option value="todos">Todas as Modalidades</option>
                {SPORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Competition Select */}
            <div style={{ flex: 1, minWidth: "160px" }}>
              <select
                value={selectedCompetition}
                onChange={(e) => setSelectedCompetition(e.target.value)}
                className="form-control"
              >
                <option value="todos">Todas as Competições</option>
                {COMPETITIONS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Province Select */}
            <div style={{ flex: 1, minWidth: "160px" }}>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="form-control"
              >
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order Select */}
            <div style={{ flex: 1, minWidth: "160px" }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-control"
              >
                <option value="date-asc">Data (Mais próximos)</option>
                <option value="price-asc">Preço (Mais barato)</option>
                <option value="price-desc">Preço (Mais alto)</option>
                <option value="title-asc">Nome do Jogo (A-Z)</option>
              </select>
            </div>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="btn btn-secondary btn-sm"
                title="Repor filtros de pesquisa"
              >
                <RotateCcw size={15} />
                <span>Limpar Filtros</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter & Active Criteria */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ fontSize: "0.92rem", color: "var(--text-secondary)" }}>
            A mostrar <strong>{filteredMatches.length}</strong> {filteredMatches.length === 1 ? "jogo encontrado" : "jogos encontrados"}
          </div>
          {hasActiveFilters && (
            <div style={{ fontSize: "0.82rem", color: "var(--primary-red)", fontWeight: 600 }}>
              Filtros activos aplicados
            </div>
          )}
        </div>

        {/* Matches Grid or Empty State */}
        {filteredMatches.length > 0 ? (
          <div className="grid-matches">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div
            className="card"
            style={{
              padding: "4rem 2rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.2rem",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-secondary)",
              }}
            >
              <Search size={32} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700 }}>
              Nenhum jogo encontrado com os filtros seleccionados
            </h3>
            <p style={{ color: "var(--text-secondary)", maxWidth: "480px", fontSize: "0.92rem" }}>
              Tente alterar os termos de pesquisa, selecionar outra província ou repor todos os filtros para ver os jogos disponíveis.
            </p>
            <button onClick={resetFilters} className="btn btn-primary">
              <RotateCcw size={16} />
              <span>Ver Todos os Jogos</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default MatchesPage;
