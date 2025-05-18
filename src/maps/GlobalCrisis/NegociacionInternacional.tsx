class NegociacionInternacional {
    acuerdoClimatico: boolean;
    distribucionJustaRecursos: boolean;
  
    constructor() {
      this.acuerdoClimatico = false;
      this.distribucionJustaRecursos = false;
    }
  
    negociarSanciones() {
      this.acuerdoClimatico = false;
    }
  
    acordarDistribucionDeRecursos() {
      this.distribucionJustaRecursos = true;
    }
  
    coordinarRespuesta() {
      this.acuerdoClimatico = true;
      this.distribucionJustaRecursos = true;
    }
  }
  export default NegociacionInternacional;
  export {};