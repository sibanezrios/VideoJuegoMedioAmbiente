import React, { useState } from 'react';
import DecisionPopup from '../../DecisionPopup';  // Componente reutilizable de popup
import muyBueno3 from './assets/futuro_bueno_ciudad.png';  
import medio3 from './assets/futuro_medio_ciudad.png';  
import malo3 from './assets/futuro_malo_ciudad.png';  
import ciudadFondo from './assets/ciudad_mapa.png'; 
import plantaNuclearIcono from './assets/planta_energetica.png'; 
import zonaResidencialIcono from './assets/expansion.png'; 
import carreteraIcono from './assets/transporte.png'; 
import { Future, FutureResults } from '../../constants';

interface MapaCiudadProps {
  currentScore: number;
  setFutureResults: (results: FutureResults) => void; 
}

function buildResults(type: Future, score: number): FutureResults {
  switch(type) {
    case Future.VeryGood:
      return {
        message: `¡Felicidades! La ciudad ha crecido de manera sostenible. 🌳🎉 Puntaje: ${score}`,
        image: muyBueno3,
        type,
        score,
        title : 'EL futuro que escogiste ha mantenido viva la ciudad a lo largo de los años'
      }
    case Future.Medium:
      return {
        message: `La ciudad ha mejorado, pero aún quedan algunos problemas por resolver. 🌱 Puntaje: ${score}`,
        image: medio3,
        type,
        score,
        title : 'El futuro de la ciudad se mantiene estable, pero no por mucho tiempo'
      }
    default:
      return {
        message: `La ciudad ha empeorado, con consecuencias negativas a largo plazo. 💔 Puntaje: ${score}`,
        image: malo3,
        type,
        score,
        title : 'La ciudad dejó de lado el concepto de futuro y se tiene poca probabilidad de mejora'
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

const MapaCiudad: React.FC<MapaCiudadProps> = ({ setFutureResults }) => {
  // Estados para las decisiones
  const [plantaNuclearDecision, setPlantaNuclearDecision] = useState<string | null>(null);
  const [residencialDecision, setResidencialDecision] = useState<string | null>(null);
  const [carreteraDecision, setCarreteraDecision] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

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

    setProgress(prevProgress => Math.min(prevProgress + 10, 100));

    const future = score >= 3 ? Future.VeryGood : score === 2 ? Future.Medium : Future.Bad;
    const results = buildResults(future,score);
    setFutureResults(results);
  }

  // Opciones para las decisiones del jugador
  const preguntasYOpciones = {
    plantaNuclear: {
      pregunta: "¿Cómo vas a manejar la planta energética nuclear?",
      opciones: [
        { texto: "Invertir en energías renovables (solar y eólica) a largo plazo", valor: "invertir" },
        { texto: "Cerrar la planta nuclear y apostar por energía 100% limpia, pero perder producción inmediata", valor: "cerrar" },
        { texto: "Modernizar la planta nuclear con tecnologías más seguras, pero seguir dependiendo de energía nuclear", valor: "modernizar" },
        { texto: "Expandir la planta nuclear para aumentar la producción, ignorando los efectos ambientales a largo plazo", valor: "expandir" }
      ]
    },
    residencial: {
      pregunta: "La ciudad necesita expandirse, pero las áreas verdes están en riesgo. ¿Cómo manejarás el crecimiento?",
      opciones: [
        { texto: "Expandir hacia zonas ya urbanizadas, conservando las áreas verdes", valor: "expandir" },
        { texto: "Expandir hacia áreas verdes, pero asegurando que la mitad del espacio se destine a parques y jardines", valor: "expandir-verde" },
        { texto: "Conservar las áreas verdes y aumentar la densidad de edificios en las zonas urbanizadas", valor: "conservar" },
        { texto: "Expandir sin restricciones, priorizando el crecimiento económico rápido", valor: "expandir-liberado" }
      ]
    },
    carretera: {
      pregunta: "El tráfico es un problema creciente, pero las soluciones implican compromisos. ¿Qué harás con el transporte urbano?",
      opciones: [
        { texto: "Invertir en un sistema de transporte público ecológico, eléctrico y eficiente", valor: "invertir" },
        { texto: "Expandir las carreteras y promover el uso de vehículos eléctricos para reducir la contaminación", valor: "expandir-sostenible" },
        { texto: "Ampliar las carreteras para facilitar el tránsito de vehículos privados, pero sin tener en cuenta la sostenibilidad a largo plazo", valor: "expandir-privado" },
        { texto: "Desarrollar un sistema mixto: mejorar el transporte público y las infraestructuras para bicicletas y peatones", valor: "mixto" }
      ]
    }
  };

  return (
    <div style={{ position: 'relative', width: '768px', margin: 'auto' }}>
      <img src={ciudadFondo} alt="Mapa de la ciudad" style={{ width: '100%' }} />

      {/* Elementos interactivos */}
      <img
        src={zonaResidencialIcono}
        alt="Zona residencial"
        onClick={() => !residencialDecision && setPopup("residencial")}
        style={{
          position: 'absolute',
          top: '200px',
          left: '100px',  // Cambié el left para la zona residencial
          width: '90px',
          cursor: residencialDecision ? 'default' : 'pointer',
          opacity: residencialDecision ? 0.4 : 1
        }}
      />
      <img
        src={plantaNuclearIcono}
        alt="Planta energética nuclear"
        onClick={() => !plantaNuclearDecision && setPopup("plantaNuclear")}
        style={{
          position: 'absolute',
          top: '150px',
          right: '120px', 
          width: '80px',
          cursor: plantaNuclearDecision ? 'default' : 'pointer',
          opacity: plantaNuclearDecision ? 0.4 : 1
        }}
      />
      <img
        src={carreteraIcono}
        alt="Carretera"
        onClick={() => !carreteraDecision && setPopup("carretera")}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '300px',
          width: '90px',
          cursor: carreteraDecision ? 'default' : 'pointer',
          opacity: carreteraDecision ? 0.4 : 1
        }}
      />

      {/* Mostrar popup de decisiones */}
      {popup && (
        <DecisionPopup
          tipo={popup}
          pregunta={preguntasYOpciones[popup].pregunta}
          opciones={shuffleOptions(preguntasYOpciones[popup].opciones)} // Usar la función shuffle para desordenar las opciones
          onClose={() => setPopup(null)}
          onSelect={(decision: string) => {
            if (popup === 'plantaNuclear') setPlantaNuclearDecision(decision);
            if (popup === 'residencial') setResidencialDecision(decision);
            if (popup === 'carretera') setCarreteraDecision(decision);
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

export default MapaCiudad;
