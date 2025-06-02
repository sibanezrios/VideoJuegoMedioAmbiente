import React, { useState } from 'react';
import DecisionPopup from '../../DecisionPopup';  // Componente reutilizable de popup
import mapaMarte from './assets/mapa_marte.png';  // Mapa de Marte
import asentamientoIcono from './assets/asentamiento.png';  // Icono de asentamiento
import recursosIcono from './assets/recursos.png';  // Icono de recursos
import relacionesIcono from './assets/relaciones.png';  // Icono de relaciones internacionales
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


interface MapaMarteProps {
  currentScore: number;
  setFutureResults: (results: FutureResults,extraScore: number) => void;
}

function MapaMarte({ currentScore, setFutureResults }: MapaMarteProps){
  const [asentamientoDecision, setAsentamientoDecision] = useState<string | null>(null);
  const [recursosDecision, setRecursosDecision] = useState<string | null>(null);
  const [relacionesDecision, setRelacionesDecision] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [popup, setPopup] = useState<null | 'asentamiento' | 'recursos' | 'relaciones'>(null);
  const [opcionesVisibles, setOpcionesVisibles] = useState<{ texto: string; valor: string }[] | null>(null);

  const todasTomadas = asentamientoDecision && recursosDecision && relacionesDecision;

  const { ttsEnabled } = useTTSContext();

  // Mezcla las opciones una sola vez y guarda el resultado
  function shuffleOptions(options: { texto: string; valor: string }[]) {
    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const playSound = (soundFile: string) => {
    const sound = new Howl({ src: [soundFile], volume: 0.5 });
    sound.play();
  };

  function evaluarFuturo() {
    let score = 0;
    if (asentamientoDecision === 'modular') score++;
    if (asentamientoDecision === 'autosuficiente') score--;
    if (recursosDecision === 'sostenibilidad') score++;
    if (recursosDecision === 'intensiva') score--;
    if (relacionesDecision === 'cooperacion') score++;
    if (relacionesDecision === 'dependencia') score--;

    setProgress(prev => Math.min(prev + 10, 100));
    const future = score >= 3 ? Future.VeryGood : score === 2 ? Future.Medium : Future.Bad;
    const results = buildResults(future, score);
    setFutureResults(results,score);
    playSound(confirmSound);
  }

  // Genera el texto que se debe leer con el TTS
  let textoParaLeer: string[] = [];
  if (popup && opcionesVisibles && ttsEnabled) {
    const pregunta = preguntasYOpciones[popup].pregunta;
    const opciones = opcionesVisibles.map(o => o.texto);
    textoParaLeer = [pregunta, ...opciones];
  }
  useTTS(textoParaLeer);

  const ICON_SIZE = 40;
  const ICON_OPACITY = 0.25;

  return (
    <div style={{ position: 'relative', width: '1024px', margin: 'auto' }}>
      <img src={mapaMarte} alt="Mapa de Marte" style={{
        width: '100%',
        border: '2px solid transparent',
        boxShadow: '0 0 15px #00ffff, 0 0 30px #00b3b3',
        animation: 'neon-flicker 1.5s infinite alternate'
      }} />

      {/* Iconos interactivos */}
      <img
        src={asentamientoIcono}
        alt="Asentamiento"
        className='icono-popup'
        onClick={() => {
          if (!asentamientoDecision) {
            const tipo = 'asentamiento';
            setPopup(tipo);
            setOpcionesVisibles(shuffleOptions(preguntasYOpciones[tipo].opciones));
            playSound(clickSound);
          }
        }}
        style={{
          position: 'absolute', top: '150px', left: '100px',
          width: `${ICON_SIZE}px`,
          cursor: asentamientoDecision ? 'default' : 'pointer',
          display: asentamientoDecision ? 'none' : 'block',
          opacity: ICON_OPACITY,
        }}
      />

      <img
        src={recursosIcono}
        alt="Recursos"
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
          position: 'absolute', top: '250px', right: '120px',
          width: `${ICON_SIZE}px`,
          cursor: recursosDecision ? 'default' : 'pointer',
          display: recursosDecision ? 'none' : 'block',
          opacity: ICON_OPACITY,
        }}
      />

      <img
        src={relacionesIcono}
        alt="Relaciones Internacionales"
        className='icono-popup'
        onClick={() => {
          if (!relacionesDecision) {
            const tipo = 'relaciones';
            setPopup(tipo);
            setOpcionesVisibles(shuffleOptions(preguntasYOpciones[tipo].opciones));
            playSound(clickSound);
          }
        }}
        style={{
          position: 'absolute', bottom: '80px', left: '300px',
          width: `${ICON_SIZE}px`,
          cursor: relacionesDecision ? 'default' : 'pointer',
          display: relacionesDecision ? 'none' : 'block',
          opacity: ICON_OPACITY,
        }}
      />

      {/* Popup con opciones mezcladas */}
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
            if (popup === 'asentamiento') setAsentamientoDecision(decision);
            if (popup === 'recursos') setRecursosDecision(decision);
            if (popup === 'relaciones') setRelacionesDecision(decision);
            playSound(selectOptionSound);
            setPopup(null);
            setOpcionesVisibles(null);
          }}
        />
      )}

      {/* Botón para ver el futuro */}
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

export default MapaMarte;

