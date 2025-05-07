
// import React from 'react';

// interface DecisionPopupProps {
//   tipo: 'arbol' | 'fabrica' | 'lote' | 'rio' | 'planta' | 'bosque';  // Tipo de la decisión
//   pregunta: string; // Pregunta a mostrar
//   opciones: { texto: string; valor: string }[]; // Opciones para seleccionar
//   onClose: () => void; // Función para cerrar el popup
//   onSelect: (decision: string) => void; // Función para manejar la selección
// }

// const DecisionPopup: React.FC<DecisionPopupProps> = ({ tipo, pregunta, opciones, onClose, onSelect }) => {
//   return (
//     <div style={{ position: 'absolute', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <div style={{ background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
//         <h3>{pregunta}</h3>
//         {opciones.map((opcion) => (
//           <button key={opcion.valor} onClick={() => { onSelect(opcion.valor); onClose(); }} style={{ margin: '10px' }}>
//             {opcion.texto}
//           </button>
//         ))}
//         <button onClick={onClose} style={{ marginTop: '20px', backgroundColor: '#f44336', color: 'white' }}>Cerrar</button>
//       </div>
//     </div>
//   );
// };

// export default DecisionPopup;

import React from 'react';

type DecisionPopupProps = {
  tipo: 'arbol' | 'fabrica' | 'lote' | 'rio' | 'bosque' | 'planta';  // Permitimos ambos conjuntos de valores
  pregunta: string;
  opciones: { texto: string; valor: string }[];
  onClose: () => void;
  onSelect: (decision: string) => void;
};

const DecisionPopup: React.FC<DecisionPopupProps> = ({
  tipo,
  pregunta,
  opciones,
  onClose,
  onSelect
}) => {
  return (
    <div style={popupContenedor}>
      <div style={popupContenido}>
        <h3 style={titulo}>{pregunta}</h3>
        <div style={opcionesContenedor}>
          {opciones.map((opcion) => (
            <button
              key={opcion.valor}
              onClick={() => onSelect(opcion.valor)}
              style={opcionBoton}
            >
              {opcion.texto}
            </button>
          ))}
        </div>
        <button onClick={onClose} style={cerrarBoton}>Cerrar</button>
      </div>
    </div>
  );
};

export default DecisionPopup;

// Estilos CSS en línea
const popupContenedor: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo semi-transparente
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const popupContenido: React.CSSProperties = {
  backgroundColor: '#121212', // Fondo oscuro
  borderRadius: '10px',
  padding: '20px',
  width: '300px',
  textAlign: 'center',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
};

const titulo: React.CSSProperties = {
  color: 'white', // Título en blanco
  fontSize: '1.2rem',
  marginBottom: '20px',
};

const opcionesContenedor: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const opcionBoton: React.CSSProperties = {
  backgroundColor: 'black',
  color: 'cyan', // Azul neón
  border: '2px solid cyan', // Borde azul neón
  padding: '10px',
  fontSize: '1rem',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
};

const cerrarBoton: React.CSSProperties = {
  marginTop: '15px',
  backgroundColor: '#ff4747', // Rojo para cerrar
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  fontSize: '1rem',
  borderRadius: '5px',
  cursor: 'pointer',
};

