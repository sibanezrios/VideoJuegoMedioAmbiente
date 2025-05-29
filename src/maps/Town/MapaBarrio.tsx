import React, { useState } from 'react';
import DecisionPopup from '../../DecisionPopup'; // Componente reutilizable de popup
import mapa from './assets/mapa_inicial.png'; // Mapa del barrio
import bueno from './assets/futuro_bueno.png'; // Imagen para el futuro bueno
import medio from './assets/futuro_medio.png'; // Imagen para el futuro medio
import malo from './assets/futuro_malo.png'; // Imagen para el futuro malo
import arbolIcono from './assets/arbol.png'; // Icono del árbol
import fabricaIcono from './assets/fabrica.png'; // Icono de la fábrica
import loteIcono from './assets/lote.png'; // Icono del lote baldío
import { Future, FutureResults } from '../../constants';

interface MapaBarrioProps {
  increaseGlobalScore: React.Dispatch<React.SetStateAction<number>>; // Función para actualizar los puntos
  setFutureResults: (results: FutureResults) => void; // Función para actualizar el futuro
}

function buildResults(type: Future, score: number): FutureResults {
  switch (type) {
    case Future.VeryGood:
      return {
        message: `¡Felicidades! Has creado un barrio saludable y sostenible. 🌳🎉 Puntaje: ${score}`,
        image: bueno,
        type,
        score,
        title: 'Futuro del barrio'
      }
    case Future.Medium:
      return {
        message: `Bien hecho, el barrio mejoró, pero aún hay trabajo por hacer. 🌱 Puntaje: ${score}`,
        image: medio,
        type,
        score,
        title: 'Futuro del barrio'
      }
    default:
      return {
        message: `El barrio empeoró. ¡Aún puedes mejorar! 💔 Puntaje: ${score}`,
        image: malo,
        type,
        score,
        title: 'Futuro del barrio'
      }
  }
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

function MapaBarrio({ increaseGlobalScore, setFutureResults,}: MapaBarrioProps) {
  // Estados para las decisiones
  const [arbolDecision, setArbolDecision] = useState<string | null>(null);
  const [fabricaDecision, setFabricaDecision] = useState<string | null>(null);
  const [loteDecision, setLoteDecision] = useState<string | null>(null);

  // Estado para el popup (interactividad)
  const [popup, setPopup] = useState<null | 'arbol' | 'fabrica' | 'lote'>(null);

  // Barra de progreso
  const [progreso, setProgress] = useState(0);

  // Comprobamos si todas las decisiones han sido tomadas
  const todasTomadas = arbolDecision && fabricaDecision && loteDecision;

  // Evaluamos el futuro basado en el puntaje de las decisiones
  function evaluateFuture() {
    let score = 0;
    if (arbolDecision === 'conservar') score++;
    if (fabricaDecision === 'modernizar') score++;
    if (loteDecision === 'parque') score++;

    setProgress((prevProgress: number) => Math.min(prevProgress + 10, 100)); // Aumentamos la barra de progreso según el puntaje

    const future = score >= 3 ? Future.VeryGood : score === 2 ? Future.Medium : Future.Bad;
    const results = buildResults(future, score);
    increaseGlobalScore(score);
    setFutureResults(results);
  }

  // Opciones para las decisiones del jugador
  const preguntasYOpciones = {
    arbol: {
      pregunta: '¿Quieres conservar los árboles?',
      opciones: [
        { texto: 'Conservar los árboles', valor: 'conservar' },
        { texto: 'Solo si generan ganancias', valor: 'eliminar' }
      ]
    },
    fabrica: {
      pregunta: '¿Quieres modernizar esta fábrica contaminante?',
      opciones: [
        { texto: 'Si, con tecnologia limpia que respete el ambiente', valor: 'modernizar' },
        { texto: 'Modernizar la fábrica, pero afectar 200 empleos', valor: 'mantener' }
      ]
    },
    lote: {
      pregunta: '¿Quieres convertir este espacio en un parque, a petición de 10 niños de la comunidad?',
      opciones: [
        { texto: 'Convertir el lote en parque, cumpliendo la petición de unicamente el 10% de las personas en el pueblo', valor: 'parque' },
        { texto: 'Convertir el lote en zona comercial(los gastos serán donados por una empresa extranjera que quiere expandir su territorio)', valor: 'comercial' }
      ]
    }
  };

  return (
    <div style={{ position: 'relative', width: '768px', margin: 'auto' }}>
      <img src={mapa} alt="Mapa del barrio" style={{ width: '100%' }} />

      {/* Elementos interactivos */}
      <img
        src={arbolIcono}
        alt="Árbol"
        onClick={() => !arbolDecision && setPopup('arbol')}
        style={{
          position: 'absolute',
          top: '200px',
          left: '100px',
          width: '80px',
          cursor: arbolDecision ? 'default' : 'pointer',
          opacity: arbolDecision ? 0.4 : 1
        }}
      />
      <img
        src={fabricaIcono}
        alt="Fábrica"
        onClick={() => !fabricaDecision && setPopup('fabrica')}
        style={{
          position: 'absolute',
          top: '150px',
          right: '120px',
          width: '90px',
          cursor: fabricaDecision ? 'default' : 'pointer',
          opacity: fabricaDecision ? 0.4 : 1
        }}
      />
      <img
        src={loteIcono}
        alt="Lote Baldío"
        onClick={() => !loteDecision && setPopup('lote')}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '300px',
          width: '90px',
          cursor: loteDecision ? 'default' : 'pointer',
          opacity: loteDecision ? 0.4 : 1
        }}
      />

      {/* Mostrar popup de decisiones */}
      {popup && (
        <DecisionPopup
          tipo={popup === 'arbol' ? 'arbol' : popup === 'fabrica' ? 'fabrica' : 'lote'}
          pregunta={preguntasYOpciones[popup].pregunta}
          opciones={shuffleOptions(preguntasYOpciones[popup].opciones)} // Revolvemos las opciones
          onClose={() => setPopup(null)}
          onSelect={(decision: string) => {
            if (popup === 'arbol') setArbolDecision(decision);
            if (popup === 'fabrica') setFabricaDecision(decision);
            if (popup === 'lote') setLoteDecision(decision);
            setPopup(null);
          }}
        />
      )}

      {/* Barra de progreso */}
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', height: '20px', borderRadius: '10px' }}>
        <div
          style={{
            width: `${progreso}%`,
            backgroundColor: '#4CAF50',
            height: '100%',
            borderRadius: '10px',
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      {/* Botón para evaluar el futuro */}
      {todasTomadas && (
        <button onClick={evaluateFuture} style={boton}>
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

export default MapaBarrio;
