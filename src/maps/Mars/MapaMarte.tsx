import React, { useState } from 'react';
import DecisionPopup from '../../DecisionPopup';  // Componente reutilizable de popup
import muyBueno5 from './assets/futuro_bueno_marte.png';  // Imagen para el futuro bueno
import medio5 from './assets/futuro_medio_marte.png';  // Imagen para el futuro medio
import malo5 from './assets/futuro_malo_marte.png';  // Imagen para el futuro malo
import mapaMarte from './assets/mapa_marte.png';  // Mapa de Marte
import asentamientoIcono from './assets/asentamiento.png';  // Icono de asentamiento
import recursosIcono from './assets/recursos.png';  // Icono de recursos
import relacionesIcono from './assets/relaciones.png';  // Icono de relaciones internacionales
import { Future, FutureResults } from '../../constants';

interface MapaMarteProps {
  setFutureResults: (results: FutureResults) => void;
  currentScore: number;
}

const MapaMarte: React.FC<MapaMarteProps> = ({ setFutureResults,currentScore }) => {
  const [asentamientoDecision, setAsentamientoDecision] = useState<string | null>(null);
  const [recursosDecision, setRecursosDecision] = useState<string | null>(null);
  const [relacionesDecision, setRelacionesDecision] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);  // Barra de progreso

  const [popup, setPopup] = useState<null | 'asentamiento' | 'recursos' | 'relaciones'>(null);

  const todasTomadas = asentamientoDecision && recursosDecision && relacionesDecision;

  function buildResults(type: Future, score: number): FutureResults {
    switch(type) {
      case Future.VeryGood:
        return {
          message: `¡Marte ha prosperado! 🌍🌱`,
          image: muyBueno5,
          type,
          score,
          title: 'El futuro de Marte es autosuficiente y sostenible'
        }
      case Future.Medium:
        return {
          message: `Marte está en proceso de crecimiento. 🌱`,
          image: medio5,
          type,
          score,
          title: 'El futuro de Marte está en transición, pero aún hay desafíos'
        }
      default:
        return {
          message: `Marte enfrenta grandes desafíos. 💔`,
          image: malo5,
          type,
          score,
          title: 'El futuro de Marte está en peligro debido a malas decisiones'
        }
    }
  }

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

  // Opciones para las decisiones del jugador
  const preguntasYOpciones = {
    asentamiento: {
      pregunta: "¿Cómo construirás los primeros asentamientos en Marte?",
      opciones: [
        { texto: "Construir grandes asentamientos autosuficientes con alta comodidad", valor: "autosuficiente" },
        { texto: "Construir asentamientos modulares, eficientes pero menos cómodos", valor: "modular" },
        { texto: "Construir asentamientos básicos pero con gran expansión futura", valor: "básico" }
      ]
    },
    recursos: {
      pregunta: "¿Cómo gestionarás los recursos limitados de Marte?",
      opciones: [
        { texto: "Extraer recursos de manera intensiva para asegurar el abastecimiento inmediato", valor: "intensiva" },
        { texto: "Implementar tecnologías de reciclaje y sostenibilidad para gestionar los recursos", valor: "sostenibilidad" },
        { texto: "Establecer comercio con la Tierra para obtener recursos externos", valor: "comercio" }
      ]
    },
    relaciones: {
      pregunta: "¿Cómo manejarás las relaciones con la Tierra?",
      opciones: [
        { texto: "Dependencia total de la Tierra para recursos y apoyo logístico", valor: "dependencia" },
        { texto: "Establecer una autonomía total para Marte", valor: "independencia" },
        { texto: "Mantener una cooperación equilibrada con la Tierra", valor: "cooperacion" }
      ]
    }
  };

  return (
    <div style={{ position: 'relative', width: '768px', margin: 'auto' }}>
      <img src={mapaMarte} alt="Mapa de Marte" style={{ width: '100%' }} />

      {/* Elementos interactivos */}
      <img
        src={asentamientoIcono}
        alt="Asentamiento"
        onClick={() => !asentamientoDecision && setPopup("asentamiento")}
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
        onClick={() => !recursosDecision && setPopup("recursos")}
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
        onClick={() => !relacionesDecision && setPopup("relaciones")}
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
        <button onClick={evaluarFuturo} style={boton}>
          Ver Futuro
        </button>
      )}
    </div>
  );
};

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

export default MapaMarte;
