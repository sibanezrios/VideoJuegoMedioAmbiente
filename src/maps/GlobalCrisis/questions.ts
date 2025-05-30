// Opciones para las decisiones del jugador
export   const preguntasYOpciones = {
  cambioClimatico: {
    pregunta: "¿Cómo abordas el cambio climático global?",
    opciones: [
      { texto: "Imponer sanciones a los países más contaminantes", valor: "sanciones" },
      { texto: "Promover un acuerdo global de reducción de emisiones", valor: "acuerdo" },
      { texto: "Dejar que cada país gestione sus políticas de forma independiente", valor: "independiente" }
    ]
  },
  pandemia: {
    pregunta: "¿Cómo coordinarás la respuesta internacional a la pandemia?",
    opciones: [
      { texto: "Cerrar fronteras y aislar países ricos", valor: "restricciones" },
      { texto: "Distribuir vacunas globalmente", valor: "cooperacion" },
      { texto: "Dejar que cada nación gestione de forma independiente", valor: "independiente" }
    ]
  },
  recursos: {
    pregunta: "¿Cómo gestionarás la escasez de recursos naturales?",
    opciones: [
      { texto: "Nacionalizar recursos y priorizar intereses nacionales", valor: "nacionalizar" },
      { texto: "Crear un sistema de distribución global justa", valor: "distribucion" },
      { texto: "Dejar que el mercado regule los recursos", valor: "mercado" }
    ]
  }
};