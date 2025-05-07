

import React from 'react';
import bueno from './assets/futuro_bueno.png';
import medio from './assets/futuro_medio.png';
import malo from './assets/futuro_malo.png';

interface FuturoEscenaProps {
  tipo: 'muy_bueno' | 'medio' | 'malo';
  puntos: number; // Agregamos los puntos para mostrar la retroalimentación
}

const mensajes = {
  muy_bueno: (puntos: number) => `¡Felicidades! Has creado un barrio saludable y sostenible. 🌳🎉 Puntaje: ${puntos}`,
  medio: (puntos: number) => `Bien hecho, el barrio mejoró, pero aún hay trabajo por hacer. 🌱 Puntaje: ${puntos}`,
  malo: (puntos: number) => `El barrio empeoró. ¡Aún puedes mejorar! 💔 Puntaje: ${puntos}`
};

const imagenes = {
  muy_bueno: bueno,
  medio: medio,
  malo: malo
};

const FuturoEscena: React.FC<FuturoEscenaProps> = ({ tipo, puntos }) => {
  const irACapitulo2 = () => {
    alert("¡Has completado el Capítulo 1! Avanzando al Capítulo 2...");
    // Aquí podrías usar algo como react-router para navegar entre capítulos
  };

  return (
    <div style={contenedor}>
      <h2>El Futuro del Barrio</h2>
      <img src={imagenes[tipo]} alt={`Futuro ${tipo}`} style={{ width: '100%', maxWidth: '600px', borderRadius: '12px' }} />
      <p>{mensajes[tipo](puntos)}</p> {/* Mostramos el mensaje con el puntaje */}
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
export {};

