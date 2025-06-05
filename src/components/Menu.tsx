import React, { useState } from 'react';
import { motion } from 'framer-motion';
import fondoOscuro from '../assets/fondoOscuro.jpg';
import fondoClaro from '../assets/fondoClaro.jpg';
import './Inicio.css';
import { Howl } from 'howler';
import clickSound from '../assets/sounds/confirm_sound.mp3';
import { useTTSContext } from '../assets/hooks/TTSContext';
import HistorialPartidas from './Historial';

interface MenuProps {
  onStart: () => void;
}

const Menu: React.FC<MenuProps> = ({ onStart }) => {
  const [mostrarControles, setMostrarControles] = useState(false);
  const [mostrarCreditos, setMostrarCreditos] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const { ttsEnabled, toggleTTS } = useTTSContext();

  const playClickSound = () => {
    const sound = new Howl({
      src: [clickSound],
      volume: 0.5,
    });
    sound.play();
  };

  const reproducirLectura = () => {
    const synth = window.speechSynthesis;
    synth.cancel();

    const lineas = [
      'Bienvenido a Eco_Heroes',
      'Elige sabiamente. Tu decisión impacta el planeta.'
    ];

    let i = 0;
    const leerLinea = () => {
      if (i >= lineas.length) return;
      const texto = new SpeechSynthesisUtterance(lineas[i]);
      texto.lang = 'es-ES';
      texto.onend = () => {
        i++;
        leerLinea();
      };
      synth.speak(texto);
    };

    leerLinea();
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
        {!mostrarControles && !mostrarCreditos && !mostrarHistorial && (
          <>
            <h1 className="central-texto">🌿 Eco_Heroes</h1>
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
              onClick={() => { setMostrarControles(true); playClickSound(); }}
            >
              📘 Controles
            </motion.button>

            <motion.button
              className="start-button neon-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setMostrarCreditos(true); playClickSound(); }}
            >
              📜 Créditos
            </motion.button>

            <motion.button
              className="start-button neon-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setMostrarHistorial(true); playClickSound(); }}
            >
              📊 Historial
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
    <h2 className="central-texto">🕹️ ¿Cómo se juega?</h2>
    <ul style={{ color: 'white', listStyle: 'none', padding: 0 }}>
      <li>🔍 Debes buscar los elementos clickeables dentro de cada mapa (fábricas, árboles, asentamientos, etc).</li>
      <li>🧠 Al hacer clic, deberás tomar decisiones que afectan el futuro del planeta.</li>
      <li>✔️ Si tomas buenas decisiones, se suman puntos y mejoras el futuro.</li>
      <li>❌ Si tomas malas decisiones, perderás puntos y el planeta empeorará.</li>
      <li>🚀 Usa el botón "Ver Futuro" para ver el impacto de tus elecciones.</li>
    </ul>
    <button
      className="start-button neon-button"
      onClick={() => {
        setMostrarControles(false);
        playClickSound();
      }}
    >
      🔙 Volver
    </button>
  </>
)}

{mostrarCreditos && (
  <>
    <h2 className="central-texto">📜 Créditos</h2>
    <p style={{ color: 'white' }}>🎮 <strong>EcoSpark Studios</strong></p>
    <ul style={{ color: 'white', listStyle: 'none', padding: 0 }}>
      <li>👨‍💼 Miguel Cortes — Gerente de proyectos</li>
      <li>🧪 Juan D. Durán — Director de pruebas</li>
      <li>🎨 Sara Ibañez — Directora de UI/UX y de diseño</li>
      <li>📄 Juan M. Marín — Director de documentación</li>
    </ul>
    <p style={{ color: 'white', marginTop: '10px' }}>
      💡 Con el apoyo técnico de <strong>ChatGPT (OpenAI)</strong> para lógica, diseño narrativo y asistencia en programación.
    </p>
    <p style={{ color: 'white' }}>🖼️ Ilustraciones creadas con IA</p>
    <button
      className="start-button neon-button"
      onClick={() => {
        setMostrarCreditos(false);
        playClickSound();
      }}
    >
      🔙 Volver
    </button>
  </>
)}

        {mostrarHistorial && (
          <>
            <HistorialPartidas />
            <button
              className="start-button neon-button"
              onClick={() => { setMostrarHistorial(false); playClickSound(); }}
            >
              🔙 Volver
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Menu;
