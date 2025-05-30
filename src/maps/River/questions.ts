


export const preguntasYOpciones = {
    rio: {  // Cambié "río" a "rio"
      pregunta: "¿Cómo vas a tratar la contaminación del río?",
      opciones: [
        { texto: "Limpiar el río completamente, gastando dinero aunque no estaba presupuestado, y destinarlo a la limpieza total del río", valor: "limpiar" },
        { texto: "Construir una planta de tratamiento, pero con los ingresos de 2 semanas de trabajo de funcionarios gubernamentales de clase baja", valor: "invertir" },
        { texto: "Dejar la contaminación tal como está, ignorando las peticiones de los ciudadanos acerca de las enfermedades causadas por el río, pero guardando el presupuesto.", valor: "dejar" }
      ]
    },
    bosque: {
      pregunta: "¿Vas a conservar el bosque cerca del río?",
      opciones: [
        { texto: "Conservar el bosque, frenando el crecimiento económico local", valor: "conservar" },
        { texto: "Talar el bosque para agricultura generando también un crecimiento de la ganadería en la zona", valor: "taladrar" }
      ]
    },
    planta: {
      pregunta: "¿Cómo vas a manejar la planta industrial cerca del río?",
      opciones: [
        { texto: "Instalar filtros avanzados para reducir los desechos al mínimo, y aprovechar el agua del río para enfriar las máquinas sin desperdiciar desechos.", valor: "invertir" },
        { texto: "Tratar las aguas residuales antes de verterlas al río, solo cuando la producción lo permita para no afectar la eficiencia de la fábrica", valor: "cerrar" }
      ]
    }
  };