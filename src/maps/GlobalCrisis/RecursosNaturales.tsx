class RecursosNaturales {
    recursosDisponibles: number;
    recursosExternos: number;
  
    constructor() {
      this.recursosDisponibles = 100; // Representa los recursos naturales disponibles
      this.recursosExternos = 50; // Recursos importados
    }
  
    gestionarRecursos() {
      this.recursosDisponibles -= 20; // Reducción en los recursos naturales
    }
  
    explorarNuevasFuentes() {
      this.recursosDisponibles += 10; // Mejora de los recursos disponibles
    }
  
    maximizarReciclaje() {
      this.recursosExternos += 20; // Aumento en los recursos reciclados
    }
  }
  export default RecursosNaturales;
   export {};