import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para la navegación
import styles from "./Home.module.css";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";

/**
 * Página principal que muestra una lista de videojuegos mejor calificados.
 * Incluye una barra de búsqueda, filtros y una lista de juegos con su imagen, nombre y género.
 *
 * @returns {JSX.Element} Página principal de videojuegos.
 */
function Home() {
  const context = useContext(GameContext);

  // Si el contexto no está disponible, muestra un mensaje de error.
  if (!context) return <p>Error cargando datos...</p>;

  const { games }: { games: Game[] } = context;
  const navigate = useNavigate(); // Hook para manejar la navegación

  /**
   * Maneja el clic en una tarjeta de videojuego y redirige a la página de detalles.
   * Se recarga la página manualmente para asegurar que los datos se actualicen.
   *
   * @param {number} id - ID del videojuego seleccionado.
   */
  const handleCardClick = (id: number) => {
    navigate(`/game/${id}`);
    window.location.reload(); // Fuerza la recarga para actualizar los datos
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Videojuegos</h1>
      <div className={styles.homeContainer}>
        <h1>Mejor Calificados</h1>
        <SearchBar />
        <Filters />
        <div className={styles.gameList}>
          {games.map((game) => (
            <div 
              key={game.id} 
              className={styles.gameCard} 
              onClick={() => handleCardClick(game.id)} 
              style={{ cursor: "pointer" }} // Aseguramos que sea clickeable
            >
              <img src={game.background_image} alt={game.name} className={styles.coverImage} />
              <h2>{game.name}</h2>
              <p className={styles.genre}>
                {game.genres.map((g) => g.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

/**
 * Interfaz que representa un videojuego.
 */
interface Game {
  id: number; // ID único del juego
  name: string; // Nombre del juego
  background_image: string; // URL de la imagen de fondo
  genres: { name: string }[]; // Lista de géneros del juego
}
