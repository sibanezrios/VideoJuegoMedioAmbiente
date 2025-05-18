import React from 'react';
import bueno2 from './assets/futuro_bueno_rio.png';  // Imagen para el futuro bueno (Nivel 2)
import medio2 from './assets/futuro_medio_rio.png';  // Imagen para el futuro medio (Nivel 2)
import malo2 from './assets/futuro_malo_rio.png';  // Imagen para el futuro malo (Nivel 2)

type Futuro = 'muy_bueno' | 'medio' | 'malo';

interface FuturoEscena2Props {
  futuro: Futuro;
  puntos: number;
  onContinuar: () => void;  // Asegúrate de que esta función esté incluida en las props
}

const mensajes = {
  muy_bueno: '¡El río está limpio y la comunidad está más saludable! 🎉',
  medio: 'El río ha mejorado, pero aún queda trabajo por hacer. 🌱',
  malo: 'El río está muy contaminado y la comunidad está sufriendo. 💔',
};

const imagenes = {
  muy_bueno: bueno2,
  medio: medio2,
  malo: malo2
};

const FuturoEscena2: React.FC<FuturoEscena2Props> = ({ futuro, puntos, onContinuar }) => {
  return (
    <div style={contenedor}>
      <h2>El Futuro del Río</h2>
      <img
        src={imagenes[futuro]}
        alt={`Futuro ${futuro}`}
        style={{ width: '100%', maxWidth: '600px', borderRadius: '12px' }}
      />
      <p>{mensajes[futuro]}</p> {/* Mostramos el mensaje con el futuro */}
      <p>Puntaje: {puntos}</p> {/* Muestra los puntos acumulados */}
      <button onClick={onContinuar} style={boton}>Continuar</button>
    </div>
  );
};

export default FuturoEscena2;

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
