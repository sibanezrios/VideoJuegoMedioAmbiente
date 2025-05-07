
import React from 'react';
import bueno2 from './assets/futuro_bueno_rio.png';  // Imagen para el futuro bueno (Nivel 2)
import medio2 from './assets/futuro_medio_rio.png';  // Imagen para el futuro medio (Nivel 2)
import malo2 from './assets/futuro_malo_rio.png';  // Imagen para el futuro malo (Nivel 2)

type Futuro = 'muy_bueno' | 'medio' | 'malo';

interface FuturoEscena2Props {
  futuro: Futuro;
}

const mensajes = {
  muy_bueno: '¡El río está limpio y la comunidad está más saludable! 🎉',
  medio: 'El río ha mejorado, pero aún queda trabajo por hacer. 🌱',
  malo: 'El río está muy contaminado y la comunidad está sufriendo. 💔',
};

const imagenes = {
  muy_bueno: bueno2,
  medio: medio2,
  malo: malo2,
};

const FuturoEscena2: React.FC<FuturoEscena2Props> = ({ futuro }) => {
  return (
    <div style={contenedor}>
      <h2>El Futuro del Río</h2>
      <img src={imagenes[futuro]} alt={`Futuro ${futuro}`} style={{ width: '100%', maxWidth: '600px', borderRadius: '12px' }} />
      <p>{mensajes[futuro]}</p> {/* Mostramos el mensaje con el futuro */}
    </div>
  );
};

export default FuturoEscena2;

const contenedor: React.CSSProperties = {
  textAlign: 'center',
  padding: '2rem'
};

