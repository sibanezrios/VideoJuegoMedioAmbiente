import React, { useState } from 'react';
import { Howl } from 'howler';
import DecisionPopup from '../../DecisionPopup';
import mapa from './assets/mapa_inicial.png';
import arbolIcono from './assets/arbol.png';
import fabricaIcono from './assets/fabrica.png';
import loteIcono from './assets/lote.png';
import { Future, FutureResults } from '../../constants';
import { buildResults } from './results';
import { preguntasYOpciones } from './questions';
import clickSound from './assets/sounds/select_option.mp3';
import selectOptionSound from './assets/sounds/select_option.mp3';
import confirmSound from './assets/sounds/confirm_sound.mp3';
import futureSound from './assets/sounds/future_sound.mp3';
import { mapaStyle } from './styles/mapaStyle';
import { useTTS } from '../../assets/hooks/useTTS';
import { useTTSContext } from '../../assets/hooks/TTSContext';

interface MapaBarrioProps {
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

function MapaBarrio({ currentScore, setFutureResults }: MapaBarrioProps) {
  const [arbolDecision, setArbolDecision] = useState<string | null>(null);
  const [fabricaDecision, setFabricaDecision] = useState<string | null>(null);
  const [loteDecision, setLoteDecision] = useState<string | null>(null);
  const [popup, setPopup] = useState<null | 'arbol' | 'fabrica' | 'lote'>(null);
  const [opcionesVisibles, setOpcionesVisibles] = useState<{ texto: string; valor: string }[] | null>(null);

  const { ttsEnabled } = useTTSContext();
  const todasTomadas = arbolDecision && fabricaDecision && loteDecision;

  function evaluateFuture() {
    let score = 0;
    if (arbolDecision === 'conservar') score++;
    if (fabricaDecision === 'modernizar') score++;
    if (loteDecision === 'parque') score++;

    const future = score >= 3 ? Future.VeryGood : score === 2 ? Future.Medium : Future.Bad;
    const results = buildResults(future, score);
    setFutureResults(results);

    playSound(confirmSound);
  }

  // ✅ Generar texto para lectura sincronizada
  let textoParaLeer: string[] = [];
  if (popup && opcionesVisibles && ttsEnabled) {
    const pregunta = preguntasYOpciones[popup].pregunta;
    const opciones = opcionesVisibles.map(o => o.texto);
    textoParaLeer = [pregunta, ...opciones];
  }
  useTTS(textoParaLeer);


  const ICON_SIZE = 70; // Barrio
  const ICON_OPACITY = 1;
  

  return (
    <div style={{ position: 'relative', width: '1024px', margin: 'auto' }}>
      <img src={mapa} alt="Mapa del barrio" style={mapaStyle} />

      {/* Icono árbol */}
      <img
        src={arbolIcono}
        alt="Árbol"
        onClick={() => {
          if (!arbolDecision) {
            const tipo = 'arbol';
            setPopup(tipo);
            setOpcionesVisibles(shuffleOptions(preguntasYOpciones[tipo].opciones));
            playSound(clickSound);
          }
        }}
        style={{
          position: 'absolute',
          top: '250px',
          left: '150px',
          width: `${ICON_SIZE}px`,
          height: `${ICON_SIZE}px`,
          cursor: arbolDecision ? 'default' : 'pointer',
          display: arbolDecision ? 'none' : 'block',
          opacity: ICON_OPACITY,
        }}
      />

      {/* Icono fábrica */}
      <img
        src={fabricaIcono}
        alt="Fábrica"
        onClick={() => {
          if (!fabricaDecision) {
            const tipo = 'fabrica';
            setPopup(tipo);
            setOpcionesVisibles(shuffleOptions(preguntasYOpciones[tipo].opciones));
            playSound(clickSound);
          }
        }}
        style={{
          position: 'absolute',
          top: '200px',
          right: '150px',
          width: `${ICON_SIZE}px`,
          height: `${ICON_SIZE}px`,
          cursor: fabricaDecision ? 'default' : 'pointer',
          display: fabricaDecision ? 'none' : 'block',
          opacity: ICON_OPACITY,
        }}
      />

      {/* Icono lote */}
      <img
        src={loteIcono}
        alt="Lote Baldío"
        onClick={() => {
          if (!loteDecision) {
            const tipo = 'lote';
            setPopup(tipo);
            setOpcionesVisibles(shuffleOptions(preguntasYOpciones[tipo].opciones));
            playSound(clickSound);
          }
        }}
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '400px',
          width: `${ICON_SIZE}px`,
          height: `${ICON_SIZE}px`,
          cursor: loteDecision ? 'default' : 'pointer',
          display: loteDecision ? 'none' : 'block',
          opacity: ICON_OPACITY,
        }}
      />

      {/* Popup de decisión */}
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
            if (popup === 'arbol') setArbolDecision(decision);
            if (popup === 'fabrica') setFabricaDecision(decision);
            if (popup === 'lote') setLoteDecision(decision);
            playSound(selectOptionSound);
            setPopup(null);
            setOpcionesVisibles(null);
          }}
        />
      )}

      {/* Botón para ver el futuro */}
      {todasTomadas && (
        <button
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

export default MapaBarrio;
