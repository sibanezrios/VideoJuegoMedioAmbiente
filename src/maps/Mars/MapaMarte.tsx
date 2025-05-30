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

interface MapaMarteProps {
  setFutureResults: (results: FutureResults) => void;
  currentScore: number;
}

const MapaMarte: React.FC<MapaMarteProps> = ({ setFutureResults, currentScore }) => {
  const [asentamientoDecision, setAsentamientoDecision] = useState<string | null>(null);
  const [recursosDecision, setRecursosDecision] = useState<string | null>(null);
  const [relacionesDecision, setRelacionesDecision] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);  // Barra de progreso

  const [popup, setPopup] = useState<null | 'asentamiento' | 'recursos' | 'relaciones'>(null);

  const todasTomadas = asentamientoDecision && recursosDecision && relacionesDecision;

  // Evaluamos el futuro basado en las decisiones y el puntaje
  function evaluarFuturo() {
    let score = 0;

    // Evaluación del asentamiento
    if (asentamientoDecision === 'modular') score++;
    if (asentamientoDecision === 'autosuficiente') score--;

    // Evaluación de los recursos
    if (recursosDecision === 'sostenibilidad') score++;
    if (recursosDecision === 'intensiva') score--;

    // Evaluación de las relaciones
    if (relacionesDecision === 'cooperacion') score++;
    if (relacionesDecision === 'dependencia') score--;

    setProgress(prevProgress => Math.min(prevProgress + 10, 100));  // Incrementar la barra de progreso

    const future = score >= 3 ? Future.VeryGood : score === 2 ? Future.Medium : Future.Bad;
    const results = buildResults(future, score);
    setFutureResults(results);

    // Reproducir el sonido al ver el futuro
    playSound(confirmSound); 
  }

  // Función shuffle para mezclar las opciones de manera aleatoria
  function shuffleOptions(options: { texto: string; valor: string }[]): { texto: string; valor: string }[] {
    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Función para reproducir los sonidos
  const playSound = (soundFile: string) => {
    const sound = new Howl({
      src: [soundFile],
      volume: 0.5,
    });
    sound.play();
  };

  return (
    <div style={{ position: 'relative', width: '768px', margin: 'auto' }}>
      <img src={mapaMarte} alt="Mapa de Marte" style={{ width: '100%' }} />

      {/* Elementos interactivos */}
      <img
        src={asentamientoIcono}
        alt="Asentamiento"
        onClick={() => {
          if (!asentamientoDecision) {
            setPopup('asentamiento');
            playSound(clickSound); // Sonido de clic
          }
        }}
        style={{
          position: 'absolute',
          top: '150px',
          left: '100px',
          width: '80px',
          cursor: asentamientoDecision ? 'default' : 'pointer',
          opacity: asentamientoDecision ? 0.4 : 1
        }}
      />
      <img
        src={recursosIcono}
        alt="Recursos"
        onClick={() => {
          if (!recursosDecision) {
            setPopup('recursos');
            playSound(clickSound); // Sonido de clic
          }
        }}
        style={{
          position: 'absolute',
          top: '250px',
          right: '120px',
          width: '80px',
          cursor: recursosDecision ? 'default' : 'pointer',
          opacity: recursosDecision ? 0.4 : 1
        }}
      />
      <img
        src={relacionesIcono}
        alt="Relaciones Internacionales"
        onClick={() => {
          if (!relacionesDecision) {
            setPopup('relaciones');
            playSound(clickSound); // Sonido de clic
          }
        }}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '300px',
          width: '90px',
          cursor: relacionesDecision ? 'default' : 'pointer',
          opacity: relacionesDecision ? 0.4 : 1
        }}
      />

      {/* Mostrar popup de decisiones */}
      {popup && (
        <DecisionPopup
          tipo={popup}
          pregunta={preguntasYOpciones[popup].pregunta}
          opciones={shuffleOptions(preguntasYOpciones[popup].opciones)} // Opciones aleatorias
          onClose={() => setPopup(null)}
          onSelect={(decision: string) => {
            if (popup === 'asentamiento') setAsentamientoDecision(decision);
            if (popup === 'recursos') setRecursosDecision(decision);
            if (popup === 'relaciones') setRelacionesDecision(decision);
            playSound(selectOptionSound); // Sonido al seleccionar opción
            setPopup(null);
          }}
        />
      )}

      {/* Barra de progreso */}
      <div style={{ width: '100%', height: '10px', backgroundColor: '#ccc' }}>
        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#4CAF50' }}></div>
      </div>

      {/* Botón para evaluar el futuro */}
      {todasTomadas && (
        <button
          onClick={() => {
            evaluarFuturo();
            playSound(futureSound); // Sonido al ver el futuro
          }}
          style={{ marginTop: '20px' }}
        >
          Ver Futuro
        </button>
      )}
    </div>
  );
};

export default MapaMarte;
