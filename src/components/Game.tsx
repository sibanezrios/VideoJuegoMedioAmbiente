import { useState, useEffect } from "react";
import { FutureResults, Level, Fase } from "../constants";
import MapaBarrio from "../maps/Town/MapaBarrio";
import FutureScene from "../FutureScene";
import MapaRio from "../maps/River/MapaRio";
import MapaCiudad from "../maps/City/MapaCiudad";
import MapaCrisisGlobal from "../maps/GlobalCrisis/MapaCrisisGlobal";
import MapaMarte from "../maps/Mars/MapaMarte";
import fondoOscuro from '../assets/fondoOscuro.jpg';
import fondoClaro from '../assets/fondoClaro.jpg';
import { Howl } from "howler";
import musica from '../assets/sounds/background_music.mp3';
import Introduccion from './Context';

interface GameProps {
  onFinish: (progress: number) => void;
}

const levelMaxProgress: Record<Level, number> = {
  [Level.Town]: 20,
  [Level.River]: 40,
  [Level.City]: 60,
  [Level.Global]: 80,
  [Level.Mars]: 100,
};

const Game: React.FC<GameProps> = ({ onFinish }) => {
  const [level, setLevel] = useState<Level>(Level.Town);
  const [futureResults, setFutureResults] = useState<FutureResults | null>(null);
  const [score, setScore] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [comenzarJuego, setComenzarJuego] = useState(false);

  useEffect(() => {
    const music = new Howl({
      src: [musica],
      loop: true,
      volume: 0.3,
    });
  
    music.play();
  
    // Retornar una función de limpieza que detiene la música
    return () => {
      music.stop();
    };
  }, []);
  

  const levelUp = () => {
    if (futureResults) {
      const nextScore = score + futureResults.score;
      setScore(nextScore);

      // Calcular progreso permitido
      const maxProgress = levelMaxProgress[level];
      const newProgress = Math.min(progress + futureResults.score * (20 / 3), maxProgress);
      setProgress(newProgress);
    }

    setFutureResults(null);
    setComenzarJuego(false);

    if (level === Level.Town) setLevel(Level.River);
    else if (level === Level.River) setLevel(Level.City);
    else if (level === Level.City) setLevel(Level.Global);
    else if (level === Level.Global) setLevel(Level.Mars);
    else if (level === Level.Mars) onFinish(progress);
  };

  useEffect(() => {
    if ([Level.River, Level.City, Level.Global, Level.Mars].includes(level)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [level]);

  const empezarJuego = () => {
    setComenzarJuego(true);
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
                {futureResults
                  ? <FutureScene results={futureResults} onContinue={levelUp} />
                  : <MapaBarrio setFutureResults={setFutureResults} currentScore={score} />}
              </>
            )}
            {level === Level.River && (
              <>
                <h1>🌊 Juego Ambiental - Nivel 2: El Río</h1>
                {futureResults
                  ? <FutureScene results={futureResults} onContinue={levelUp} />
                  : <MapaRio setFutureResults={setFutureResults} currentScore={score} />}
              </>
            )}
            {level === Level.City && (
              <>
                <h1>🌆 Juego Ambiental - Nivel 3: La Ciudad</h1>
                {futureResults
                  ? <FutureScene results={futureResults} onContinue={levelUp} />
                  : <MapaCiudad setFutureResults={setFutureResults} currentScore={score} />}
              </>
            )}
            {level === Level.Global && (
              <>
                <h1>🌍 Juego Ambiental - Nivel 4: Crisis Global y Colaboración Internacional</h1>
                {futureResults
                  ? <FutureScene results={futureResults} onContinue={levelUp} />
                  : <MapaCrisisGlobal setFutureResults={setFutureResults} currentScore={score} />}
              </>
            )}
            {level === Level.Mars && (
              <>
                <h1>🚀 Juego Ambiental - Nivel 5: El Último Umbral</h1>
                {futureResults ? (
                  <FutureScene results={futureResults!} onContinue={levelUp} />
                ) : (
                  <MapaMarte currentScore={score} setFutureResults={(results) => {setFutureResults(results); }}
/>

                )}
              </>
            )}
                    </>
        )}
      </div>

      {/* Barra de progreso */}
      <div style={barraContenedor}>
        <div style={{ ...barraEstilo, width: `${progress}%` }} />
        <div style={etiquetaBarra}>Buenas Obras</div>
      </div>
    </div>
  );
};

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
