import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("ast_favorites");
      return saved ? JSON.parse(saved) : ["match-01", "match-02"];
    } catch (e) {
      return ["match-01", "match-02"];
    }
  });

  useEffect(() => {
    localStorage.setItem("ast_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (matchId) => {
    setFavorites((prev) =>
      prev.includes(matchId) ? prev.filter((id) => id !== matchId) : [...prev, matchId]
    );
  };

  const isFavorite = (matchId) => favorites.includes(matchId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
