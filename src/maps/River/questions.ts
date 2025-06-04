export const preguntasYOpciones = {
  rio: {
    pregunta: "El río está altamente contaminado y afecta la salud de la población. ¿Qué decisión tomarás?",
    opciones: [
      { texto: "Liderar una limpieza completa del río, usando fondos no presupuestados para priorizar la salud pública", valor: "limpiar" },
      { texto: "Construir una planta de tratamiento financiada con recortes temporales en salarios de funcionarios", valor: "invertir" },
      { texto: "No intervenir y mantener el presupuesto intacto, ignorando los reclamos por enfermedades", valor: "dejar" }
    ]
  },
  bosque: {
    pregunta: "Un bosque cercano al río es clave para el equilibrio ecológico, pero obstaculiza el desarrollo económico. ¿Qué harás?",
    opciones: [
      { texto: "Preservar el bosque, priorizando la biodiversidad y el equilibrio ambiental", valor: "conservar" },
      { texto: "Talar el bosque para expandir la agricultura y ganadería, impulsando la economía local", valor: "taladrar" }
    ]
  },
  planta: {
    pregunta: "La planta industrial cercana al río genera empleo, pero también contamina. ¿Cómo actuarás?",
    opciones: [
      { texto: "Invertir en filtros y tecnología para reutilizar el agua del río sin contaminar", valor: "invertir" },
      { texto: "Tratar residuos solo cuando la producción lo permita, manteniendo eficiencia ante todo", valor: "cerrar" }
    ]
  }
};
