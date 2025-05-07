import React, { useState } from 'react';
import Menu from './components/Menu';
import Inicio from './components/inicio';
import MapaBarrio from './MapaBarrio';
import MapaRio from './MapaRio';
import FuturoEscena from './FuturoEscena';
import FuturoEscena2 from './FuturoEscena2';

type Fase = 'inicio' | 'menu' | 'juego';
type Futuro = 'muy_bueno' | 'medio' | 'malo' | null;

function App() {
  const [fase, setFase] = useState<Fase>('inicio');
  const [nivel, setNivel] = useState(1);
  const [futuro, setFuturo] = useState<Futuro>(null);
  const [puntos, setPuntos] = useState(0);

  const avanzarNivel = () => {
    setFuturo(null);
    if (nivel === 1) setNivel(2);
  };

  // === Control por fases ===
  if (fase === 'inicio') {
    return <Inicio onStart={() => setFase('menu')} />;
  }

  if (fase === 'menu') {
    return <Menu onStart={() => setFase('juego')} />;
  }

  // === Fase de juego con niveles ===
  if (fase === 'juego') {
    if (nivel === 1) {
      return (
        <div className="App">
          <h1>🌱 Juego Ambiental - Nivel 1: El Barrio</h1>
          <MapaBarrio setPuntos={setPuntos} setFuturo={setFuturo} />
          {futuro && (
            <FuturoEscena tipo={futuro} puntos={puntos} onContinuar={avanzarNivel} />
          )}
        </div>
      );
    }

    if (nivel === 2) {
      return (
        <div className="App">
          <h1>🌊 Juego Ambiental - Nivel 2: El Río</h1>
          <MapaRio setPuntos={setPuntos} setFuturo={setFuturo} />
          {futuro && <FuturoEscena2 futuro={futuro} />}
        </div>
      );
    }
  }

  return null;
}

export default App;
