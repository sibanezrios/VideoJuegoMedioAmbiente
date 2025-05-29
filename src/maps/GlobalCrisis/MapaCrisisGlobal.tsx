import React, { useState } from 'react';
import DecisionPopup from '../../DecisionPopup';  // Componente reutilizable de popup
import mundoFondo from './assets/mundo_mapa.png';
import clima from './assets/clima.png';
import pandemia from './assets/pandemia.png';
import muyBueno4 from './assets/Futuro-bueno-mundo.png';
import medio4 from './assets/Futuro-medio-mundo.png';
import malo4 from './assets/Futuro-malo-mundo.png';
import personas from './assets/personas.png';
import salud from './assets/salud.png';
import renovable from './assets/renovable.png';
import { Future, FutureResults } from '../../constants';

interface MapaCrisisGlobalProps {
  increaseGlobalScore: React.Dispatch<React.SetStateAction<number>>;  // Función para actualizar los puntos
  setFutureResults: (results: FutureResults) => void;  // Función para actualizar el futuro
}

function buildResults(type: Future, score: number): FutureResults {
  switch (type) {
    case Future.VeryGood:
      return {
        message: `¡Felicidades! El mundo ha logrado equilibrar sus problemas globales. 🌍🎉 Puntaje: ${score}`,
        image: muyBueno4,
        type,
        score,
        title: 'Futuro del mundo'
      }
    case Future.Medium:
      return {
        message: `El mundo ha mejorado, pero aún hay desafíos por resolver. 🌱 Puntaje: ${score}`,
        image: medio4,
        type,
        score,
        title: 'Futuro del mundo'
      }
    default:
      return {
        message: `La crisis global sigue empeorando, con consecuencias negativas a largo plazo. 💔 Puntaje: ${score}`,
        image: malo4,
        type,
        score,
        title: 'Futuro del mundo'
      }
  }
}

const MapaCrisisGlobal: React.FC<MapaCrisisGlobalProps> = ({ increaseGlobalScore, setFutureResults }) => {
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
    increaseGlobalScore(score);
    setFutureResults(results);
  }

  // Opciones para las decisiones del jugador
  const preguntasYOpciones = {
    cambioClimatico: {
      pregunta: "¿Cómo abordas el cambio climático global?",
      opciones: [
        { texto: "Imponer sanciones a los países más contaminantes", valor: "sanciones" },
        { texto: "Promover un acuerdo global de reducción de emisiones", valor: "acuerdo" },
        { texto: "Dejar que cada país gestione sus políticas de forma independiente", valor: "independiente" }
      ]
    },
    pandemia: {
      pregunta: "¿Cómo coordinarás la respuesta internacional a la pandemia?",
      opciones: [
        { texto: "Cerrar fronteras y aislar países ricos", valor: "restricciones" },
        { texto: "Distribuir vacunas globalmente", valor: "cooperacion" },
        { texto: "Dejar que cada nación gestione de forma independiente", valor: "independiente" }
      ]
    },
    recursos: {
      pregunta: "¿Cómo gestionarás la escasez de recursos naturales?",
      opciones: [
        { texto: "Nacionalizar recursos y priorizar intereses nacionales", valor: "nacionalizar" },
        { texto: "Crear un sistema de distribución global justa", valor: "distribucion" },
        { texto: "Dejar que el mercado regule los recursos", valor: "mercado" }
      ]
    }
  };

  return (
    <div style={{ position: 'relative', width: '768px', margin: 'auto' }}>
      <img src={mundoFondo} alt="Mapa del mundo" style={{ width: '100%' }} />

      {/* Elementos interactivos */}
      <img
        src={clima}
        alt="Cambio climático"
        onClick={() => !cambioClimaticoDecision && setPopup("cambioClimatico")}
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
        onClick={() => !pandemiaDecision && setPopup("pandemia")}
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
        onClick={() => !recursosDecision && setPopup("recursos")}
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

export default MapaCrisisGlobal;
