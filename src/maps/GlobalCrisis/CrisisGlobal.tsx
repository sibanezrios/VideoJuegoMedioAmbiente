

class CrisisGlobal {
    cambioClimatico: number;
    pandemia: number;
    escasezRecursos: number;
  
    constructor() {
      this.cambioClimatico = 70; // 0-100, donde 100 es grave
      this.pandemia = 50; // 0-100, donde 100 es muy afectado
      this.escasezRecursos = 30; // 0-100, donde 100 es grave
    }
  
    gestionarPandemia() {
      this.pandemia -= 20; // Mejora la pandemia si se gestionan bien
    }
  
    negociarAcuerdoClimatico() {
      this.cambioClimatico -= 15; // Reduce el impacto del cambio climático
    }
  
    distribuirRecursos() {
      this.escasezRecursos -= 10; // Alivio en la escasez de recursos
    }
  }
  export default CrisisGlobal;
  export {};