import React, { useState } from 'react';
import DecisionPopup from '../../DecisionPopup';
import mundoFondo from './assets/mundo_mapa.png';
import clima from './assets/clima.png';
import pandemia from './assets/pandemia.png';
import renovable from './assets/renovable.png';
import { Future, FutureResults } from '../../constants';
import { buildResults } from './results';
import { preguntasYOpciones } from './questions';
import clickSound from './assets/sounds/select_option.mp3';
import selectOptionSound from './assets/sounds/select_option.mp3';
import confirmSound from './assets/sounds/confirm_sound.mp3';
import futureSound from './assets/sounds/future_sound.mp3';
import { Howl } from 'howler';
import { useTTSContext } from '../../assets/hooks/TTSContext'; 
import { useTTS } from '../../assets/hooks/useTTS'; 

interface MapaCrisisGlobalProps {
  setFutureResults: (results: FutureResults) => void;
  currentScore: number;
}

const playSound = (soundFile: string) => {
  const sound = new Howl({
    src: [soundFile],
    volume: 0.5,
  });
  sound.play();
};

function shuffleOptions(options: { texto: string; valor: string }[]) {
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const MapaCrisisGlobal: React.FC<MapaCrisisGlobalProps> = ({ currentScore, setFutureResults }) => {
  const [cambioClimaticoDecision, setCambioClimaticoDecision] = useState<string | null>(null);
  const [pandemiaDecision, setPandemiaDecision] = useState<string | null>(null);
  const [recursosDecision, setRecursosDecision] = useState<string | null>(null);
  const [popup, setPopup] = useState<null | 'cambioClimatico' | 'pandemia' | 'recursos'>(null);
  const [opcionesVisibles, setOpcionesVisibles] = useState<{ texto: string; valor: string }[] | null>(null);

  const todasTomadas = cambioClimaticoDecision && pandemiaDecision && recursosDecision;

  const { ttsEnabled } = useTTSContext();
  let textoParaLeer: string[] = [];

  if (popup && opcionesVisibles && ttsEnabled) {
    const pregunta = preguntasYOpciones[popup].pregunta;
    const opciones = opcionesVisibles.map(o => o.texto);
    textoParaLeer = [pregunta, ...opciones];
  }

  useTTS(textoParaLeer);

  function evaluarFuturo() {
    let score = 0;
    if (cambioClimaticoDecision === 'acuerdo') score++;
    if (pandemiaDecision === 'cooperacion') score++;
    if (recursosDecision === 'distribucion') score++;

    const future = score >= 3 ? Future.VeryGood : score === 2 ? Future.Medium : Future.Bad;
    const results = buildResults(future, score);
    setFutureResults(results);
    playSound(confirmSound);
  }

  const ICON_OPACITY = 0.4;
  const ICON_SIZE = 40;

  return (
    <div style={{ position: 'relative', width: '1024px', margin: 'auto'  }}>
      <img src={mundoFondo} alt="Mapa del mundo" style={{
        width: '100%',
        border: '2px solid transparent',
        boxShadow: '0 0 15px #00ffff, 0 0 30px #00b3b3',
        animation: 'neon-flicker 1.5s infinite alternate'
      }} />

      <img
        src={clima}
        alt="Cambio climático"
        className='icono-popup'
        onClick={() => {
          if (!cambioClimaticoDecision) {
            const tipo = 'cambioClimatico';
            setPopup(tipo);
            setOpcionesVisibles(shuffleOptions(preguntasYOpciones[tipo].opciones));
            playSound(clickSound);
          }
        }}
        style={{
          position: 'absolute',
          top: '100px',
          left: '50px',
          width: `${ICON_SIZE}px`,
          cursor: cambioClimaticoDecision ? 'default' : 'pointer',
          display: cambioClimaticoDecision ? 'none' : 'block',
          opacity: ICON_OPACITY,
        }}
      />

      <img
        src={pandemia}
        alt="Pandemia"
        className='icono-popup'
        onClick={() => {
          if (!pandemiaDecision) {
            const tipo = 'pandemia';
            setPopup(tipo);
            setOpcionesVisibles(shuffleOptions(preguntasYOpciones[tipo].opciones));
            playSound(clickSound);
          }
        }}
        style={{
          position: 'absolute',
          top: '150px',
          right: '120px',
          width: `${ICON_SIZE}px`,
          cursor: pandemiaDecision ? 'default' : 'pointer',
          display: pandemiaDecision ? 'none' : 'block',
          opacity: ICON_OPACITY,
        }}
      />

      <img
        src={renovable}
        alt="Recursos naturales"
        className='icono-popup'
        onClick={() => {
          if (!recursosDecision) {
            const tipo = 'recursos';
            setPopup(tipo);
            setOpcionesVisibles(shuffleOptions(preguntasYOpciones[tipo].opciones));
            playSound(clickSound);
          }
        }}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '300px',
          width: `${ICON_SIZE}px`,
          cursor: recursosDecision ? 'default' : 'pointer',
          display: recursosDecision ? 'none' : 'block',
          opacity: ICON_OPACITY,
        }}
      />

      {popup && opcionesVisibles && (
        <DecisionPopup
          tipo={popup}
          pregunta={preguntasYOpciones[popup].pregunta}
          opciones={opcionesVisibles}
          onClose={() => {
            setPopup(null);
            setOpcionesVisibles(null);
          }}
          onSelect={(decision: string) => {
            if (popup === 'cambioClimatico') setCambioClimaticoDecision(decision);
            if (popup === 'pandemia') setPandemiaDecision(decision);
            if (popup === 'recursos') setRecursosDecision(decision);
            playSound(selectOptionSound);
            setPopup(null);
            setOpcionesVisibles(null);
          }}
        />
      )}

      {todasTomadas && (
        <button onClick={() => {
          evaluarFuturo();
          playSound(futureSound);
        }} style={boton}>
          Ver Futuro
        </button>
      )}
    </div>
  );
};

const boton: React.CSSProperties = {
  marginTop: '1rem',
  padding: '12px 28px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  borderRadius: '10px',
  background: 'linear-gradient(145deg, #00ffcc, #00b3b3)',
  color: '#000',
  border: '2px solid #00ffff',
  boxShadow: '0 0 12px rgba(0, 255, 255, 0.4), inset 0 0 6px rgba(0, 255, 255, 0.6)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

export default MapaCrisisGlobal;
