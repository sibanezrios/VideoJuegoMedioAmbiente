// Opciones para las decisiones del jugador
export const preguntasYOpciones = {
  asentamiento: {
    pregunta: "¿Cómo construirás los primeros asentamientos en Marte?",
    opciones: [
      { texto: "Construir grandes asentamientos autosuficientes con alta comodidad", valor: "autosuficiente" },
      { texto: "Construir asentamientos modulares, eficientes pero menos cómodos", valor: "modular" },
      { texto: "Construir asentamientos básicos pero con gran expansión futura", valor: "básico" }
    ]
  },
  recursos: {
    pregunta: "¿Cómo gestionarás los recursos limitados de Marte?",
    opciones: [
      { texto: "Extraer recursos de manera intensiva para asegurar el abastecimiento inmediato", valor: "intensiva" },
      { texto: "Implementar tecnologías de reciclaje y sostenibilidad para gestionar los recursos", valor: "sostenibilidad" },
      { texto: "Establecer comercio con la Tierra para obtener recursos externos", valor: "comercio" }
    ]
  },
  relaciones: {
    pregunta: "¿Cómo manejarás las relaciones con la Tierra?",
    opciones: [
      { texto: "Dependencia total de la Tierra para recursos y apoyo logístico", valor: "dependencia" },
      { texto: "Establecer una autonomía total para Marte", valor: "independencia" },
      { texto: "Mantener una cooperación equilibrada con la Tierra", valor: "cooperacion" }
    ]
  }
};