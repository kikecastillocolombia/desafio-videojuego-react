import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';

/**
 * Componente principal de la aplicación.
 * 
 * Gestiona las rutas principales de la aplicación utilizando `react-router-dom`.
 * 
 * @returns {JSX.Element} Estructura de la aplicación con rutas y navegación.
 */
function App() {
  return (
    <>
      {/* Configuración de rutas */}
      <Routes>
        {/* Página de inicio que muestra la lista de juegos */}
        <Route path="/" element={<Home />} />

        {/* Página de detalles del juego con un ID dinámico en la URL */}
        <Route path="/game/:id" element={<GameDetail key={location.pathname} />} />
      </Routes>

      {/* Título de la aplicación */}
      <h1>Desafío React</h1>
    </>
  );
}

export default App;
