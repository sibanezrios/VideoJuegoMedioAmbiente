class Bosque {
    estado: 'preservado' | 'talado';
    
    constructor() {
      this.estado = 'preservado';
    }
  
    conservar() {
      this.estado = 'preservado';
    }
  
    taladr() {
      this.estado = 'talado';
    }
  
    crearZonaAgricolaSostenible() {
      this.estado = 'preservado';
    }
  }
  export {};