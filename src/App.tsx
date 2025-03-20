import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GameDetail from './pages/GameDetail'
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:id" element={<GameDetail key={location.pathname} />} />
      </Routes>
      <h1>Desafio React</h1>
    </>
  )
}

export default App
