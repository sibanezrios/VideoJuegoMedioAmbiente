import React, { useState } from 'react';
import { Howl } from 'howler';
import DecisionPopup from '../../DecisionPopup'; // Componente reutilizable de popup
import rio from './assets/mapa_rio.png';  // Mapa del río
import bosqueIcono from './assets/bosque.png';  // Icono del bosque
import plantaIcono from './assets/planta.png';  // Icono de la planta industrial
import muelleIcono from './assets/rio.png';  
import { buildResults } from './results';
import { preguntasYOpciones } from './questions';
import { Future, FutureResults } from '../../constants';
import clickSound from './assets/sounds/select_option.mp3';
import selectOptionSound from './assets/sounds/select_option.mp3';
import confirmSound from './assets/sounds/confirm_sound.mp3';
import futureSound from './assets/sounds/future_sound.mp3';
import { mapaStyle } from './styles/mapaStyle';

interface MapaRioProps {
  currentScore: number;
  setFutureResults: (results: FutureResults) => void;
}

// Función para mezclar las opciones de forma aleatoria
function shuffleOptions(options: { texto: string; valor: string }[]): { texto: string; valor: string }[] {
  const shuffled = [...options]; // Hacemos una copia del array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generamos un índice aleatorio
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Intercambiamos los elementos
  }
  return shuffled;
}

// Función central para reproducir sonidos
const playSound = (soundFile: string) => {
  const sound = new Howl({
    src: [soundFile],
    volume: 0.5, // Controlar volumen
  });
  sound.play(); // Reproducir sonido
};

function MapaRio({ currentScore, setFutureResults }: MapaRioProps) {
  // Estados para las decisiones
  const [ríoDecision, setRíoDecision] = useState<string | null>(null);
  const [bosqueDecision, setBosqueDecision] = useState<string | null>(null);
  const [plantaDecision, setPlantaDecision] = useState<string | null>(null);

  // Estado para el popup (interactividad)
  const [popup, setPopup] = useState<null | 'rio' | 'bosque' | 'planta'>(null); // Cambié "río" a "rio"

  const todasTomadas = ríoDecision && bosqueDecision && plantaDecision;

  // Evaluamos el futuro basado en el puntaje
  function evaluateFuture() {
    let score = 0;

    // Evaluación del río
    if (ríoDecision === "limpiar") score++;
    if (plantaDecision === "invertir") score++;
    if (bosqueDecision === "conservar") score++;

    const future = score >= 3 ? Future.VeryGood : score === 2 ? Future.Medium : Future.Bad;
    const results = buildResults(future, score);
    setFutureResults(results);

    // Reproducir el sonido de confirmación
    playSound(confirmSound);
  }

  return (
    <div style={{ position: 'relative', width: '1024px', margin: 'auto' }}>
    <img src={rio} alt="Mapa del río" style={mapaStyle} />

      {/* Elementos interactivos con iconos más pequeños y ubicados de manera estratégica */}
      <img
        src={bosqueIcono}
        alt="Bosque"
        onClick={() => {
          if (!bosqueDecision) {
            setPopup('bosque');
            playSound(clickSound); // Sonido de clic
          }
        }}
        style={{
          position: 'absolute',
          top: '150px', // Ajuste basado en el mapa original
          left: '120px', // Ubicación ajustada para que quede en la zona del bosque
          width: '70px', // Tamaño ajustado para que sea discreto
          cursor: bosqueDecision ? 'default' : 'pointer',
          opacity: bosqueDecision ? 0.4 : 1
        }}
      />
      <img
        src={plantaIcono}
        alt="Planta industrial"
        onClick={() => {
          if (!plantaDecision) {
            setPopup('planta');
            playSound(clickSound); // Sonido de clic
          }
        }}
        style={{
          position: 'absolute',
          top: '220px', // Ajuste basado en el mapa original
          right: '180px', // Ubicación ajustada para que quede en la zona industrial
          width: '80px', // Tamaño ajustado para que sea discreto
          cursor: plantaDecision ? 'default' : 'pointer',
          opacity: plantaDecision ? 0.4 : 1
        }}
      />
      <img
        src={muelleIcono}
        alt="Muelle"
        onClick={() => {
          if (!ríoDecision) {
            setPopup('rio'); 
            playSound(clickSound); // Sonido de clic
          }
        }}
        style={{
          position: 'absolute',
          bottom: '100px', // Ajuste de la posición en la parte inferior
          left: '350px', // Ubicación ajustada cerca del río
          width: '80px', // Tamaño ajustado para que sea discreto
          cursor: ríoDecision ? 'default' : 'pointer',
          opacity: ríoDecision ? 0.4 : 1
        }}
      />
      {/* Mostrar popup de decisiones */}
      {popup && (
        <DecisionPopup
          tipo={popup === 'rio' ? 'rio' : popup === 'bosque' ? 'bosque' : 'planta'}
          pregunta={preguntasYOpciones[popup].pregunta}
          opciones={shuffleOptions(preguntasYOpciones[popup].opciones)} // Revolvemos las opciones
          onClose={() => setPopup(null)}
          onSelect={(decision: string) => {
            if (popup === 'rio') setRíoDecision(decision);
            if (popup === 'bosque') setBosqueDecision(decision);
            if (popup === 'planta') setPlantaDecision(decision);
            playSound(selectOptionSound); // Sonido al seleccionar opción
            setPopup(null);
          }}
        />
      )}

      {/* Botón para evaluar el futuro */}
      {todasTomadas && (
        <button
          onClick={() => {
            evaluateFuture();
            playSound(futureSound); // Sonido al ver el futuro
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
