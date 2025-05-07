
import React from 'react';

interface DecisionPopupProps {
  tipo: 'arbol' | 'fabrica' | 'lote' | 'rio' | 'planta' | 'bosque';  // Tipo de la decisión
  pregunta: string; // Pregunta a mostrar
  opciones: { texto: string; valor: string }[]; // Opciones para seleccionar
  onClose: () => void; // Función para cerrar el popup
  onSelect: (decision: string) => void; // Función para manejar la selección
}

const DecisionPopup: React.FC<DecisionPopupProps> = ({ tipo, pregunta, opciones, onClose, onSelect }) => {
  return (
    <div style={{ position: 'absolute', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
        <h3>{pregunta}</h3>
        {opciones.map((opcion) => (
          <button key={opcion.valor} onClick={() => { onSelect(opcion.valor); onClose(); }} style={{ margin: '10px' }}>
            {opcion.texto}
          </button>
        ))}
        <button onClick={onClose} style={{ marginTop: '20px', backgroundColor: '#f44336', color: 'white' }}>Cerrar</button>
      </div>
    </div>
  );
};

export default DecisionPopup;


