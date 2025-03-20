import { useContext, useState, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const gameContext = useContext(GameContext);
  if (!gameContext) return null;

  const { filterGames } = gameContext;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    filterGames({ searchQuery });
  }, [searchQuery, filterGames]);

  return (
    <input
      type="text"
      placeholder="Buscar juegos..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className={styles.searchInput}
    />
  );
}

export default SearchBar;
