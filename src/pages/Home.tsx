import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import styles from "./Home.module.css";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";

function Home() {
  const context = useContext(GameContext);
  if (!context) return <p>Error cargando datos...</p>;

  const { games } = context;
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleCardClick = (id: number) => {
    navigate(`/game/${id}`);
    window.location.reload();
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
