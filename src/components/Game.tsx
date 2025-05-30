import { useState, useEffect } from "react";
import { FutureResults, Level } from "../constants";
import MapaBarrio from "../maps/Town/MapaBarrio";
import FutureScene from "../FutureScene";
import MapaRio from "../maps/River/MapaRio";
import MapaCiudad from "../maps/City/MapaCiudad";
import MapaCrisisGlobal from "../maps/GlobalCrisis/MapaCrisisGlobal";
import MapaMarte from "../maps/Mars/MapaMarte";
import fondoOscuro from '../assets/fondoOscuro.jpg';
import fondoClaro from '../assets/fondoClaro.jpg';
import { Howl } from "howler"; // Importar howler para la música
import musica from '../assets/sounds/background_music.mp3';
import Introduccion from './Context'; // Importamos el componente de introducción

function Game() {
  const [level, setLevel] = useState<Level>(Level.Town); // Nivel inicial
  const [futureResults, setFutureResults] = useState<FutureResults | null>(null);
  const [score, setScore] = useState<number>(0);
  const [progress, setProgress] = useState(0); // Barra de progreso de buenas obras
  const [comenzarJuego, setComenzarJuego] = useState(false); // Estado para mostrar la introducción

  // Reproducir música de fondo
  useEffect(() => {
    const music = new Howl({
      src: [musica], // Ruta de la música de fondo
      loop: true, // Reproduce en loop
      volume: 0.3, // Controla el volumen
    });

    music.play(); // Reproducir música cuando el componente se monte

    return () => {
      music.stop(); // Detener la música cuando el componente se desmonte
    };
  }, []);

  // Actualizamos la barra de buenas obras cada vez que el score cambia
  useEffect(() => {
    setProgress((prevProgress) => Math.min(prevProgress + score * 10, 100)); // La barra se suma con cada decisión
  }, [score]);

  // Avanzar al siguiente nivel
  const levelUp = () => {
    if (futureResults) {
      setScore(score + futureResults?.score);
    }
    setFutureResults(null);

    // Al avanzar de nivel, reiniciar el estado de empezar juego para mostrar la introducción
    setComenzarJuego(false);

    if (level === Level.Town) setLevel(Level.River); // Avanza del nivel 1 al 2
    if (level === Level.River) setLevel(Level.City); // Avanza del nivel 2 al 3
    if (level === Level.City) setLevel(Level.Global); // Avanza del nivel 3 al 4
    if (level === Level.Global) setLevel(Level.Mars); // Avanza del nivel 4 al 5 (Marte)
    if (level === Level.Mars) setLevel(Level.Town);
  };

  // 👉 Scroll al top cuando entras al nivel 2, 3, 4 o 5
  useEffect(() => {
    if (level === Level.River || level === Level.City || level === Level.Global || level === Level.Mars) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [level]);

  const empezarJuego = () => {
    setComenzarJuego(true); // Inicia el juego después de la introducción
  };

  return (
    <div className="nivel-con-fondo">
      <img src={fondoOscuro} alt="Fondo oscuro" className="imagen-incendio" />
      <img src={fondoClaro} alt="Fondo claro" className="imagen-bosque" />

      <div className="contenido-nivel">
        {!comenzarJuego ? (
          <Introduccion nivel={level} onStart={empezarJuego} />
        ) : (
          <>
            {level === Level.Town && (
              <>
                <h1>🌱 Juego Ambiental - Nivel 1: El Barrio</h1>
                {futureResults ? (
                  <FutureScene results={futureResults!} onContinue={levelUp} />
                ) : (
                  <MapaBarrio setFutureResults={setFutureResults} currentScore={score} />
                )}
              </>
            )}
            {level === Level.River && (
              <>
                <h1>🌊 Juego Ambiental - Nivel 2: El Río</h1>
                {futureResults ? (
                  <FutureScene results={futureResults!} onContinue={levelUp} />
                ) : (
                  <MapaRio setFutureResults={setFutureResults} currentScore={score} />
                )}
              </>
            )}
            {level === Level.City && (
              <>
                <h1>🌆 Juego Ambiental - Nivel 3: La Ciudad</h1>
                {futureResults ? (
                  <FutureScene results={futureResults!} onContinue={levelUp} />
                ) : (
                  <MapaCiudad setFutureResults={setFutureResults} currentScore={score} />
                )}
              </>
            )}
            {level === Level.Global && (
              <>
                <h1>🌍 Juego Ambiental - Nivel 4: Crisis Global y Colaboración Internacional</h1>
                {futureResults ? (
                  <FutureScene results={futureResults!} onContinue={levelUp} />
                ) : (
                  <MapaCrisisGlobal setFutureResults={setFutureResults} currentScore={score} />
                )}
              </>
            )}
            {level === Level.Mars && (
              <>
                <h1>🚀 Juego Ambiental - Nivel 5: El Último Umbral: Evitar la Autodestrucción Global</h1>
                {futureResults ? (
                  <FutureScene results={futureResults!} onContinue={levelUp} />
                ) : (
                  <MapaMarte setFutureResults={setFutureResults} currentScore={score} />
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Barra de Progreso de Buenas Obras */}
      <div style={barraContenedor}>
        <div style={{ ...barraEstilo, width: `${progress}%` }} />
        <div style={etiquetaBarra}>Buenas Obras</div>
      </div>
    </div>
  );
}

// Estilos CSS en línea para la barra
const barraContenedor: React.CSSProperties = {
  position: 'fixed',
  top: '20px',
  right: '20px',
  width: '200px',
  height: '20px',
  backgroundColor: '#e0e0e0',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
};

const barraEstilo: React.CSSProperties = {
  height: '100%',
  backgroundColor: '#4CAF50',
  borderRadius: '10px',
  transition: 'width 0.3s ease',
};

const etiquetaBarra: React.CSSProperties = {
  position: 'absolute',
  top: '25px',
  right: '5px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '0.9rem',
};

export default Game;
