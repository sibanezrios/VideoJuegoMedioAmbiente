// Opciones para las decisiones del jugador
export const preguntasYOpciones = {
  plantaNuclear: {
    pregunta: "¿Cómo vas a manejar la planta energética nuclear?",
    opciones: [
      { texto: "Invertir en energías renovables (solar y eólica) a largo plazo", valor: "invertir" },
      { texto: "Cerrar la planta nuclear y apostar por energía 100% limpia, pero perder producción inmediata", valor: "cerrar" },
      { texto: "Modernizar la planta nuclear con tecnologías más seguras, pero seguir dependiendo de energía nuclear", valor: "modernizar" },
      { texto: "Expandir la planta nuclear para aumentar la producción, ignorando los efectos ambientales a largo plazo", valor: "expandir" }
    ]
  },
  residencial: {
    pregunta: "La ciudad necesita expandirse, pero las áreas verdes están en riesgo. ¿Cómo manejarás el crecimiento?",
    opciones: [
      { texto: "Expandir hacia zonas ya urbanizadas, conservando las áreas verdes", valor: "expandir" },
      { texto: "Expandir hacia áreas verdes, pero asegurando que la mitad del espacio se destine a parques y jardines", valor: "expandir-verde" },
      { texto: "Conservar las áreas verdes y aumentar la densidad de edificios en las zonas urbanizadas", valor: "conservar" },
      { texto: "Expandir sin restricciones, priorizando el crecimiento económico rápido", valor: "expandir-liberado" }
    ]
  },
  carretera: {
    pregunta: "El tráfico es un problema creciente, pero las soluciones implican compromisos. ¿Qué harás con el transporte urbano?",
    opciones: [
      { texto: "Invertir en un sistema de transporte público ecológico, eléctrico y eficiente", valor: "invertir" },
      { texto: "Expandir las carreteras y promover el uso de vehículos eléctricos para reducir la contaminación", valor: "expandir-sostenible" },
      { texto: "Ampliar las carreteras para facilitar el tránsito de vehículos privados, pero sin tener en cuenta la sostenibilidad a largo plazo", valor: "expandir-privado" },
      { texto: "Desarrollar un sistema mixto: mejorar el transporte público y las infraestructuras para bicicletas y peatones", valor: "mixto" }
    ]
  }
};