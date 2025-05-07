import React, { useState } from 'react';
import { motion } from 'framer-motion';
import fondoOscuro from '../assets/fondoOscuro.jpg';
import fondoClaro from '../assets/fondoClaro.jpg';
import './Inicio.css';

interface MenuProps {
  onStart: () => void;
}

const Menu: React.FC<MenuProps> = ({ onStart }) => {
  const [mostrarControles, setMostrarControles] = useState(false);
  const [mostrarCreditos, setMostrarCreditos] = useState(false);

  return (
    <div className="inicio-dual-bg">
      {/* FONDOS */}
      <img src={fondoOscuro} className="imagen-incendio" alt="Futuro oscuro" />
      <img src={fondoClaro} className="imagen-bosque" alt="Futuro brillante" />

      {/* DIVISOR */}
      <div className="divisor-animado"></div>

      {/* CUADRO CENTRAL */}
      <motion.div
        className="contenedor-central"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {!mostrarControles && !mostrarCreditos && (
          <>
            <h1 className="central-texto">🌿 EcoAventura</h1>
            <p className="central-texto">Elige sabiamente. Tu decisión impacta el planeta.</p>
            <motion.button
              className="start-button neon-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
            >
              🎮 Jugar
            </motion.button>
            <motion.button
              className="start-button neon-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMostrarControles(true)}
            >
              📘 Controles
            </motion.button>
            <motion.button
              className="start-button neon-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMostrarCreditos(true)}
            >
              📜 Créditos
            </motion.button>
          </>
        )}

        {mostrarControles && (
          <>
            <h2 className="central-texto">🕹️ Controles</h2>
            <ul style={{ color: 'white', listStyle: 'none', padding: 0 }}>
              <li>✔️ Buena acción = suma puntos</li>
              <li>❌ Mala acción = resta puntos</li>
              <li>🚀 Ver el futuro = muestra el resultado</li>
            </ul>
            <button className="start-button neon-button" onClick={() => setMostrarControles(false)}>🔙 Volver</button>
          </>
        )}

        {mostrarCreditos && (
          <>
            <h2 className="central-texto">📜 Créditos</h2>
            <p style={{ color: 'white' }}>Juego desarrollado por tu equipo ambiental 💚</p>
            <p style={{ color: 'white' }}>Ilustraciones creadas con IA</p>
            <button className="start-button neon-button" onClick={() => setMostrarCreditos(false)}>🔙 Volver</button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Menu;



const titulo: React.CSSProperties = {
  fontSize: '2rem',
  marginBottom: '0.5rem',
  textShadow: '0 0 10px #0ff',
};

const subtitulo: React.CSSProperties = {
  fontSize: '1rem',
  marginBottom: '1.5rem',
};

const botonNeon: React.CSSProperties = {
  display: 'block',
  width: '100%',
  margin: '0.5rem auto',
  padding: '0.8rem 1rem',
  fontSize: '1rem',
  color: '#0ff',
  background: 'transparent',
  border: '2px solid #0ff',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 0 8px #0ff',
};

const lista: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: '1rem 0',
  color: '#fff',
};

