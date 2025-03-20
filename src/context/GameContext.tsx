import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

/**
 * Interfaz que representa la información de un videojuego.
 */
interface Game {
  id: number; // ID único del juego
  name: string; // Nombre del juego
  background_image: string; // URL de la imagen de fondo
  metacritic: number; // Puntuación en Metacritic
  released: string; // Fecha de lanzamiento
  genres: { name: string }[]; // Lista de géneros del juego
  platforms: { platform: { name: string } }[]; // Lista de plataformas donde está disponible
  tags: { name: string }[]; // Lista de etiquetas del juego
  developers: { name: string }[]; // Lista de desarrolladores del juego
}

/**
 * Interfaz que define los filtros disponibles para filtrar los juegos.
 */
interface Filters {
  searchQuery?: string; // Término de búsqueda por nombre
  year?: string; // Año de lanzamiento
  genre?: string; // Género del juego
  platform?: string; // Plataforma en la que está disponible
  tag?: string; // Etiqueta del juego
  developer?: string; // Desarrollador del juego
}

/**
 * Interfaz que define la estructura del contexto de juegos.
 */
interface GameContextType {
  games: Game[]; // Lista de juegos filtrados
  genres: string[]; // Lista de géneros disponibles
  platforms: string[]; // Lista de plataformas disponibles
  tags: string[]; // Lista de etiquetas disponibles
  filterGames: (filters: Filters) => void; // Función para aplicar filtros a los juegos
}

/**
 * Contexto global que almacena los datos de videojuegos y los filtros disponibles.
 */
export const GameContext = createContext<GameContextType | null>(null);

/**
 * Proveedor de contexto que gestiona la información de los videojuegos y los filtros.
 * Se encarga de obtener los datos desde la API de RAWG y aplicarlos a la aplicación.
 * 
 * @param {ReactNode} children - Componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element} Proveedor del contexto de juegos.
 */
export function GameProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<Game[]>([]); // Estado con la lista de juegos originales
  const [filteredGames, setFilteredGames] = useState<Game[]>([]); // Estado con los juegos filtrados
  const [genres, setGenres] = useState<string[]>([]); // Lista de géneros obtenidos de la API
  const [platforms, setPlatforms] = useState<string[]>([]); // Lista de plataformas obtenidas de la API
  const [tags, setTags] = useState<string[]>([]); // Lista de etiquetas obtenidas de la API

  // Estado para almacenar los filtros aplicados
  const [, setFilters] = useState<Filters>({
    year: "",
    genre: "",
    platform: "",
    tag: "",
    developer: "",
    searchQuery: "",
  });

  /**
   * Efecto que obtiene los juegos y filtros desde la API al montar el componente.
   */
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
        const url = `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-metacritic&page_size=100`;
        const { data } = await axios.get(url);
        setGames(data.results);
        setFilteredGames(data.results);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      }
    };

    const fetchFilters = async () => {
      try {
        const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
        const [genresRes, platformsRes, tagsRes] = await Promise.all([
          axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`),
          axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`),
          axios.get(`https://api.rawg.io/api/tags?key=${API_KEY}`),
          axios.get(`https://api.rawg.io/api/developers?key=${API_KEY}`),
        ]);

        setGenres(genresRes.data.results.map((g: any) => g.name));
        setPlatforms(platformsRes.data.results.map((p: any) => p.name));
        setTags(tagsRes.data.results.map((t: any) => t.name));
      } catch (error) {
        console.error("Error al obtener los filtros:", error);
      }
    };

    fetchGames();
    fetchFilters();
  }, []);

  /**
   * Función que filtra los juegos según los criterios establecidos en `filters`.
   * 
   * @param {Filters} newFilters - Filtros a aplicar en la lista de juegos.
   */
  const filterGames = (newFilters: Filters) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      let filtered = games;

      // Filtra por nombre del juego (búsqueda)
      if (updatedFilters.searchQuery) {
        filtered = filtered.filter(game =>
          game.name.toLowerCase().includes(updatedFilters.searchQuery ?? "".toLowerCase())
        );
      }

      // Filtra por año de lanzamiento
      if (updatedFilters.year) {
        filtered = filtered.filter(game => game.released.startsWith(updatedFilters.year ?? ""));
      }

      // Filtra por género
      if (updatedFilters.genre) {
        filtered = filtered.filter(game => game.genres.some(g => g.name === updatedFilters.genre));
      }

      // Filtra por plataforma
      if (updatedFilters.platform) {
        filtered = filtered.filter(game => game.platforms.some(p => p.platform.name === updatedFilters.platform));
      }

      // Filtra por etiqueta
      if (updatedFilters.tag) {
        filtered = filtered.filter(game => game.tags.some(t => t.name === updatedFilters.tag));
      }

      // Filtra por desarrollador
      if (updatedFilters.developer) {
        filtered = filtered.filter(game => game.developers.some(d => d.name === updatedFilters.developer));
      }

      setFilteredGames(filtered);
      return updatedFilters; // Retorna los filtros actualizados
    });
  };

  return (
    <GameContext.Provider value={{ games: filteredGames, genres, platforms, tags, filterGames }}>
      {children}
    </GameContext.Provider>
  );
}
