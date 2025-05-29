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
        title : 'El futuro del rio alcanzó su versión ideal'
      }
    case Future.Medium:
      return {
        message: 'El río ha mejorado, pero aún queda trabajo por hacer. 🌱',
        image: medio2,
        type,
        score,
        title : 'El futuro del rio es prometedor, pero...'
      }
    default:
      return {
        message: 'El río está muy contaminado y la comunidad está sufriendo. 💔',
        image: malo2,
        type,
        score,
        title : 'El futuro del rio ha alcanzado el declive máximo'
      }
  }
}
function shuffleOptions(options: { texto: string; valor: string }[]): { texto: string; valor: string }[] {
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


const MapaRio: React.FC<MapaRioProps> = ({ increaseGlobalScore, setFutureResults }) => {
  // Estados para las decisiones
  const [ríoDecision, setRíoDecision] = useState<string | null>(null);
  const [bosqueDecision, setBosqueDecision] = useState<string | null>(null);
  const [plantaDecision, setPlantaDecision] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

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

    setProgress(prevProgress => Math.min(prevProgress + 10, 100));

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
        { texto: "Limpiar el río completamente, gastando dinero aunque no estaba presupuestado, y destinarlo a la limpieza total del río", valor: "limpiar" },
        { texto: "Construir una planta de tratamiento, pero con los ingresos de 2 semanas de trabajo de funcionarios gubernamentales de clase baja", valor: "invertir" },
        { texto: "Dejar la contaminación tal como está, ignorando las peticiones de los ciudadanos acerca de las enfermedades causadas por el río, pero guardando el presupuesto.", valor: "dejar" }
      ]
    },
    bosque: {
      pregunta: "¿Vas a conservar el bosque cerca del río?",
      opciones: [
        { texto: "Conservar el bosque, frenando el crecimiento económico local", valor: "conservar" },
        { texto: "Talar el bosque para agricultura generando también un crecimiento de la ganadería en la zona", valor: "taladrar" }
      ]
    },
    planta: {
      pregunta: "¿Cómo vas a manejar la planta industrial cerca del río?",
      opciones: [
        { texto: "Instalar filtros avanzados para reducir los desechos al mínimo, y aprovechar el agua del río para enfriar las máquinas sin desperdiciar desechos.", valor: "invertir" },
        { texto: "Tratar las aguas residuales antes de verterlas al río, solo cuando la producción lo permita para no afectar la eficiencia de la fábrica", valor: "cerrar" }
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
    opciones={shuffleOptions(preguntasYOpciones[popup].opciones)} // Usar la función shuffle para desordenar las opciones
    onClose={() => setPopup(null)}
    onSelect={(decision: string) => {
      if (popup === "rio") setRíoDecision(decision);
      if (popup === "bosque") setBosqueDecision(decision);
      if (popup === "planta") setPlantaDecision(decision);
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

export default MapaRio;
