// Opciones para las decisiones del jugador
export const preguntasYOpciones = {
  arbol: {
    pregunta: '¿Quieres conservar los árboles?',
    opciones: [
      { texto: 'Conservar los árboles', valor: 'conservar' },
      { texto: 'Solo si generan ganancias', valor: 'eliminar' }
    ]
  },
  fabrica: {
    pregunta: '¿Quieres modernizar esta fábrica contaminante?',
    opciones: [
      { texto: 'Si, con tecnologia limpia que respete el ambiente', valor: 'modernizar' },
      { texto: 'Modernizar la fábrica, pero afectar 200 empleos', valor: 'mantener' }
    ]
  },
  lote: {
    pregunta: '¿Quieres convertir este espacio en un parque, a petición de 10 niños de la comunidad?',
    opciones: [
      { texto: 'Convertir el lote en parque, cumpliendo la petición de unicamente el 10% de las personas en el pueblo', valor: 'parque' },
      { texto: 'Convertir el lote en zona comercial(los gastos serán donados por una empresa extranjera que quiere expandir su territorio)', valor: 'comercial' }
    ]
  }
};