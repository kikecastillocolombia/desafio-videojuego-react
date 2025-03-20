import { useContext, useState, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import styles from "./SearchBar.module.css";

/**
 * Componente de barra de búsqueda para filtrar juegos por nombre.
 * Permite al usuario ingresar un término de búsqueda y actualiza la lista de juegos en tiempo real.
 * 
 * @returns {JSX.Element | null} Campo de entrada para búsqueda o `null` si el contexto no está disponible.
 */
function SearchBar() {
  // Accede al contexto de los juegos
  const gameContext = useContext(GameContext);
  if (!gameContext) return null;

  const { filterGames } = gameContext;

  /**
   * Estado local que almacena la consulta de búsqueda ingresada por el usuario.
   */
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Efecto que ejecuta el filtrado de juegos cuando cambia la consulta de búsqueda.
   */
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
