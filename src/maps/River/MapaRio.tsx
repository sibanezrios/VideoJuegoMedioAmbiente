import React, { useState } from 'react';
import { Howl } from 'howler';
import DecisionPopup from '../../DecisionPopup';
import rio from './assets/mapa_rio.png';
import bosqueIcono from './assets/bosque.png';
import plantaIcono from './assets/planta.png';
import muelleIcono from './assets/rio.png';
import { buildResults } from './results';
import { preguntasYOpciones } from './questions';
import { Future, FutureResults } from '../../constants';
import clickSound from './assets/sounds/select_option.mp3';
import selectOptionSound from './assets/sounds/select_option.mp3';
import confirmSound from './assets/sounds/confirm_sound.mp3';
import futureSound from './assets/sounds/future_sound.mp3';
import { mapaStyle } from './styles/mapaStyle';
import { useTTS } from '../../assets/hooks/useTTS';
import { useTTSContext } from '../../assets/hooks/TTSContext';

interface MapaRioProps {
  currentScore: number;
  setFutureResults: (results: FutureResults) => void;
}

function shuffleOptions(options: { texto: string; valor: string }[]): { texto: string; valor: string }[] {
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const playSound = (soundFile: string) => {
  const sound = new Howl({
    src: [soundFile],
    volume: 0.5,
  });
  sound.play();
};

function MapaRio({ currentScore, setFutureResults }: MapaRioProps) {
  const [ríoDecision, setRíoDecision] = useState<string | null>(null);
  const [bosqueDecision, setBosqueDecision] = useState<string | null>(null);
  const [plantaDecision, setPlantaDecision] = useState<string | null>(null);
  const [popup, setPopup] = useState<null | 'rio' | 'bosque' | 'planta'>(null);
  const [opcionesVisibles, setOpcionesVisibles] = useState<{ texto: string; valor: string }[] | null>(null);

  const { ttsEnabled } = useTTSContext();
  const todasTomadas = ríoDecision && bosqueDecision && plantaDecision;

  function evaluateFuture() {
    let score = 0;
    if (ríoDecision === "limpiar") score++;
    if (plantaDecision === "invertir") score++;
    if (bosqueDecision === "conservar") score++;

    const future = score >= 3 ? Future.VeryGood : score === 2 ? Future.Medium : Future.Bad;
    const results = buildResults(future, score);
    setFutureResults(results);
    playSound(confirmSound);
  }

  // ✅ Texto para lector sincronizado
  let textoParaLeer: string[] = [];
  if (popup && opcionesVisibles && ttsEnabled) {
    const pregunta = preguntasYOpciones[popup].pregunta;
    const opciones = opcionesVisibles.map(o => o.texto);
    textoParaLeer = [pregunta, ...opciones];
  }
  useTTS(textoParaLeer);

  const ICON_OPACITY= 0.8;
  const ICON_SIZE =60;

  return (
    <div style={{ position: 'relative', width: '1024px', margin: 'auto' }}>
      <img src={rio} alt="Mapa del río" style={mapaStyle} />

      {/* Icono bosque */}
      <img
        src={bosqueIcono}
        alt="Bosque"
        className='icono-popup'
        onClick={() => {
          if (!bosqueDecision) {
            const tipo = 'bosque';
            setPopup(tipo);
            setOpcionesVisibles(shuffleOptions(preguntasYOpciones[tipo].opciones));
            playSound(clickSound);
          }
        }}
        style={{
          position: 'absolute',
          top: '150px',
          left: '120px',
          width: `${ICON_SIZE}px`,
          cursor: bosqueDecision ? 'default' : 'pointer',
          display: bosqueDecision ? 'none' : 'block',
          opacity: ICON_OPACITY,
        }}
      />

      {/* Icono planta */}
      <img
        src={plantaIcono}
        alt="Planta industrial"
        className='icono-popup'
        onClick={() => {
          if (!plantaDecision) {
            const tipo = 'planta';
            setPopup(tipo);
            setOpcionesVisibles(shuffleOptions(preguntasYOpciones[tipo].opciones));
            playSound(clickSound);
          }
        }}
        style={{
          position: 'absolute',
          top: '220px',
          right: '200px',
          width: `${ICON_SIZE}px`,
          cursor: plantaDecision ? 'default' : 'pointer',
          display: plantaDecision ? 'none' : 'block',
          opacity: ICON_OPACITY,
        }}
      />

      {/* Icono muelle */}
      <img
        src={muelleIcono}
        alt="Muelle"
        className='icono-popup'
        onClick={() => {
          if (!ríoDecision) {
            const tipo = 'rio';
            setPopup(tipo);
            setOpcionesVisibles(shuffleOptions(preguntasYOpciones[tipo].opciones));
            playSound(clickSound);
          }
        }}
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '170px',
          width: `${ICON_SIZE}px`,
          height: `${ICON_SIZE}px`,
          cursor: ríoDecision ? 'default' : 'pointer',
          display: ríoDecision ? 'none' : 'block',
          opacity: ICON_OPACITY,
        }}
      />

      {/* Popup de decisiones */}
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
            if (popup === 'rio') setRíoDecision(decision);
            if (popup === 'bosque') setBosqueDecision(decision);
            if (popup === 'planta') setPlantaDecision(decision);
            playSound(selectOptionSound);
            setPopup(null);
            setOpcionesVisibles(null);
          }}
        />
      )}

      {/* Botón para evaluar futuro */}
      {todasTomadas && (
        <button
        className='icono-popup'  
        onClick={() => {
            evaluateFuture();
            playSound(futureSound);
          }}
          style={boton}
        >
          Ver Futuro
        </button>
      )}
    </div>
  );
}

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

export default MapaRio;
