import React from 'react';
import { Level } from '../constants';
import { motion } from 'framer-motion';

interface IntroduccionProps {
  nivel: Level;  // Asegúrate de que esto esté tipado como Level
  onStart: () => void;
}

const Introduccion: React.FC<IntroduccionProps> = ({ nivel, onStart }) => {
  const obtenerContexto = (nivel: Level) => {
    switch (nivel) {
      case Level.Town:
        return {
          titulo: "Bienvenido a Bajarrio",
          descripcion:
            "Te has convertido en el alcalde de Bajarrio, un barrio lleno de potencial. Sin embargo, los desafíos son grandes: calles rotas, falta de agua potable y crecientes desigualdades. Cada decisión que tomes afectará el futuro de la comunidad. ¿Qué rumbo tomarás?",
          objetivo:
            "Tu objetivo es mejorar la infraestructura del barrio, gestionar los recursos y tomar decisiones que beneficien a los ciudadanos.",
        };
      case Level.River:
        return {
          titulo: "Ahora eres Alcalde de la Ciudad",
          descripcion:
            "Has sido elegido como alcalde de la ciudad, un lugar mucho más grande y con desafíos más complejos. La expansión de la ciudad, la gestión de la contaminación y la seguridad pública serán tus principales preocupaciones.",
          objetivo:
            "Tu tarea será gestionar la ciudad, mantener el equilibrio entre el desarrollo y la sostenibilidad, y resolver las crisis que surjan.",
        };
      case Level.City:
        return {
          titulo: "El Presidente de la Nación",
          descripcion:
            "Ahora estás al mando de toda una nación. Las decisiones que tomes afectarán a millones de personas. La economía, la salud pública y las relaciones internacionales estarán en tus manos.",
          objetivo:
            "Tu objetivo es gestionar la nación, resolver las crisis internas y externas, y garantizar que tu país avance en todos los aspectos sociales y económicos.",
        };
      case Level.Global:
        return {
          titulo: "Figura Global en el Gobierno Mundial",
          descripcion:
            "Como una figura influyente en el gobierno mundial, tu poder se extiende más allá de las fronteras de tu país. El mundo entero te observa mientras tomas decisiones sobre el cambio climático, la pobreza y la cooperación global.",
          objetivo:
            "Tu objetivo es abordar los problemas globales y trabajar hacia un futuro sostenible para la humanidad, gestionando relaciones internacionales y resolviendo crisis globales.",
        };
      case Level.Mars:
        return {
          titulo: "Colonia en Marte: El Futuro de la Humanidad",
          descripcion:
            "Te encuentras liderando la **primera colonia humana en Marte**. El futuro de la humanidad está en tus manos, y las decisiones que tomes determinarán el éxito o el fracaso de esta nueva civilización.",
          objetivo:
            "Tu objetivo es gestionar la colonia marciana, extraer recursos, construir infraestructura y garantizar la supervivencia de los colonos en un planeta hostil.",
        };
      default:
        return {
          titulo: "",
          descripcion: "",
          objetivo: "",
        };
    }
  };

  const { titulo, descripcion, objetivo } = obtenerContexto(nivel);

  return (
    <div className="contexto-container">
      <motion.div
        className="contexto-box"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="contexto-titulo">{titulo}</h2>
        <p className="contexto-descripcion">{descripcion}</p>
        <h3 className="contexto-objetivo">Objetivo:</h3>
        <p className="contexto-objetivo-descripcion">{objetivo}</p>

        <motion.button
          className="start-button neon-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
        >
          Comenzar
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Introduccion;
