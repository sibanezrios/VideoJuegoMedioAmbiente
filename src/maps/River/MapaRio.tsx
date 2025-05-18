
import React, { useState } from 'react';
import DecisionPopup from '../../DecisionPopup'; // Componente reutilizable de popup
import bueno2 from './assets/futuro_bueno_rio.png';  // Imagen para el futuro bueno (Nivel 2)
import medio2 from './assets/futuro_medio_rio.png';  // Imagen para el futuro medio (Nivel 2)
import malo2 from './assets/futuro_malo_rio.png';  // Imagen para el futuro malo (Nivel 2)
import rio from './assets/mapa_rio.png';  // Mapa del río
import bosqueIcono from './assets/bosque.png';  // Icono del bosque
import plantaIcono from './assets/planta.png';  // Icono de la planta industrial
import muelleIcono from './assets/rio.png';  
import { Future, FutureResults } from '../../constants';

interface MapaRioProps {
  increaseGlobalScore: React.Dispatch<React.SetStateAction<number>>;  // Función para actualizar los puntos
  setFutureResults: (results: FutureResults) => void;  // Función para actualizar el futuro
}

function buildResults(type: Future, score: number): FutureResults {
  switch(type) {
    case Future.VeryGood:
      return {
        message: '¡El río está limpio y la comunidad está más saludable! 🎉',
        image: bueno2,
        type,
        score,
        title : 'El futuro del rio es muy bueno '
      }
    case Future.Medium:
      return {
        message: 'El río ha mejorado, pero aún queda trabajo por hacer. 🌱',
        image: medio2,
        type,
        score,
        title : 'Fl futuro del rio es prometedor pero...'
      }
    default:
      return {
        message: 'El río está muy contaminado y la comunidad está sufriendo. 💔',
        image: malo2,
        type,
        score,
        title : 'El futuro del rio esta en decadencia'
      }
  }
}

const MapaRio: React.FC<MapaRioProps> = ({ increaseGlobalScore, setFutureResults }) => {
  // Estados para las decisiones
  const [ríoDecision, setRíoDecision] = useState<string | null>(null);
  const [bosqueDecision, setBosqueDecision] = useState<string | null>(null);
  const [plantaDecision, setPlantaDecision] = useState<string | null>(null);

  // Estado para el popup (interactividad)
  const [popup, setPopup] = useState<null | 'rio' | 'bosque' | 'planta'>(null); // Cambié "río" a "rio"

  const todasTomadas = ríoDecision && bosqueDecision && plantaDecision;

  // Evaluamos el futuro basado en el puntaje
  function evaluarFuturo() {
    let score = 0;

    // Evaluación del río
    if (ríoDecision === "limpiar") score++;
    if (plantaDecision === "invertir") score++;
    if (bosqueDecision === "conservar") score++;

    const future = score >= 3 ? Future.VeryGood : score === 2 ? Future.Medium : Future.Bad;
    const results = buildResults(future,score);
    increaseGlobalScore(score);
    setFutureResults(results);
  }

  // Opciones para las decisiones del jugador
  const preguntasYOpciones = {
    rio: {  // Cambié "río" a "rio"
      pregunta: "¿Cómo vas a tratar la contaminación del río?",
      opciones: [
        { texto: "Limpiar el río completamente", valor: "limpiar" },
        { texto: "Construir una planta de tratamiento", valor: "invertir" },
        { texto: "Dejar la contaminación tal como está", valor: "dejar" }
      ]
    },
    bosque: {
      pregunta: "¿Vas a conservar el bosque cerca del río?",
      opciones: [
        { texto: "Conservar el bosque", valor: "conservar" },
        { texto: "Taladr el bosque para agricultura", valor: "taladrar" }
      ]
    },
    planta: {
      pregunta: "¿Cómo vas a manejar la planta industrial cerca del río?",
      opciones: [
        { texto: "Invertir en tecnologías limpias", valor: "invertir" },
        { texto: "Cerrar la planta", valor: "cerrar" }
      ]
    }
  };

  return (
    <div style={{ position: 'relative', width: '768px', margin: 'auto' }}>
      <img src={rio} alt="Mapa del río" style={{ width: '100%' }} />

      {/* Elementos interactivos */}
      <img
        src={bosqueIcono}
        alt="Bosque"
        onClick={() => !bosqueDecision && setPopup("bosque")}
        style={{
          position: 'absolute',
          top: '200px',
          left: '100px',
          width: '80px',
          cursor: bosqueDecision ? 'default' : 'pointer',
          opacity: bosqueDecision ? 0.4 : 1
        }}
      />
      <img
        src={plantaIcono}
        alt="Planta industrial"
        onClick={() => !plantaDecision && setPopup("planta")}
        style={{
          position: 'absolute',
          top: '150px',
          right: '120px',
          width: '90px',
          cursor: plantaDecision ? 'default' : 'pointer',
          opacity: plantaDecision ? 0.4 : 1
        }}
      />
      <img
        src={muelleIcono}
        alt="Muelle"
        onClick={() => !ríoDecision && setPopup("rio")} // Cambié "río" a "rio"
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '300px',
          width: '90px',
          cursor: ríoDecision ? 'default' : 'pointer',
          opacity: ríoDecision ? 0.4 : 1
        }}
      />

      {/* Mostrar popup de decisiones */}
      {popup && (
  <DecisionPopup
    tipo={popup === 'rio' ? 'rio' : popup === 'bosque' ? 'bosque' : 'planta'}  // Aquí se pasa el tipo adecuado según el popup
    pregunta={preguntasYOpciones[popup].pregunta}
    opciones={preguntasYOpciones[popup].opciones}
    onClose={() => setPopup(null)}
    onSelect={(decision: string) => {
      if (popup === "rio") setRíoDecision(decision);
      if (popup === "bosque") setBosqueDecision(decision);
      if (popup === "planta") setPlantaDecision(decision);
      setPopup(null);
    }}
  />
)}


      {/* Botón para evaluar el futuro */}
      {todasTomadas && (
        <button onClick={evaluarFuturo} style={{ marginTop: '20px' }}>
          Ver Futuro
        </button>
      )}
    </div>
  );
};

export default MapaRio;

