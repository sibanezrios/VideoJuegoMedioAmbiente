import React from 'react';
import muyBueno3 from './assets/futuro_bueno_ciudad.png';  // Imagen para el futuro muy bueno
import medio3 from './assets/futuro_medio_ciudad.png';  // Imagen para el futuro medio
import malo3 from './assets/futuro_malo_ciudad.png';  // Imagen para el futuro malo

type Futuro = 'muy_bueno' | 'medio' | 'malo';

interface FuturoEscena3Props {
  futuro: Futuro;
  puntos: number;
  onContinuar: () => void; // Función para continuar al siguiente nivel
}

const mensajes = {
  muy_bueno: (puntos: number) => `¡Felicidades! La ciudad ha crecido de manera sostenible. 🌳🎉 Puntaje: ${puntos}`,
  medio: (puntos: number) => `La ciudad ha mejorado, pero aún quedan algunos problemas por resolver. 🌱 Puntaje: ${puntos}`,
  malo: (puntos: number) => `La ciudad ha empeorado, con consecuencias negativas a largo plazo. 💔 Puntaje: ${puntos}`,
};

const imagenes = {
  muy_bueno: muyBueno3,
  medio: medio3,
  malo: malo3,
};

const FuturoEscena3: React.FC<FuturoEscena3Props> = ({ futuro, puntos, onContinuar }) => {
  return (
    <div style={contenedor}>
      <h2>El Futuro de la Ciudad</h2>
      <img
        src={imagenes[futuro]}
        alt={`Futuro ${futuro}`}
        style={{ width: '100%', maxWidth: '600px', borderRadius: '12px' }}
      />
      <p>{mensajes[futuro](puntos)}</p>
      <button onClick={onContinuar} style={boton}>
        Continuar
      </button>
    </div>
  );
};

export default FuturoEscena3;

const contenedor: React.CSSProperties = {
  textAlign: 'center',
  padding: '2rem',
};

const boton: React.CSSProperties = {
  marginTop: '1rem',
  padding: '12px 28px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  borderRadius: '10px',
  background: 'linear-gradient(145deg, #00ffcc, #00b3b3)',  // Gradiente de color turquesa
  color: '#000',  // Texto negro para resaltar sobre el fondo brillante
  border: '2px solid #00ffff',  // Borde en color cyan (neón)
  boxShadow: '0 0 12px rgba(0, 255, 255, 0.4), inset 0 0 6px rgba(0, 255, 255, 0.6)',  // Efecto de resplandor (neón)
  cursor: 'pointer',
  transition: 'all 0.3s ease',  // Transición suave para los cambios de hover
};

// Estilo de hover para el botón
const botonHover: React.CSSProperties = {
  ...boton,
  background: 'linear-gradient(145deg, #00b3b3, #00ffcc)',  // Cambio de gradiente al pasar el mouse
  boxShadow: '0 0 20px rgba(0, 255, 255, 0.8), inset 0 0 12px rgba(0, 255, 255, 0.9)',  // Aumenta el resplandor en hover
};

