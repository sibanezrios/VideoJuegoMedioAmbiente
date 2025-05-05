// src/components/FuturoEscena.tsx
import React from 'react';
import bueno from './assets/futuro_bueno.png';
import medio from './assets/futuro_medio.png';
import malo from './assets/futuro_malo.png';

interface FuturoEscenaProps {
  tipo: 'muy_bueno' | 'medio' | 'malo';
}

const mensajes = {
  muy_bueno: "¡Felicitaciones! Tus decisiones cuidaron el ambiente y el barrio floreció. 🌳🌈",
  medio: "Lo hiciste bien, pero aún hay cosas por mejorar en tu comunidad. ♻️",
  malo: "El barrio se deterioró por tus malas decisiones. ¡Puedes hacerlo mejor! 😢"
};

const imagenes = {
  muy_bueno: bueno,
  medio: medio,
  malo: malo
};

const FuturoEscena: React.FC<FuturoEscenaProps> = ({ tipo }) => {
  const irACapitulo2 = () => {
    alert("Próximamente: Capítulo 2 🌎");
  };

  return (
    <div style={contenedor}>
      <h2>Resultado de tus decisiones</h2>
      <img src={imagenes[tipo]} alt={`Futuro ${tipo}`} style={{ width: '100%', maxWidth: '600px', borderRadius: '12px' }} />
      <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>{mensajes[tipo]}</p>
      <button onClick={irACapitulo2} style={boton}>Continuar</button>
    </div>
  );
};

export default FuturoEscena;

const contenedor: React.CSSProperties = {
  textAlign: 'center',
  padding: '2rem'
};

const boton: React.CSSProperties = {
  marginTop: '1rem',
  padding: '10px 20px',
  fontSize: '1rem',
  borderRadius: '8px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  cursor: 'pointer'
};

// Asegúrate de que haya una exportación vacía
export {};  // Esto convierte el archivo en un módulo
