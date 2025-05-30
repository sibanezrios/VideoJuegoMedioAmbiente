
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
      <h2>{title}</h2>
      <img src={image} alt={`Futuro ${type}`} style={futureSceneStyles.image} />
      <p>{message}</p> {/* Mostramos el mensaje con el puntaje */}
      <button onClick={onContinue} style={boton}>Continuar</button> {/* Botón de continuar */}
    </div>
  );
};

export default FutureScene;

const futureSceneStyles = {
  image: {   width: '100%',
    maxWidth: '1000px', // Limitar el tamaño máximo de la imagen
    height: 'auto', // Mantener la relación de aspecto original
    padding: '0 10px', // Espaciado suave
    border: '4px solid #00ffff', // Borde neón más grueso
    borderRadius: '10px', // Bordes redondeados
    boxShadow: '0 0 20px #00ffff, 0 0 30px #00b3b3', // Sombras brillantes y suaves
    animation: 'neon-flicker 2s infinite alternate', // Animación de neón suave
    transition: 'transform 0.3s ease-in-out', // Suaviza la animación de escala 
  }
}

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