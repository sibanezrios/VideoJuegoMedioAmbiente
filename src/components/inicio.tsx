import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Inicio.css';

import fondoOscuro from '../assets/fondoOscuro.jpg';
import fondoClaro from '../assets/fondoClaro.jpg';

interface Props {
  onStart: (nombre: string) => void;
}

export default function Inicio({ onStart }: Props) {
  const [nombre, setNombre] = useState('');

  const handleStart = () => {
    if (nombre.trim()) {
      localStorage.setItem('jugador_nombre', nombre);
      onStart(nombre);
    } else {
      alert('Por favor ingresa tu nombre antes de comenzar.');
    }
  };

  return (
    <div className="inicio-dual-bg">
      <img src={fondoOscuro} className="imagen-incendio" alt="Futuro oscuro" />
      <img src={fondoClaro} className="imagen-bosque" alt="Futuro brillante" />
      <div className="divisor-animado"></div>

      <motion.div
        className="contenedor-central"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="central-texto">¿Estás listo para tomar la mejor decisión?</p>

        {/* Campo de nombre */}
        <input
          type="text"
          placeholder="Tu nombre..."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="nombre-input"
        />

        <motion.button
          className="start-button neon-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
        >
          🚀 START
        </motion.button>
      </motion.div>
    </div>
  );
}
