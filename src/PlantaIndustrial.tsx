class PlantaIndustrial {
    impactoAmbiental: 'alto' | 'bajo';
    
    constructor() {
      this.impactoAmbiental = 'alto';
    }
  
    invertirEnTecnologia() {
      this.impactoAmbiental = 'bajo';
    }
  
    cerrar() {
      this.impactoAmbiental = 'bajo';
    }
  
    empezarOperaciones() {
      this.impactoAmbiental = 'alto';
    }
  }
 
  export {};