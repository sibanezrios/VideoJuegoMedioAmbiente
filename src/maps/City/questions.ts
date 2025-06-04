// Opciones para las decisiones del jugador
export const preguntasYOpciones = {
  plantaNuclear: {
    pregunta: "La ciudad depende de una planta nuclear para su energía. ¿Qué decisión tomarás respecto a su futuro?",
    opciones: [
      { texto: "Invertir en energías renovables (solar y eólica) para una transición a largo plazo", valor: "invertir" },
      { texto: "Cerrar la planta y apostar completamente por energía limpia, asumiendo una baja temporal en la producción", valor: "cerrar" },
      { texto: "Modernizar la planta con tecnologías seguras, manteniendo la energía nuclear como fuente principal", valor: "modernizar" },
      { texto: "Expandir la planta para aumentar la producción, ignorando los posibles riesgos ambientales", valor: "expandir" }
    ]
  },
  residencial: {
    pregunta: "La ciudad necesita crecer, pero las áreas verdes están amenazadas. ¿Cómo abordarás la expansión urbana?",
    opciones: [
      { texto: "Expandir solo en zonas ya urbanizadas, protegiendo las áreas verdes existentes", valor: "expandir" },
      { texto: "Expandirse en zonas verdes, pero reservar la mitad del espacio para parques y jardines", valor: "expandir-verde" },
      { texto: "Proteger completamente las zonas verdes y aumentar la densidad en las áreas urbanas actuales", valor: "conservar" },
      { texto: "Permitir una expansión sin restricciones, priorizando el crecimiento económico inmediato", valor: "expandir-liberado" }
    ]
  },
  carretera: {
    pregunta: "El tráfico urbano se ha vuelto un gran desafío. ¿Cuál será tu estrategia de movilidad?",
    opciones: [
      { texto: "Invertir en un sistema de transporte público eléctrico, ecológico y eficiente", valor: "invertir" },
      { texto: "Expandir las carreteras e incentivar el uso de vehículos eléctricos", valor: "expandir-sostenible" },
      { texto: "Ampliar vías para vehículos privados, sin considerar sostenibilidad ambiental", valor: "expandir-privado" },
      { texto: "Diseñar un sistema mixto: transporte público, ciclovías y espacios peatonales", valor: "mixto" }
    ]
  }
};
