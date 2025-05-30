import React, { useEffect } from "react";
import { Howl } from "howler"; // Importar la librería Howler para reproducir sonidos
import positvo from '../assets/sounds/path_to_positive_sound.mp3'
import negativo from '../assets/sounds/path_to_negative_sound.mp3'
import medio from '../assets/sounds/path_to_intermediate_sound.mp3'

interface FinalSceneProps {
  progress: number; // Barra de progreso
  onFinish: () => void; // Función para reiniciar el juego
}

const FinalScene: React.FC<FinalSceneProps> = ({ progress, onFinish }) => {
  // Sonidos para cada resultado
  const sonidoPositivo = new Howl({
    src: [positvo], // Ruta del sonido positivo
    volume: 0.5,
  });

  const sonidoIntermedio = new Howl({
    src: [medio], // Ruta del sonido intermedio
    volume: 0.5,
  });

  const sonidoNegativo = new Howl({
    src: [negativo], // Ruta del sonido negativo
    volume: 0.5,
  });

  // Función para reproducir el sonido basado en el progreso
  useEffect(() => {
    if (progress === 100) {
      sonidoPositivo.play();
    } else if (progress >= 50) {
      sonidoIntermedio.play();
    } else {
      sonidoNegativo.play();
    }
  }, [progress]); // Se ejecuta cada vez que el progreso cambia

  // Mensaje final basado en el progreso
  const mensajeFinal = (porcentaje: number) => {
    if (porcentaje === 100) {
      return "¡Felicidades! Has alcanzado el máximo progreso. ¡Tu impacto ha sido positivo!";
    } else if (porcentaje >= 50) {
      return "Bien hecho, pero aún hay mucho por mejorar. ¡Sigue trabajando en mejorar el entorno!";
    } else {
      return "El futuro no es brillante. Necesitas tomar mejores decisiones para mejorar el mundo.";
    }
  };

  return (
    <div style={finalContainer}>
      <div style={mensajeFinalStyle}>
        <h1 style={tituloEstilo}>¡Fin del Juego!</h1>
        <p style={descripcionEstilo}>{mensajeFinal(progress)}</p>
        <button style={botonEstilo} onClick={onFinish}>
          Volver a Jugar
        </button>
      </div>
    </div>
  );
};

// Estilos para la escena final
const finalContainer: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro con transparencia
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000, // Asegura que esté sobre todo el contenido
};

const mensajeFinalStyle: React.CSSProperties = {
  background: 'rgba(0, 0, 0, 0.8)',
  color: 'white',
  borderRadius: '15px',
  padding: '30px 50px',
  textAlign: 'center',
  boxShadow: '0 0 20px #00ffcc',
  backdropFilter: 'blur(10px)',
};

const tituloEstilo: React.CSSProperties = {
  fontSize: '3rem',
  color: '#00ffcc',
  textShadow: '0 0 10px #00ffff',
};

const descripcionEstilo: React.CSSProperties = {
  fontSize: '1.5rem',
  color: '#fff',
  marginBottom: '20px',
  textShadow: '0 0 5px #00ffff',
};

const botonEstilo: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#00b3b3',
  border: 'none',
  borderRadius: '10px',
  color: '#fff',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 0 10px #00ffcc',
};

export default FinalScene;
