import styles from "./Filters.module.css";

interface FiltersProps {
    filters: {
    year: string;
    genre: string;
    platform: string;
    tag: string;
    developer: string;
  };
  handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Filters({ filters, handleFilterChange }: FiltersProps) {
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
        <option value="action">Acción</option>
        <option value="rpg">RPG</option>
        <option value="shooter">Shooter</option>
      </select>

      <select name="platform" value={filters.platform} onChange={handleFilterChange} className={styles.filterSelect}>
        <option value="">Plataforma</option>
        <option value="pc">PC</option>
        <option value="playstation">PlayStation</option>
        <option value="xbox">Xbox</option>
      </select>
    </div>
  );
}

export default Filters;
