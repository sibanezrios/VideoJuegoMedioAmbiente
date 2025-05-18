import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import Inicio from './components/inicio';
import MapaBarrio from './maps/Town/MapaBarrio';
import MapaRio from './maps/River/MapaRio';
import MapaCiudad from './maps/City/MapaCiudad';

import fondoOscuro from './assets/fondoOscuro.jpg';
import fondoClaro from './assets/fondoClaro.jpg';
import './Nivel.css'; // asegúrate de que esté correctamente enlazado
import { Fase, FutureResults, Level } from './constants';
import FutureScene from './FutureScene';
import MapaCrisisGlobal from './maps/GlobalCrisis/MapaCrisisGlobal';
 
function App() {
  const [fase, setFase] = useState<Fase>(Fase.Start);
  const [level, setLevel] = useState<Level>(Level.Town);
  const [futureResults, setFutureResults] = useState<FutureResults|null>(null);
  const [score, setScore] = useState(0);

  const levelUp = () => {
    setFutureResults(null);
    if (level === Level.Town) setLevel(Level.River); // Avanza del nivel 1 al 2
    if (level === Level.River) setLevel(Level.City); // Avanza del nivel 2 al 3
    if (level === Level.City) setLevel(Level.Global); // Avanza del nivel 3 al 4
  };

  // 👉 Scroll al top cuando entras al nivel 2 o 3
  useEffect(() => {
    if (level === Level.River|| level === Level.City|| level === Level.Global) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [level]);

  // === Fases ===
  if (fase === Fase.Start) {
    return <Inicio onStart={() => setFase(Fase.Menu)} />;
  }

  if (fase === Fase.Menu) {
    return <Menu onStart={() => setFase(Fase.Game)} />;
  }

  // === Fase juego ===
  if (fase === Fase.Game) {
    return (
      <div className="nivel-con-fondo">
        <img src={fondoOscuro} alt="Fondo oscuro" className="imagen-incendio" />
        <img src={fondoClaro} alt="Fondo claro" className="imagen-bosque" />

        <div className="contenido-nivel">
          {level === Level.Town ? (
            <>
            <h1>🌱 Juego Ambiental - Nivel 1: El Barrio</h1>
            <MapaBarrio increaseGlobalScore={setScore} setFutureResults={setFutureResults} />
            {futureResults && (
              <FutureScene
                results={futureResults!}
                onContinue={levelUp}
              />
            )}
          </>
        ) : level === Level.River ? (
          <>
            <h1>🌊 Juego Ambiental - Nivel 2: El Río</h1>
            <MapaRio increaseGlobalScore={setScore} setFutureResults={setFutureResults} />
            {futureResults && 
            <FutureScene
                results={futureResults!}
                onContinue={levelUp}
              />
            }
          </>
        ) : level === Level.City ? (
          <>
            <h1>🌆 Juego Ambiental - Nivel 3: La Ciudad</h1>
            <MapaCiudad increaseGlobalScore={setScore} setFutureResults={setFutureResults} />
            {futureResults && 
            <FutureScene
              results={futureResults!}
              onContinue={levelUp}
            />
            }
          </>
        ) : (
          <>
            <h1>🌍 Juego Ambiental - Nivel 4: Crisis Global y Colaboración Internacional</h1>
            <MapaCrisisGlobal increaseGlobalScore={setScore} setFutureResults={setFutureResults} />
            {futureResults && 
            <FutureScene
              results={futureResults!}
              onContinue={levelUp}
            />
            }
          </>
        )}
      </div>
    </div>
  );
}

  return null;
}

export default App;
