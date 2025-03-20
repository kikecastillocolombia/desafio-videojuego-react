import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./GameDetail.module.css";

interface Game {
  id: number;
  name: string;
  background_image: string;
  metacritic: number;
  released: string;
  description_raw: string;
}

function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleBack = () => {
    navigate("/"); 
    setTimeout(() => {
      window.location.reload(); // 🔥 Fuerza el renderizado de Home
    }, 100);
  };

  if (loading) {
    return (
      <div className={styles.detailContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

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
