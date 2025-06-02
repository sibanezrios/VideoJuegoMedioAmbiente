import React, { useState } from 'react';
import DecisionPopup from '../../DecisionPopup';
import ciudadFondo from './assets/ciudad_mapa.png';
import plantaNuclearIcono from './assets/planta_energetica.png';
import zonaResidencialIcono from './assets/expansion.png';
import carreteraIcono from './assets/transporte.png';
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

interface MapaCiudadProps {
  currentScore: number;
  setFutureResults: (results: FutureResults) => void;
}

const playSound = (soundFile: string) => {
  const sound = new Howl({ src: [soundFile], volume: 0.5 });
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

const MapaCiudad: React.FC<MapaCiudadProps> = ({ currentScore, setFutureResults }) => {
  const [plantaNuclearDecision, setPlantaNuclearDecision] = useState<string | null>(null);
  const [residencialDecision, setResidencialDecision] = useState<string | null>(null);
  const [carreteraDecision, setCarreteraDecision] = useState<string | null>(null);
  const [popup, setPopup] = useState<null | 'plantaNuclear' | 'residencial' | 'carretera'>(null);
  const [opcionesVisibles, setOpcionesVisibles] = useState<{ texto: string; valor: string }[] | null>(null);

  const { ttsEnabled } = useTTSContext();

  const todasTomadas = plantaNuclearDecision && residencialDecision && carreteraDecision;

  let textoParaLeer: string[] = [];
  if (popup && opcionesVisibles && ttsEnabled) {
    const pregunta = preguntasYOpciones[popup].pregunta;
    const opciones = opcionesVisibles.map(o => o.texto);
    textoParaLeer = [pregunta, ...opciones];
  }

  useTTS(textoParaLeer);

  function evaluarFuturo() {
    let score = 0;

    if (plantaNuclearDecision === 'invertir') score++;
    if (plantaNuclearDecision === 'cerrar') score--;
    if (residencialDecision === 'conservar') score++;
    if (residencialDecision === 'expandir') score--;
    if (carreteraDecision === 'invertir') score++;
    if (carreteraDecision === 'expandir') score--;

    const future = score >= 3 ? Future.VeryGood : score === 2 ? Future.Medium : Future.Bad;
    const results = buildResults(future, score);
    setFutureResults(results);
    playSound(confirmSound);
  }

  const ICON_OPACITY = 0.6;
  const ICON_SIZE = 50;

  return (
    <div style={{ position: 'relative', width: '1024px', margin: 'auto' }}>
      <img src={ciudadFondo} alt="Mapa de la ciudad" style={{
        width: '100%',
        border: '2px solid transparent',
        boxShadow: '0 0 15px #00ffff, 0 0 30px #00b3b3',
        animation: 'neon-flicker 1.5s infinite alternate'
      }} />

      <img
        src={zonaResidencialIcono}
        alt="Zona residencial"
        className='icono-popup'
        onClick={() => {
          if (!residencialDecision) {
            const tipo = 'residencial';
            setPopup(tipo);
            setOpcionesVisibles(shuffleOptions(preguntasYOpciones[tipo].opciones));
            playSound(clickSound);
          }
        }}
        style={{
          position: 'absolute',
          top: '200px',
          left: '100px',
          width: `${ICON_SIZE}px`,
          cursor: residencialDecision ? 'default' : 'pointer',
          display: residencialDecision ? 'none' : 'block',
          opacity: ICON_OPACITY,
        }}
      />

      <img
        src={plantaNuclearIcono}
        alt="Planta energética nuclear"
        className='icono-popup'
        onClick={() => {
          if (!plantaNuclearDecision) {
            const tipo = 'plantaNuclear';
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
          cursor: plantaNuclearDecision ? 'default' : 'pointer',
          display: plantaNuclearDecision ? 'none' : 'block',
          opacity: ICON_OPACITY,
        }}
      />

      <img
        src={carreteraIcono}
        alt="Carretera"
        className='icono-popup'
        onClick={() => {
          if (!carreteraDecision) {
            const tipo = 'carretera';
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
          cursor: plantaNuclearDecision ? 'default' : 'pointer',
          display: plantaNuclearDecision ? 'none' : 'block',
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
            if (popup === 'plantaNuclear') setPlantaNuclearDecision(decision);
            if (popup === 'residencial') setResidencialDecision(decision);
            if (popup === 'carretera') setCarreteraDecision(decision);
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

export default MapaCiudad;
