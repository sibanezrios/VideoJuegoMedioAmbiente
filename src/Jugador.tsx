class Jugador {
    decisiones: string[];
  
    constructor() {
      this.decisiones = [];
    }
  
    tomarDecision(decision: string) {
      this.decisiones.push(decision);
    }
  
    evaluarFuturo() {
      let score = 0;
      // Aquí irían las decisiones del jugador y cómo afectan al futuro
      return score;
    }
  
    mostrarConsecuencias() {
      // Muestra los resultados de las decisiones
    }
  }
  
  export {};