
// import React, { useState } from 'react';
// import MapaBarrio from './MapaBarrio';

// function App() {
//   const [mostrarJuego, setMostrarJuego] = useState(false);

//   return (
//     <div className="App">
//       {mostrarJuego ? (
//         // Mostrar el mapa interactivo con las decisiones
//         <MapaBarrio />
//       ) : (
//         <div style={contenedorMenu}>
//           <h1 style={titulo}>🌱 Bienvenido a EcoAventura</h1>
//           <p style={descripcion}>Ayuda a mejorar el barrio tomando decisiones ambientales.</p>
//           <button onClick={() => setMostrarJuego(true)} style={boton}>
//             Jugar
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// const contenedorMenu: React.CSSProperties = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '100vh',
//   flexDirection: 'column',
//   textAlign: 'center',
//   backgroundColor: '#f0f0f0',
//   borderRadius: '12px',
//   padding: '20px',
// };

// const titulo: React.CSSProperties = {
//   fontSize: '2.5rem',
//   marginBottom: '1rem',
// };

// const descripcion: React.CSSProperties = {
//   fontSize: '1.2rem',
//   marginBottom: '2rem',
// };

// const boton: React.CSSProperties = {
//   padding: '15px 30px',
//   fontSize: '1.2rem',
//   borderRadius: '12px',
//   backgroundColor: '#4CAF50',
//   color: 'white',
//   border: 'none',
//   cursor: 'pointer',
//   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//   transition: 'background-color 0.3s ease',
// };
import React, { useState } from 'react';
import MapaBarrio from './MapaBarrio'; // Componente del Nivel 1
import MapaRio from './MapaRio'; // Componente del Nivel 2
import FuturoEscena from './FuturoEscena'; // Componente para el futuro del Nivel 1
import FuturoEscena2 from './FuturoEscena2'; // Componente para el futuro del Nivel 2

type Futuro = 'muy_bueno' | 'medio' | 'malo' | null;

const App: React.FC = () => {
  const [nivel, setNivel] = useState(1); // Control de nivel (1 o 2)
  const [futuro, setFuturo] = useState<Futuro>(null); // Futuro del juego
  const [puntos, setPuntos] = useState(0); // Puntos acumulados

  // Función para avanzar de nivel
  const avanzarNivel = () => {
    setFuturo(null);  // Reseteamos el futuro antes de avanzar al siguiente nivel
    if (nivel === 1) {
      setNivel(2); // Cambia al Nivel 2 cuando se haya completado el Nivel 1
    }
  };

  // Si estamos en el Nivel 1
  if (nivel === 1) {
    return (
      <div className="App">
        <h1>🌱 Juego Ambiental - Nivel 1: El Barrio</h1>
        <MapaBarrio setPuntos={setPuntos} setFuturo={setFuturo} />
        {futuro && (
          <div>
            <FuturoEscena tipo={futuro} puntos={puntos} onContinuar={avanzarNivel} />
          </div>
        )}
      </div>
    );
  }

  // Si estamos en el Nivel 2
  return (
    <div className="App">
      <h1>🌊 Juego Ambiental - Nivel 2: El Río</h1>
      <MapaRio setPuntos={setPuntos} setFuturo={setFuturo} />
      {futuro && (
        <div>
          <FuturoEscena2 futuro={futuro} />
        </div>
      )}
    </div>
  );
};

export default App;






