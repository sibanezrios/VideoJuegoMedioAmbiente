import React, { useEffect, useRef } from "react";
import { Howl } from "howler";
import positvo from '../assets/sounds/path_to_positive_sound.mp3';
import negativo from '../assets/sounds/path_to_negative_sound.mp3';
import medio from '../assets/sounds/path_to_intermediate_sound.mp3';
import { RegistroJugador } from "../utils/Register";

import { BufferWriterNavegador } from "./BufferWriterNavegador";

interface FinalSceneProps {
  progress: number; // Progreso final del jugador (0-100)
  onFinish: () => void; // Función para reiniciar el juego
}

const FinalScene: React.FC<FinalSceneProps> = ({ progress, onFinish }) => {
  const roundedProgress = Number(progress.toFixed(2));
  const hasPlayedSound = useRef(false);

  const sonidoPositivo = new Howl({ src: [positvo], volume: 0.5 });
  const sonidoIntermedio = new Howl({ src: [medio], volume: 0.5 });
  const sonidoNegativo = new Howl({ src: [negativo], volume: 0.5 });

  useEffect(() => {
    if (!hasPlayedSound.current) {
      if (roundedProgress === 100) {
        sonidoPositivo.play();
      } else if (roundedProgress >= 50) {
        sonidoIntermedio.play();
      } else {
        sonidoNegativo.play();
      }
      hasPlayedSound.current = true;
    }

    
  }, [roundedProgress]);

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
        <h2 style={porcentajeEstilo}>
          Terminaste con {roundedProgress}% de Buenas Obras
        </h2>
        <div style={barraContenedor}>
          <div style={{ ...barraEstilo, width: `${roundedProgress}%` }} />
          <div style={porcentajeEstilo}>{roundedProgress}%</div>
        </div>
        <p style={descripcionEstilo}>{mensajeFinal(roundedProgress)}</p>
        <button style={botonEstilo} onClick={onFinish}>
          Volver a Jugar
        </button>
              <button
        onClick={() =>
          BufferWriterNavegador.descargarComoTxt(RegistroJugador.obtenerTodos())
        }
        style={{
          marginTop: '16px',
          padding: '10px 20px',
          backgroundColor: '#10B981',
          color: 'white',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)',
          transition: 'all 0.3s ease'
        }}
      >
        📄 Descargar Historial de Partidas
      </button>
      </div>
    </div>
  );
};
// Estilos
const finalContainer: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
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

const porcentajeEstilo: React.CSSProperties = {
  fontSize: '1.8rem',
  color: '#00ffff',
  margin: '20px 0',
};

const barraContenedor: React.CSSProperties = {
  width: '300px',
  height: '20px',
  backgroundColor: '#e0e0e0',
  borderRadius: '10px',
  margin: '10px auto 20px',
  position: 'relative',
  overflow: 'hidden',
};

const barraEstilo: React.CSSProperties = {
  height: '100%',
  backgroundColor: '#4CAF50',
  borderRadius: '10px',
  transition: 'width 0.5s ease-in-out',
};

const etiquetaEstilo: React.CSSProperties = {
  position: 'absolute',
  top: '22px',
  left: '50%',
  transform: 'translateX(-50%)',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1rem',
};

const descripcionEstilo: React.CSSProperties = {
  fontSize: '1.3rem',
  color: '#fff',
  marginTop: '20px',
  textShadow: '0 0 5px #00ffff',
};

const botonEstilo: React.CSSProperties = {
  marginTop: '30px',
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
