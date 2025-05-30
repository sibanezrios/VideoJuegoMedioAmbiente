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
    <div style={{ position: 'relative', width: '1024px', margin: 'auto' }}>
      {/* Imagen del mapa de Marte con borde neón */}
      <img src={mapaMarte} alt="Mapa de Marte" style={{ 
        width: '100%', 
        border: '2px solid transparent', 
        boxShadow: '0 0 15px #00ffff, 0 0 30px #00b3b3', // Borde neón en la imagen
        animation: 'neon-flicker 1.5s infinite alternate'
      }} />

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
          top: '150px',  // Posición ajustada para el asentamiento
          left: '100px', // Ajuste de la posición
          width: '80px', // Tamaño ajustado
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
          top: '250px',  // Posición ajustada para los recursos
          right: '120px', // Ajuste de la posición
          width: '80px', // Tamaño ajustado
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
          bottom: '80px',  // Posición ajustada para relaciones internacionales
          left: '300px',   // Ajuste de la posición
          width: '90px',   // Tamaño ajustado
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

      {/* Botón para evaluar el futuro */}
      {todasTomadas && (
        <button onClick={() => {
          evaluarFuturo();
          playSound(futureSound); // Sonido al ver el futuro
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
