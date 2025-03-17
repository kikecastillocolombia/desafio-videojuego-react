import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface Game {
  id: number;
  name: string;
  background_image: string;
  metacritic: number;
  released: string;
  genres: { name: string }[];
  platforms: { platform: { name: string } }[];
  tags: { name: string }[];
  developers: { name: string }[];
}

interface GameContextType {
  games: Game[];
  genres: string[];
  platforms: string[];
  tags: string[];
  developers: string[];
  filterGames: (filters: Filters) => void;
}

interface Filters {
  year?: string;
  genre?: string;
  platform?: string;
  tag?: string;
  developer?: string;
}

export const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [developers, setDevelopers] = useState<string[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
      const url = `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-metacritic&page_size=20`;
      const { data } = await axios.get(url);
      setGames(data.results);
      setFilteredGames(data.results);
    };

    const fetchFilters = async () => {
      const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
      const [genresRes, platformsRes, tagsRes, devsRes] = await Promise.all([
        axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`),
        axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`),
        axios.get(`https://api.rawg.io/api/tags?key=${API_KEY}`),
        axios.get(`https://api.rawg.io/api/developers?key=${API_KEY}`),
      ]);

      setGenres(genresRes.data.results.map((g: any) => g.name));
      setPlatforms(platformsRes.data.results.map((p: any) => p.name));
      setTags(tagsRes.data.results.map((t: any) => t.name));
      setDevelopers(devsRes.data.results.map((d: any) => d.name));
    };

    fetchGames();
    fetchFilters();
  }, []);

  const filterGames = ({ year, genre, platform, tag, developer }: Filters) => {
    let filtered = games;

    if (year) {
      filtered = filtered.filter(game => game.released.startsWith(year));
    }
    if (genre) {
      filtered = filtered.filter(game => game.genres.some(g => g.name === genre));
    }
    if (platform) {
      filtered = filtered.filter(game => game.platforms.some(p => p.platform.name === platform));
    }
    if (tag) {
      filtered = filtered.filter(game => game.tags.some(t => t.name === tag));
    }
    if (developer) {
      filtered = filtered.filter(game => game.developers.some(d => d.name === developer));
    }

    setFilteredGames(filtered);
  };

  return (
    <GameContext.Provider value={{ games: filteredGames, genres, platforms, tags, developers, filterGames }}>
      {children}
    </GameContext.Provider>
  );
}
