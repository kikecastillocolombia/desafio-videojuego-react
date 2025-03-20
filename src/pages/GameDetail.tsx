import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./GameDetail.module.css";

/**
 * Interfaz que representa los detalles de un videojuego.
 */
interface Game {
  id: number; // ID único del juego
  name: string; // Nombre del juego
  background_image: string; // URL de la imagen de fondo
  metacritic: number; // Puntuación en Metacritic
  released: string; // Fecha de lanzamiento
  description_raw: string; // Descripción del juego en texto plano
}

/**
 * Componente que muestra los detalles de un videojuego seleccionado.
 * Obtiene los datos desde la API de RAWG usando el ID del juego en la URL.
 *
 * @returns {JSX.Element} Página con la información detallada del juego.
 */
function GameDetail() {
  const { id } = useParams<{ id: string }>(); // Obtiene el ID desde la URL
  const navigate = useNavigate(); // Hook para manejar la navegación
  const [game, setGame] = useState<Game | null>(null); // Estado del juego
  const [loading, setLoading] = useState(true); // Estado de carga

  /**
   * Efecto que carga los detalles del juego al montar el componente o cuando cambia el ID.
   */
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
        const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
        const { data } = await axios.get(url);
        setGame(data);
      } catch (error) {
        console.error("Error al cargar el juego:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  /**
   * Maneja el botón "Inicio" para volver a la página principal.
   * Navega a la página de inicio y recarga la página para asegurar que los datos se actualicen.
   */
  const handleBack = () => {
    navigate("/"); // Redirige a la página de inicio
    setTimeout(() => {
      window.location.reload(); // 🔥 Fuerza el renderizado de Home
    }, 100);
  };

  // Muestra un loader mientras se cargan los datos
  if (loading) {
    return (
      <div className={styles.detailContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  // Si el juego no se encuentra, muestra un mensaje de error
  if (!game) return <p className={styles.gameInfo}>Error al cargar el juego...</p>;

  return (
    <div className={styles.detailContainer}>
      <h1 className={styles.gameTitle}>{game.name}</h1>
      <img src={game.background_image} alt={game.name} className={styles.coverImage} />
      <p className={styles.gameInfo}>Metacritic: {game.metacritic}</p>
      <p className={styles.gameInfo}>Lanzamiento: {game.released}</p>
      <p className={styles.description}>{game.description_raw}</p>
      <button className={styles.backButton} onClick={handleBack}>Inicio</button>
    </div>
  );
}

export default GameDetail;
