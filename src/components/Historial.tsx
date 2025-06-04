import React, { useEffect, useState } from 'react';
import { RegistroJugador, Registro } from '../utils/Register';

const HistorialPartidas: React.FC = () => {
  const [registros, setRegistros] = useState<Registro[]>([]);

  useEffect(() => {
    const partidas = RegistroJugador.obtenerTodos();
    // Ordenar por fecha descendente
    partidas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    setRegistros(partidas);
  }, []);

  return (
    <div style={contenedor}>
      <h2 style={titulo}>🏆 Historial de Partidas</h2>

      {registros.length === 0 ? (
        <p style={mensaje}>No hay partidas registradas.</p>
      ) : (
        <ul style={lista}>
          {registros.map((reg, i) => (
            <li key={i} style={item}>
              <strong>{reg.nombre}</strong> obtuvo <strong>{reg.puntaje.toFixed(2)}%</strong> el{" "}
              {new Date(reg.fecha).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Estilos inline
const contenedor: React.CSSProperties = {
  backgroundColor: 'rgba(0,0,0,0.7)',
  color: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 15px #00ffcc',
  maxWidth: '600px',
  margin: '30px auto',
  textAlign: 'left',
};

const titulo: React.CSSProperties = {
  fontSize: '2rem',
  marginBottom: '20px',
  color: '#00ffff',
  textShadow: '0 0 10px #00ffcc',
};

const mensaje: React.CSSProperties = {
  fontStyle: 'italic',
};

const lista: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
};

const item: React.CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  padding: '10px',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
};

export default HistorialPartidas;
