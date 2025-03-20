import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import styles from "./Filters.module.css";

/**
 * Componente de filtros para la lista de juegos.
 * Permite filtrar los juegos por año, género, plataforma y etiquetas.
 * 
 * @returns {JSX.Element | null} Componente de filtros o `null` si el contexto no está disponible.
 */
function Filters() {
  // Accede al contexto de los juegos
  const gameContext = useContext(GameContext);
  if (!gameContext) return null;

  const { genres, platforms, tags, filterGames } = gameContext;

  /**
   * Estado local que almacena los valores seleccionados de los filtros.
   */
  const [filters, setFilters] = useState({
    year: "",
    genre: "",
    platform: "",
    tag: "",
    developer: ""
  });

  /**
   * Maneja el cambio en los selectores de filtro.
   * 
   * @param {React.ChangeEvent<HTMLSelectElement>} e - Evento de cambio del selector.
   */
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Actualiza el estado local de los filtros
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    // Aplica los filtros al contexto global
    filterGames({ ...filters, [name]: value });
  };

  return (
    <div className={styles.filtersContainer}>
      {/* Filtro por año */}
      <select name="year" value={filters.year} onChange={handleFilterChange} className={styles.filterSelect}>
        <option value="">Año</option>
        {[...Array(20)].map((_, i) => {
          const year = (2024 - i).toString();
          return <option key={year} value={year}>{year}</option>;
        })}
      </select>

      {/* Filtro por género */}
      <select name="genre" value={filters.genre} onChange={handleFilterChange} className={styles.filterSelect}>
        <option value="">Género</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      {/* Filtro por plataforma */}
      <select name="platform" value={filters.platform} onChange={handleFilterChange} className={styles.filterSelect}>
        <option value="">Plataforma</option>
        {platforms.map((platform) => (
          <option key={platform} value={platform}>{platform}</option>
        ))}
      </select>

      {/* Filtro por etiqueta */}
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
