import React, { useState } from 'react';

// Definir el tipo de la partida
interface Partida {
  nombre: string;
  puntos: number;
}

interface CargarPartidaProps {
  onAddPartida: (partida: Partida) => void;
}

const CargarPartida: React.FC<CargarPartidaProps> = ({ onAddPartida }) => {
  const [nombre, setNombre] = useState('');
  const [puntos, setPuntos] = useState(0);

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (nombre && puntos !== null) {
      const partida: Partida = {
        nombre,
        puntos,
      };
      onAddPartida(partida);
      setNombre(''); // Limpiar el campo de nombre
      setPuntos(0); // Limpiar el campo de puntos
    } else {
      alert('Por favor, ingresa un nombre y los puntos.');
    }
  };

  return (
    <div>
      <h3>Cargar Nueva Partida</h3>
      <input
        type="text"
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Puntos"
        value={puntos}
        onChange={(e) => setPuntos(Number(e.target.value))}
      />
      <button onClick={handleSubmit}>Guardar Partida</button>
    </div>
  );
};

export default CargarPartida;
