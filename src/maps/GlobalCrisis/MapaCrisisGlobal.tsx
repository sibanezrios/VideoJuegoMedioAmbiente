import React, { useState } from 'react';
import DecisionPopup from '../../DecisionPopup';  // Componente reutilizable de popup 
import mundoFondo from './assets/mundo_mapa.png';
import clima from './assets/clima.png';
import pandemia from './assets/pandemia.png';
import personas from './assets/personas.png';
import salud from './assets/salud.png';
import renovable from './assets/renovable.png';
import { Future, FutureResults } from '../../constants';
import { buildResults } from './results';
import { preguntasYOpciones } from './questions';
import clickSound from './assets/sounds/select_option.mp3';
import selectOptionSound from './assets/sounds/select_option.mp3';
import confirmSound from './assets/sounds/confirm_sound.mp3';
import futureSound from './assets/sounds/future_sound.mp3';
import { Howl } from 'howler';

interface MapaCrisisGlobalProps {
  setFutureResults: (results: FutureResults) => void;
  currentScore: number;
}

// Función para reproducir los sonidos
const playSound = (soundFile: string) => {
  const sound = new Howl({
    src: [soundFile],
    volume: 0.5, // Controlar volumen
  });
  sound.play(); // Reproducir sonido
};

function MapaCrisisGlobal({ currentScore, setFutureResults }: MapaCrisisGlobalProps){
  const [cambioClimaticoDecision, setCambioClimaticoDecision] = useState<string | null>(null);
  const [pandemiaDecision, setPandemiaDecision] = useState<string | null>(null);
  const [recursosDecision, setRecursosDecision] = useState<string | null>(null);

  const [popup, setPopup] = useState<null | 'cambioClimatico' | 'pandemia' | 'recursos'>(null);

  const todasTomadas = cambioClimaticoDecision && pandemiaDecision && recursosDecision;

  // Evaluamos el futuro basado en las decisiones y el puntaje
  function evaluarFuturo() {
    let score = 0;

    // Evaluación del cambio climático
    if (cambioClimaticoDecision === 'acuerdo') {
      score++;
    }

    // Evaluación de la pandemia
    if (pandemiaDecision === 'cooperacion') {
      score++;
    }

    // Evaluación de los recursos naturales
    if (recursosDecision === 'distribucion') {
      score++;
    }

    const future = score >= 3 ? Future.VeryGood : score === 2 ? Future.Medium : Future.Bad;
    const results = buildResults(future, score);
    setFutureResults(results);
    playSound(confirmSound); // Sonido al ver el futuro
  }

  return (
    <div style={{ position: 'relative', width: '768px', margin: 'auto' }}>
      <img src={mundoFondo} alt="Mapa del mundo" style={{ width: '100%' }} />

      {/* Elementos interactivos */}
      <img
        src={clima}
        alt="Cambio climático"
        onClick={() => {
          if (!cambioClimaticoDecision) {
            setPopup('cambioClimatico');
            playSound(clickSound); // Sonido de clic
          }
        }}
        style={{
          position: 'absolute',
          top: '100px',
          left: '50px',
          width: '90px',
          cursor: cambioClimaticoDecision ? 'default' : 'pointer',
          opacity: cambioClimaticoDecision ? 0.4 : 1
        }}
      />
      <img
        src={pandemia}
        alt="Pandemia"
        onClick={() => {
          if (!pandemiaDecision) {
            setPopup('pandemia');
            playSound(clickSound); // Sonido de clic
          }
        }}
        style={{
          position: 'absolute',
          top: '150px',
          right: '120px',
          width: '80px',
          cursor: pandemiaDecision ? 'default' : 'pointer',
          opacity: pandemiaDecision ? 0.4 : 1
        }}
      />
      <img
        src={renovable}
        alt="Recursos naturales"
        onClick={() => {
          if (!recursosDecision) {
            setPopup('recursos');
            playSound(clickSound); // Sonido de clic
          }
        }}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '300px',
          width: '90px',
          cursor: recursosDecision ? 'default' : 'pointer',
          opacity: recursosDecision ? 0.4 : 1
        }}
      />

      {/* Mostrar popup de decisiones */}
      {popup && (
        <DecisionPopup
          tipo={popup}
          pregunta={preguntasYOpciones[popup].pregunta}
          opciones={preguntasYOpciones[popup].opciones}
          onClose={() => setPopup(null)}
          onSelect={(decision: string) => {
            if (popup === 'cambioClimatico') setCambioClimaticoDecision(decision);
            if (popup === 'pandemia') setPandemiaDecision(decision);
            if (popup === 'recursos') setRecursosDecision(decision);
            playSound(selectOptionSound); // Sonido al seleccionar opción
            setPopup(null);
          }}
        />
      )}

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

export default MapaCrisisGlobal;
