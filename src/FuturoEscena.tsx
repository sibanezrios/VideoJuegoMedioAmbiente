
import React from 'react';
import bueno from './assets/futuro_bueno.png';  // Imagen para el futuro bueno
import medio from './assets/futuro_medio.png';  // Imagen para el futuro medio
import malo from './assets/futuro_malo.png';  // Imagen para el futuro malo

// Definimos el tipo de 'futuro' con los valores posibles
type Futuro = 'muy_bueno' | 'medio' | 'malo';

interface FuturoEscenaProps {
  tipo: Futuro;  // Recibimos el futuro como propiedad
  puntos: number;  // Recibimos los puntos acumulados por el jugador
  onContinuar: () => void; // Función para continuar al siguiente nivel
}

// Mensajes que se mostrarán según el futuro
const mensajes = {
  muy_bueno: (puntos: number) => `¡Felicidades! Has creado un barrio saludable y sostenible. 🌳🎉 Puntaje: ${puntos}`,
  medio: (puntos: number) => `Bien hecho, el barrio mejoró, pero aún hay trabajo por hacer. 🌱 Puntaje: ${puntos}`,
  malo: (puntos: number) => `El barrio empeoró. ¡Aún puedes mejorar! 💔 Puntaje: ${puntos}`
};

// Asignación de imágenes según el tipo de futuro
const imagenes = {
  muy_bueno: bueno,
  medio: medio,
  malo: malo
};

const FuturoEscena: React.FC<FuturoEscenaProps> = ({ tipo, puntos, onContinuar }) => {
  return (
    <div style={contenedor}>
      <h2>El Futuro del Barrio</h2>
      <img src={imagenes[tipo]} alt={`Futuro ${tipo}`} style={{ width: '100%', maxWidth: '600px', borderRadius: '12px' }} />
      <p>{mensajes[tipo](puntos)}</p> {/* Mostramos el mensaje con el puntaje */}
      <button onClick={onContinuar} style={boton}>Continuar</button> {/* Botón de continuar */}
    </div>
  );
};

export default FuturoEscena;

// Estilo de los componentes
const contenedor: React.CSSProperties = {
  textAlign: 'center',
  padding: '2rem'
};


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