import React, { useState } from 'react';
import { motion } from 'framer-motion';
import fondoOscuro from '../assets/fondoOscuro.jpg';
import fondoClaro from '../assets/fondoClaro.jpg';
import './Inicio.css';
import { Howl } from 'howler';
import clickSound from '../assets/sounds/confirm_sound.mp3';
import { useTTSContext } from '../assets/hooks/TTSContext';

interface MenuProps {
  onStart: () => void;
}

const Menu: React.FC<MenuProps> = ({ onStart }) => {
  const [mostrarControles, setMostrarControles] = useState(false);
  const [mostrarCreditos, setMostrarCreditos] = useState(false);
  const { ttsEnabled, toggleTTS } = useTTSContext();

  // Función para reproducir el sonido de clic
  const playClickSound = () => {
    const sound = new Howl({
      src: [clickSound],
      volume: 0.5,  // Ajusta el volumen según lo necesites
    });
    sound.play();
  };

  function reproducirLectura() {
    function reproducirLectura() {
      const synth = window.speechSynthesis;
      synth.cancel();
    
      const lineas = [
        'Bienvenido a EcoAventura',
        'Elige sabiamente. Tu decisión impacta el planeta.'
      ];
    
      let i = 0;
      const leerLinea = () => {
        if (i >= lineas.length) return;
        const texto = new SpeechSynthesisUtterance(lineas[i]);
        texto.lang = 'es-ES';
        texto.onend = () => {
          i++;
          leerLinea(); // lee la siguiente
        };
        synth.speak(texto);
      };
    
      leerLinea();
    }
  }
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
              onClick={() => {
                reproducirLectura();
                onStart();
                
              }}
            >
              🎮 Jugar
            </motion.button>
            <motion.button
              className="start-button neon-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setMostrarControles(true); playClickSound(); }}  // Agrega el sonido al hacer clic
            >
              📘 Controles
            </motion.button>
            <motion.button
              className="start-button neon-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setMostrarCreditos(true); playClickSound(); }}  // Agrega el sonido al hacer clic
            >
              📜 Créditos
            </motion.button>
            <motion.button
            className="start-button neon-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { toggleTTS(); playClickSound(); }}
          >
            {ttsEnabled ? '🔇 Desactivar lector' : '🔊 Activar lector'}
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
            <button className="start-button neon-button" onClick={() => { setMostrarControles(false); playClickSound(); }}>🔙 Volver</button>
          </>
        )}

        {mostrarCreditos && (
          <>
            <h2 className="central-texto">📜 Créditos</h2>
            <p style={{ color: 'white' }}>Juego desarrollado por tu equipo ambiental 💚</p>
            <p style={{ color: 'white' }}>Ilustraciones creadas con IA</p>
            <button className="start-button neon-button" onClick={() => { setMostrarCreditos(false); playClickSound(); }}>🔙 Volver</button>
          </>
        )}
      </motion.div>
    </div>
  );
};


export default Menu;
