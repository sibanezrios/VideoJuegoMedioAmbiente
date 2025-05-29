import React, { useState } from 'react';
import Menu from './components/Menu';
import Inicio from './components/inicio';
import './Nivel.css'; // asegúrate de que esté correctamente enlazado
import { Fase } from './constants';
import Game from './components/Game';

function App() {
  const [fase, setFase] = useState<Fase>(Fase.Start);

  // === Fases ===
  if (fase === Fase.Start) {
    return <Inicio onStart={() => setFase(Fase.Menu)} />;
  }

  if (fase === Fase.Menu) {
    return <Menu onStart={() => setFase(Fase.Game)} />;
  }

  // === Fase juego ===
  if (fase === Fase.Game) {
    return <Game />;
  }

  return null;
}

export default App;
