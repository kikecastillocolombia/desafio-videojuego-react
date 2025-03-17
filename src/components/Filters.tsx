import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import styles from "./Filters.module.css";

function Filters() {
  const gameContext = useContext(GameContext);
  if (!gameContext) return null;

  const { genres, platforms, tags, filterGames } = gameContext;
  const [filters, setFilters] = useState({
    year: "",
    genre: "",
    platform: "",
    tag: "",
    developer: ""
  });

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    filterGames({ ...filters, [name]: value });
  };

  return (
    <div className={styles.filtersContainer}>
      <select name="year" value={filters.year} onChange={handleFilterChange} className={styles.filterSelect}>
        <option value="">Año</option>
        {[...Array(20)].map((_, i) => {
          const year = (2024 - i).toString();
          return <option key={year} value={year}>{year}</option>;
        })}
      </select>

      <select name="genre" value={filters.genre} onChange={handleFilterChange} className={styles.filterSelect}>
        <option value="">Género</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      <select name="platform" value={filters.platform} onChange={handleFilterChange} className={styles.filterSelect}>
        <option value="">Plataforma</option>
        {platforms.map((platform) => (
          <option key={platform} value={platform}>{platform}</option>
        ))}
      </select>

      <select name="tag" value={filters.tag} onChange={handleFilterChange} className={styles.filterSelect}>
        <option value="">Tag</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>

    </div>
  );
}

export default Filters;
