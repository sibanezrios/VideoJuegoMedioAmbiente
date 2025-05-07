
// import React, { useState } from 'react';
// import DecisionPopup from './DecisionPopup';
// import FuturoEscena from './FuturoEscena';
// import mapa from './assets/mapa_inicial.png';
// import arbol from './assets/arbol.png';
// import fabrica from './assets/fabrica.png';
// import lote from './assets/lote.png';

// type Futuro = "muy_bueno" | "medio" | "malo" | null;

// function MapaBarrio() {
//   const [arbolDecision, setArbolDecision] = useState<string | null>(null);
//   const [fabricaDecision, setFabricaDecision] = useState<string | null>(null);
//   const [loteDecision, setLoteDecision] = useState<string | null>(null);
//   const [puntos, setPuntos] = useState(0);
//   const [popup, setPopup] = useState<null | "arbol" | "fabrica" | "lote">(null);
//   const [futuro, setFuturo] = useState<Futuro>(null);

//   const todasTomadas = arbolDecision && fabricaDecision && loteDecision;

//   function evaluarFuturo() {
//     let score = puntos; // Usamos el puntaje acumulado
  
//     // Árbol
//     if (arbolDecision === "conservar") {
//       score++;
//     } else if (arbolDecision === "eliminar") {
//       score--;
//     }
  
//     // Fábrica
//     if (fabricaDecision === "modernizar") {
//       score++;
//     } else if (fabricaDecision === "mantener") {
//       score--;
//     }
  
//     // Lote
//     if (loteDecision === "parque") {
//       score++;
//     } else if (loteDecision === "comercial") {
//       score--;
//     }
  
//     setPuntos(score); // Actualizamos el puntaje final
  
//     // Evaluamos el futuro con base en el puntaje
//     if (score >= 3) {
//       setFuturo("muy_bueno");
//     } else if (score === 1) {
//       setFuturo("medio");
//     } else {
//       setFuturo("malo");
//     }
//   }
  

//   if (futuro) {
//     return <FuturoEscena tipo={futuro} puntos={puntos} />;
//   }

//   return (
//     <div style={{ position: 'relative', width: '768px', margin: 'auto' }}>
//       <img src={mapa} alt="Mapa del barrio" style={{ width: '100%' }} />

//       {/* Elementos interactivos */}
//       <img
//         src={arbol}
//         alt="Árbol"
//         onClick={() => !arbolDecision && setPopup("arbol")}
//         style={{
//           position: 'absolute',
//           top: '200px',
//           left: '100px',
//           width: '80px',
//           cursor: arbolDecision ? 'default' : 'pointer',
//           opacity: arbolDecision ? 0.4 : 1
//         }}
//       />
//       <img
//         src={fabrica}
//         alt="Fábrica"
//         onClick={() => !fabricaDecision && setPopup("fabrica")}
//         style={{
//           position: 'absolute',
//           top: '150px',
//           right: '120px',
//           width: '90px',
//           cursor: fabricaDecision ? 'default' : 'pointer',
//           opacity: fabricaDecision ? 0.4 : 1
//         }}
//       />
//       <img
//         src={lote}
//         alt="Lote baldío"
//         onClick={() => !loteDecision && setPopup("lote")}
//         style={{
//           position: 'absolute',
//           bottom: '80px',
//           left: '300px',
//           width: '90px',
//           cursor: loteDecision ? 'default' : 'pointer',
//           opacity: loteDecision ? 0.4 : 1
//         }}
//       />

//       {popup && (
//         <DecisionPopup
//           tipo={popup}
//           onClose={() => setPopup(null)}
//           onSelect={(decision: string) => {
//             if (popup === "arbol") setArbolDecision(decision);
//             if (popup === "fabrica") setFabricaDecision(decision);
//             if (popup === "lote") setLoteDecision(decision);
//             setPopup(null);
//           }}
//         />
//       )}

//       {todasTomadas && (
//         <button onClick={evaluarFuturo} style={{ marginTop: '20px' }}>
//           Ver Futuro
//         </button>
//       )}
//     </div>
//   );
// }

// export default MapaBarrio;
// import React, { useState } from 'react';
// import DecisionPopup from './DecisionPopup';  // Componente reutilizable de popup
// import FuturoEscena from './FuturoEscena';    // Componente para mostrar el futuro
// import mapa from './assets/mapa_inicial.png';  // Mapa del barrio
// import arbolIcono from './assets/arbol.png';  // Icono del árbol
// import fabricaIcono from './assets/fabrica.png';  // Icono de la fábrica
// import loteIcono from './assets/lote.png';  // Icono del lote baldío

// type Futuro = 'muy_bueno' | 'medio' | 'malo' | null;


// interface MapaBarrioProps {
//     setPuntos: React.Dispatch<React.SetStateAction<number>>;
//     setFuturo: React.Dispatch<React.SetStateAction<string | null>>;
//   }

// function MapaBarrio() {
//   // Estados para las decisiones
//   const [arbolDecision, setArbolDecision] = useState<string | null>(null);
//   const [fabricaDecision, setFabricaDecision] = useState<string | null>(null);
//   const [loteDecision, setLoteDecision] = useState<string | null>(null);

//   // Estado para el popup (interactividad)
//   const [popup, setPopup] = useState<null | 'arbol' | 'fabrica' | 'lote'>(null);

//   // Estado para mostrar el futuro
//   const [futuro, setFuturo] = useState<Futuro>(null);
  
//   // Puntos acumulados para las decisiones
//   const [puntos, setPuntos] = useState(0);

//   const todasTomadas = arbolDecision && fabricaDecision && loteDecision;

//   // Evaluamos el futuro basado en las decisiones y el puntaje
//   function evaluarFuturo() {
//     let score = puntos;

//     // Árbol
//     if (arbolDecision === "conservar") {
//       score++;
//     } else if (arbolDecision === "eliminar") {
//       score--;
//     }

//     // Fábrica
//     if (fabricaDecision === "modernizar") {
//       score++;
//     } else if (fabricaDecision === "mantener") {
//       score--;
//     }

//     // Lote
//     if (loteDecision === "parque") {
//       score++;
//     } else if (loteDecision === "comercial") {
//       score--;
//     }

//     setPuntos(score);  // Actualizamos el puntaje final

//     // Evaluamos el futuro con base en el puntaje
//     if (score >= 3) setFuturo('muy_bueno');
//     else if (score === 2) setFuturo('medio');
//     else setFuturo('malo');
//   }

//   // Si ya se tomó todas las decisiones, mostramos el futuro
//   if (futuro) {
//     return <FuturoEscena tipo={futuro} puntos={puntos} />;
//   }

//   // Opciones para los popups
//   const preguntasYOpciones = {
//     arbol: {
//       pregunta: "¿Quieres conservar los árboles?",
//       opciones: [
//         { texto: "Conservar los árboles", valor: "conservar" },
//         { texto: "Eliminar los árboles para construcción", valor: "eliminar" }
//       ]
//     },
//     fabrica: {
//       pregunta: "¿Quieres modernizar esta fábrica contaminante?",
//       opciones: [
//         { texto: "Modernizar la fábrica", valor: "modernizar" },
//         { texto: "Mantener la fábrica tal como está", valor: "mantener" }
//       ]
//     },
//     lote: {
//       pregunta: "¿Quieres convertir este espacio en un parque?",
//       opciones: [
//         { texto: "Convertir el lote en parque", valor: "parque" },
//         { texto: "Convertir el lote en zona comercial", valor: "comercial" }
//       ]
//     }
//   };

//   return (
//     <div style={{ position: 'relative', width: '768px', margin: 'auto' }}>
//       <img src={mapa} alt="Mapa del barrio" style={{ width: '100%' }} />

//       {/* Elementos interactivos */}
//       <img
//         src={arbolIcono}
//         alt="Árbol"
//         onClick={() => !arbolDecision && setPopup("arbol")}
//         style={{
//           position: 'absolute',
//           top: '200px',
//           left: '100px',
//           width: '80px',
//           cursor: arbolDecision ? 'default' : 'pointer',
//           opacity: arbolDecision ? 0.4 : 1
//         }}
//       />
//       <img
//         src={fabricaIcono}
//         alt="Fábrica"
//         onClick={() => !fabricaDecision && setPopup("fabrica")}
//         style={{
//           position: 'absolute',
//           top: '150px',
//           right: '120px',
//           width: '90px',
//           cursor: fabricaDecision ? 'default' : 'pointer',
//           opacity: fabricaDecision ? 0.4 : 1
//         }}
//       />
//       <img
//         src={loteIcono}
//         alt="Lote Baldío"
//         onClick={() => !loteDecision && setPopup("lote")}
//         style={{
//           position: 'absolute',
//           bottom: '80px',
//           left: '300px',
//           width: '90px',
//           cursor: loteDecision ? 'default' : 'pointer',
//           opacity: loteDecision ? 0.4 : 1
//         }}
//       />

// {popup && (
//   <DecisionPopup
//     tipo={popup === 'arbol' ? 'arbol' : popup === 'fabrica' ? 'fabrica' : 'lote'} // Tipos para el Nivel 1
//     pregunta={preguntasYOpciones[popup].pregunta}
//     opciones={preguntasYOpciones[popup].opciones}
//     onClose={() => setPopup(null)}
//     onSelect={(decision: string) => {
//       if (popup === "arbol") setArbolDecision(decision);
//       if (popup === "fabrica") setFabricaDecision(decision);
//       if (popup === "lote") setLoteDecision(decision);
//       setPopup(null);
//     }}
//   />
// )}

//       {todasTomadas && (
//         <button onClick={evaluarFuturo} style={{ marginTop: '20px' }}>
//           Ver Futuro
//         </button>
//       )}
//     </div>
//   );
  
// }


// export default MapaBarrio;
import React, { useState } from 'react';
import DecisionPopup from './DecisionPopup';  // Componente reutilable de popup
import FuturoEscena from './FuturoEscena';    // Componente para mostrar el futuro
import mapa from './assets/mapa_inicial.png';  // Mapa del barrio
import arbolIcono from './assets/arbol.png';  // Icono del árbol
import fabricaIcono from './assets/fabrica.png';  // Icono de la fábrica
import loteIcono from './assets/lote.png';  // Icono del lote baldío

// Declaramos los tipos posibles para el futuro
type Futuro = 'muy_bueno' | 'medio' | 'malo' | null;

// Definimos las propiedades que el componente MapaBarrio recibirá
interface MapaBarrioProps {
  setPuntos: React.Dispatch<React.SetStateAction<number>>;  // Función para actualizar los puntos
  setFuturo: React.Dispatch<React.SetStateAction<Futuro>>;  // Función para actualizar el futuro
}

function MapaBarrio({ setPuntos, setFuturo }: MapaBarrioProps) {
  // Estados para las decisiones
  const [arbolDecision, setArbolDecision] = useState<string | null>(null);
  const [fabricaDecision, setFabricaDecision] = useState<string | null>(null);
  const [loteDecision, setLoteDecision] = useState<string | null>(null);

  // Estado para el popup (interactividad)
  const [popup, setPopup] = useState<null | 'arbol' | 'fabrica' | 'lote'>(null);

  // Estado para mostrar el futuro
  const [futuro, setFuturoState] = useState<Futuro>(null);
  
  // Puntos acumulados para las decisiones
  const [puntos, setPuntosState] = useState(0);

  // Comprobamos si todas las decisiones han sido tomadas
  const todasTomadas = arbolDecision && fabricaDecision && loteDecision;

  // Evaluamos el futuro basado en el puntaje de las decisiones
  function evaluarFuturo() {
    let score = puntos;

    // Evaluación de la decisión del árbol
    if (arbolDecision === "conservar") score++;
    if (fabricaDecision === "modernizar") score++;
    if (loteDecision === "parque") score++;

    setPuntosState(score);  // Actualizamos el puntaje

    // Evaluamos el futuro con base en el puntaje
    setFuturo(score >= 3 ? 'muy_bueno' : score === 2 ? 'medio' : 'malo');
    setFuturoState(score >= 3 ? 'muy_bueno' : score === 2 ? 'medio' : 'malo'); // Actualizamos el futuro
  }

  // Opciones para las decisiones del jugador
  const preguntasYOpciones = {
    arbol: {
      pregunta: "¿Quieres conservar los árboles?",
      opciones: [
        { texto: "Conservar los árboles", valor: "conservar" },
        { texto: "Eliminar los árboles para construcción", valor: "eliminar" }
      ]
    },
    fabrica: {
      pregunta: "¿Quieres modernizar esta fábrica contaminante?",
      opciones: [
        { texto: "Modernizar la fábrica", valor: "modernizar" },
        { texto: "Mantener la fábrica tal como está", valor: "mantener" }
      ]
    },
    lote: {
      pregunta: "¿Quieres convertir este espacio en un parque?",
      opciones: [
        { texto: "Convertir el lote en parque", valor: "parque" },
        { texto: "Convertir el lote en zona comercial", valor: "comercial" }
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
        onClick={() => !arbolDecision && setPopup("arbol")}
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
        onClick={() => !fabricaDecision && setPopup("fabrica")}
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
        onClick={() => !loteDecision && setPopup("lote")}
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
    opciones={preguntasYOpciones[popup].opciones}
    onClose={() => setPopup(null)}
    onSelect={(decision: string) => {
      if (popup === "arbol") setArbolDecision(decision);
      if (popup === "fabrica") setFabricaDecision(decision);
      if (popup === "lote") setLoteDecision(decision);
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
}

export default MapaBarrio;



