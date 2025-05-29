import { useEffect, useState } from "react";
import { FutureResults, Level } from "../constants";
import MapaBarrio from "../maps/Town/MapaBarrio";
import FutureScene from "../FutureScene";
import MapaRio from "../maps/River/MapaRio";
import MapaCiudad from "../maps/City/MapaCiudad";
import MapaCrisisGlobal from "../maps/GlobalCrisis/MapaCrisisGlobal";
import MapaMarte from "../maps/Mars/MapaMarte";
import fondoOscuro from '../assets/fondoOscuro.jpg';
import fondoClaro from '../assets/fondoClaro.jpg';

function Game() {
  const [level, setLevel] = useState<Level>(Level.Town);
  const [futureResults, setFutureResults] = useState<FutureResults | null>(null);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0); // Estado de la barra de progreso

  const levelUp = () => {
    setFutureResults(null);
    if (level === Level.Town) setLevel(Level.River); // Avanza del nivel 1 al 2
    if (level === Level.River) setLevel(Level.City); // Avanza del nivel 2 al 3
    if (level === Level.City) setLevel(Level.Global); // Avanza del nivel 3 al 4
    if (level === Level.Global) setLevel(Level.Mars); // Avanza del nivel 4 al 5 (Marte)
  };

  // 👉 Scroll al top cuando entras al nivel 2, 3, 4 o 5
  useEffect(() => {
    if (level === Level.River || level === Level.City || level === Level.Global || level === Level.Mars) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [level]);

  return (<div className="nivel-con-fondo">
    <img src={fondoOscuro} alt="Fondo oscuro" className="imagen-incendio" />
    <img src={fondoClaro} alt="Fondo claro" className="imagen-bosque" />

    <div className="contenido-nivel">
        {level === Level.Town ? (
        <>
          <h1>🌱 Juego Ambiental - Nivel 1: El Barrio</h1>
          {futureResults ? (
            <FutureScene results={futureResults!} onContinue={levelUp} />
          ) : (
            <MapaBarrio increaseGlobalScore={setScore} setFutureResults={setFutureResults} setProgress={setProgress} />
          )}
        </>
      ) : level === Level.River ? (
        <>
          <h1>🌊 Juego Ambiental - Nivel 2: El Río</h1>
          <MapaRio increaseGlobalScore={setScore} setFutureResults={setFutureResults} />
          {futureResults && <FutureScene results={futureResults!} onContinue={levelUp} />}
        </>
      ) : level === Level.City ? (
        <>
          <h1>🌆 Juego Ambiental - Nivel 3: La Ciudad</h1>
          <MapaCiudad increaseGlobalScore={setScore} setFutureResults={setFutureResults} />
          {futureResults && <FutureScene results={futureResults!} onContinue={levelUp} />}
        </>
      ) : level === Level.Global ? (
        <>
          <h1>🌍 Juego Ambiental - Nivel 4: Crisis Global y Colaboración Internacional</h1>
          <MapaCrisisGlobal increaseGlobalScore={setScore} setFutureResults={setFutureResults} />
          {futureResults && <FutureScene results={futureResults!} onContinue={levelUp} />}
        </>
      ) : (
        <>
          <h1>🚀 Juego Ambiental - Nivel 5: El Último Umbral: Evitar la Autodestrucción Global</h1>
          <MapaMarte increaseGlobalScore={setScore} setFutureResults={setFutureResults} />
          {futureResults && <FutureScene results={futureResults!} onContinue={levelUp} />}
        </>
      )}
    </div>

    {/* Barra de progreso global */}
    <div style={{ width: '100%', height: '10px', backgroundColor: '#ccc' }}>
      <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#4CAF50' }}></div>
    </div>
  </div>)
}

export default Game;