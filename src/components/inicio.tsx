import React from 'react';
import { motion } from 'framer-motion';
import './Inicio.css';

import fondoOscuro from '../assets/fondoOscuro.jpg';
import fondoClaro from '../assets/fondoClaro.jpg';

interface Props {
  onStart: () => void;
}

export default function Inicio({ onStart }: Props) {
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
        <p className="central-texto">¿Estás listo para tomar la mejor decisión?</p>
        <motion.button
          className="start-button neon-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
        >
          🚀 START
        </motion.button>
      </motion.div>
    </div>
  );
}
