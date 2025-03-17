import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  const context = useContext(GameContext);
  if (!context) return <p>Error cargando datos...</p>;

  const { games } = context;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Videojuegos</h1>
      <div className={styles.homeContainer}>
  <h1>Mejor Calificados</h1>
  <div className={styles.gameList}>
    {games.map((game) => (
      <Link key={game.id} to={`/game/${game.id}`} className={styles.gameCard}>
        <img src={game.background_image} alt={game.name} className={styles.coverImage} />
        <h2>{game.name}</h2>
      </Link>
    ))}
  </div>
</div>

    </div>
  );
}

export default Home;
