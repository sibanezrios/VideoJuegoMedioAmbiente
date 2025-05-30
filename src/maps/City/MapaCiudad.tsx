import React, { useState } from 'react';
import DecisionPopup from '../../DecisionPopup';  // Componente reutilizable de popup 
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

interface MapaCiudadProps {
  currentScore: number;
  setFutureResults: (results: FutureResults) => void;
}

// Función para mezclar las opciones de forma aleatoria
function shuffleOptions(options: { texto: string; valor: string }[]): { texto: string; valor: string }[] {
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
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

function MapaCiudad({ currentScore, setFutureResults }: MapaCiudadProps){
  // Estados para las decisiones
  const [plantaNuclearDecision, setPlantaNuclearDecision] = useState<string | null>(null);
  const [residencialDecision, setResidencialDecision] = useState<string | null>(null);
  const [carreteraDecision, setCarreteraDecision] = useState<string | null>(null);

  // Estado para el popup (interactividad)
  const [popup, setPopup] = useState<null | 'plantaNuclear' | 'residencial' | 'carretera'>(null);

  const todasTomadas = plantaNuclearDecision && residencialDecision && carreteraDecision;

  // Evaluamos el futuro basado en las decisiones y el puntaje
  function evaluarFuturo() {
    let score = 0;

    // Evaluación de la planta nuclear
    if (plantaNuclearDecision === 'invertir') score++;
    if (plantaNuclearDecision === 'cerrar') score--;

    // Evaluación de la zona residencial
    if (residencialDecision === 'conservar') score++;
    if (residencialDecision === 'expandir') score--;

    // Evaluación de las carreteras
    if (carreteraDecision === 'invertir') score++;
    if (carreteraDecision === 'expandir') score--;

    const future = score >= 3 ? Future.VeryGood : score === 2 ? Future.Medium : Future.Bad;
    const results = buildResults(future, score);
    setFutureResults(results);
    
    // Reproducir el sonido de confirmación al ver el futuro
    playSound(confirmSound);
  }

  return (
    <div style={{ position: 'relative', width: '1024px', margin: 'auto' }}>
      {/* Imagen del mapa de la ciudad con borde neón */}
      <img src={ciudadFondo} alt="Mapa de la ciudad" style={{ 
        width: '100%', 
        border: '2px solid transparent', 
        boxShadow: '0 0 15px #00ffff, 0 0 30px #00b3b3', // Borde neón en la imagen
        animation: 'neon-flicker 1.5s infinite alternate'
      }} />

      {/* Elementos interactivos */}
      <img
        src={zonaResidencialIcono}
        alt="Zona residencial"
        onClick={() => {
          if (!residencialDecision) {
            setPopup('residencial');
            playSound(clickSound); // Sonido de clic
          }
        }}
        style={{
          position: 'absolute',
          top: '200px',  // Ajuste de la posición
          left: '100px', // Ajuste de la posición
          width: '90px', // Tamaño ajustado
          cursor: residencialDecision ? 'default' : 'pointer',
          opacity: residencialDecision ? 0.4 : 1,
        }}
      />
      <img
        src={plantaNuclearIcono}
        alt="Planta energética nuclear"
        onClick={() => {
          if (!plantaNuclearDecision) {
            setPopup('plantaNuclear');
            playSound(clickSound); // Sonido de clic
          }
        }}
        style={{
          position: 'absolute',
          top: '150px', 
          right: '120px',  // Ajuste de la posición
          width: '80px',  // Tamaño ajustado
          cursor: plantaNuclearDecision ? 'default' : 'pointer',
          opacity: plantaNuclearDecision ? 0.4 : 1,
        }}
      />
      <img
        src={carreteraIcono}
        alt="Carretera"
        onClick={() => {
          if (!carreteraDecision) {
            setPopup('carretera');
            playSound(clickSound); // Sonido de clic
          }
        }}
        style={{
          position: 'absolute',
          bottom: '80px',  // Ajuste para la parte inferior
          left: '300px',   // Ajuste de la posición
          width: '90px',   // Tamaño ajustado
          cursor: carreteraDecision ? 'default' : 'pointer',
          opacity: carreteraDecision ? 0.4 : 1,
        }}
      />

      {/* Mostrar popup de decisiones */}
      {popup && (
        <DecisionPopup
          tipo={popup}
          pregunta={preguntasYOpciones[popup].pregunta}
          opciones={shuffleOptions(preguntasYOpciones[popup].opciones)} // Revolvemos las opciones
          onClose={() => setPopup(null)}
          onSelect={(decision: string) => {
            if (popup === 'plantaNuclear') setPlantaNuclearDecision(decision);
            if (popup === 'residencial') setResidencialDecision(decision);
            if (popup === 'carretera') setCarreteraDecision(decision);
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
}

// Estilo del botón
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
