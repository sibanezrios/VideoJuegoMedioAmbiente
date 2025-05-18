class Rio {
    estado: 'limpio' | 'contaminado';
    fauna: 'recuperada' | 'desaparecida';
    
    constructor() {
      this.estado = 'contaminado';
      this.fauna = 'desaparecida';
    }
  
    limpiar() {
      this.estado = 'limpio';
      this.fauna = 'recuperada';
    }
  
    contaminar() {
      this.estado = 'contaminado';
      this.fauna = 'desaparecida';
    }
  
    filtrarAgua() {
      this.estado = 'limpio';
      this.fauna = 'recuperada';
    }
  }
  export {};