// Opciones para las decisiones del jugador en Marte
export const preguntasYOpciones = {
  asentamiento: {
    pregunta: "¿Qué tipo de asentamientos establecerás para los primeros colonos en Marte?",
    opciones: [
      { texto: "Asentamientos autosuficientes y cómodos, pero costosos y difíciles de expandir", valor: "autosuficiente" },
      { texto: "Asentamientos modulares, eficientes y fáciles de ampliar, aunque menos cómodos", valor: "modular" },
      { texto: "Asentamientos básicos de rápida implementación, pensando en una expansión futura", valor: "básico" }
    ]
  },
  recursos: {
    pregunta: "Los recursos en Marte son escasos. ¿Cómo planeas gestionarlos?",
    opciones: [
      { texto: "Extraer de forma intensiva para asegurar el suministro inmediato, asumiendo riesgos ambientales", valor: "intensiva" },
      { texto: "Usar tecnologías sostenibles de reciclaje y eficiencia para preservar los recursos", valor: "sostenibilidad" },
      { texto: "Establecer comercio regular con la Tierra para importar los recursos necesarios", valor: "comercio" }
    ]
  },
  relaciones: {
    pregunta: "¿Cuál será tu estrategia para mantener relaciones con la Tierra?",
    opciones: [
      { texto: "Depender completamente de la Tierra para apoyo logístico y recursos", valor: "dependencia" },
      { texto: "Buscar independencia total, desarrollando una colonia autosuficiente", valor: "independencia" },
      { texto: "Establecer una relación de cooperación mutua, con autonomía parcial", valor: "cooperacion" }
    ]
  }
};
