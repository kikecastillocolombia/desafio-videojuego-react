import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GameProvider } from './context/GameContext.tsx';
import { BrowserRouter } from 'react-router-dom';

/**
 * **Punto de entrada de la aplicación** 🚀
 * 
 * - Renderiza la aplicación dentro del elemento `#root`.
 * - Usa `StrictMode` para ayudar a detectar problemas potenciales en el desarrollo.
 * - Usa `BrowserRouter` para manejar la navegación con React Router.
 * - Envuelve la aplicación en `GameProvider` para gestionar el estado global de los videojuegos.
 */

// Obtiene el elemento root en el DOM y monta la aplicación
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Habilita la navegación en la aplicación */}
    <BrowserRouter>
      {/* Provee el contexto global de videojuegos */}
      <GameProvider>
        <App />
      </GameProvider>
    </BrowserRouter>
  </StrictMode>,
);
