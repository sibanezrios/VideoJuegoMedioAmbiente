import React from 'react';

interface DecisionPopupProps {
  tipo: 'arbol' | 'fabrica' | 'lote';
  onClose: () => void;
  onSelect: (decision: string) => void;
}

const preguntas = {
  arbol: "¿Quieres conservar los árboles?",
  fabrica: "¿Quieres cerrar esta fábrica contaminante?",
  lote: "¿Quieres convertir este espacio en un parque?"
};

const opciones = {
  arbol: [
    { texto: "Sí, conservar", valor: "conservar" },
    { texto: "No, talar", valor: "talar" }
  ],
  fabrica: [
    { texto: "Sí, cerrar", valor: "cerrar" },
    { texto: "No, dejarla abierta", valor: "dejar" }
  ],
  lote: [
    { texto: "Sí, hacer parque", valor: "parque" },
    { texto: "No, dejarlo vacío", valor: "vacío" }
  ]
};

const DecisionPopup: React.FC<DecisionPopupProps> = ({ tipo, onClose, onSelect }) => {
  return (
    <div style={fondo}>
      <div style={popup}>
        <h2>{preguntas[tipo]}</h2>
        <div style={{ marginTop: '1rem' }}>
          {opciones[tipo].map((op, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(op.valor)}
              style={boton}
            >
              {op.texto}
            </button>
          ))}
        </div>
        <button onClick={onClose} style={{ ...boton, marginTop: '1rem', backgroundColor: '#ccc' }}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default DecisionPopup;

const fondo: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const popup: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px',
  width: '300px',
  textAlign: 'center',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
};

const boton: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '10px',
  margin: '0.5rem 0',
  fontSize: '1rem',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#4CAF50',
  color: 'white',
  cursor: 'pointer'
};
