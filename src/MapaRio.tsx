
import React, { useState } from 'react';
import DecisionPopup from './DecisionPopup'; // Componente reutilizable de popup
import FuturoEscena2 from './FuturoEscena2'; // Componente para mostrar el futuro del Nivel 2
import rio from './assets/mapa_rio.png';  // Mapa del río
import bosqueIcono from './assets/bosque.png';  // Icono del bosque
import plantaIcono from './assets/planta.png';  // Icono de la planta industrial
import muelleIcono from './assets/rio.png';  // Icono del muelle

type Futuro = 'muy_bueno' | 'medio' | 'malo' | null;

interface MapaRioProps {
  setPuntos: React.Dispatch<React.SetStateAction<number>>;
  setFuturo: React.Dispatch<React.SetStateAction<Futuro>>;
}

const MapaRio: React.FC<MapaRioProps> = ({ setPuntos, setFuturo }) => {
  // Estados para las decisiones
  const [ríoDecision, setRíoDecision] = useState<string | null>(null);
  const [bosqueDecision, setBosqueDecision] = useState<string | null>(null);
  const [plantaDecision, setPlantaDecision] = useState<string | null>(null);

  // Estado para el popup (interactividad)
  const [popup, setPopup] = useState<null | 'rio' | 'bosque' | 'planta'>(null); // Cambié "río" a "rio"

  // Estado para mostrar el futuro
  const [futuro, setFuturoState] = useState<Futuro>(null);

  // Puntos acumulados para las decisiones
  const [puntos, setPuntosState] = useState(0);

  const todasTomadas = ríoDecision && bosqueDecision && plantaDecision;

  // Evaluamos el futuro basado en el puntaje
  function evaluarFuturo() {
    let score = puntos;

    // Evaluación del río
    if (ríoDecision === "limpiar") score++;
    if (plantaDecision === "invertir") score++;
    if (bosqueDecision === "conservar") score++;

    setPuntosState(score);  // Actualizamos el puntaje

    // Evaluamos el futuro con base en el puntaje
    setFuturo(score >= 3 ? 'muy_bueno' : score === 2 ? 'medio' : 'malo');
    setFuturoState(score >= 3 ? 'muy_bueno' : score === 2 ? 'medio' : 'malo'); // Actualizamos el futuro
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


