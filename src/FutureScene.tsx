
import React from 'react';
import { FutureResults} from './constants';

interface FutureSceneProps {
  results: FutureResults
  onContinue: () => void; // Función para continuar al siguiente nivel
}

const FutureScene: React.FC<FutureSceneProps> = ({ results, onContinue }) => {
  const {
    message, image, type,title
  } = results;

  return (
    <div style={contenedor}>
      <h2 style={titulo}>{title}</h2>
      <img src={image} alt={`Futuro ${type}`} style={futureSceneStyles.image} />
      <p style={mensaje}>{message}</p> {/* Mostramos el mensaje con el puntaje */}
      <button onClick={onContinue} style={boton}>Continuar</button> {/* Botón de continuar */}
    </div>
  );
};

export default FutureScene;

const futureSceneStyles = {
  image: {
    width: '100%',
    maxWidth: '1000px', // Limitar el tamaño máximo de la imagen
    height: 'auto', // Mantener la relación de aspecto original
    padding: '0 20px', // Espaciado más amplio para que no esté tan pegado al borde
    border: '5px solid #00ffff', // Borde neón más grueso para un efecto más marcado
    borderRadius: '15px', // Bordes más redondeados para un aspecto más suave
    boxShadow: '0 0 20px #00ffff, 0 0 30px #00b3b3', // Sombras brillantes y suaves
    animation: 'neon-flicker 2s infinite alternate', // Animación de neón suave
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease', // Suaviza la animación de escala y sombras
    cursor: 'pointer', // Agregar cursor pointer para indicar que la imagen es interactiva
    '&:hover': {
      transform: 'scale(1.05)', // Efecto de escala al pasar el cursor
      boxShadow: '0 0 40px #00ffff, 0 0 50px #00b3b3', // Intensificar sombras al pasar el cursor
    },
  }
}

// Estilo de los componentes
const contenedor: React.CSSProperties = {
  textAlign: 'center',
  padding: '2rem',
  backgroundColor: '#1a1a1a', // Fondo oscuro para hacer que el contenido se resalte
  borderRadius: '20px', // Bordes redondeados para el contenedor
  boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)', // Sombras para dar un toque futurista
  margin: '20px auto', // Centrado automático con margen
  maxWidth: '1200px', // Limitar el ancho del contenedor
  transition: 'all 0.3s ease', // Transición suave para cualquier cambio de estado
};

const titulo: React.CSSProperties = {
  fontSize: '2.5rem',  // Tamaño de fuente más grande para destacar el título
  marginBottom: '0.5rem',
  color: '#00ffff',  // Color de texto neón
  textShadow: '0 0 10px #00ffff', // Efecto de sombra de texto
  fontWeight: 'bold',
};

// Estilo para el mensaje (p)
const mensaje: React.CSSProperties = {
  fontSize: '1.7rem', // Tamaño de fuente mayor al estándar
  marginTop: '1rem',
  color: '#fff',
  textAlign: 'center',
  fontStyle: 'italic',  // Para darle un toque visual más suave
};

// Estilo para el botón
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
