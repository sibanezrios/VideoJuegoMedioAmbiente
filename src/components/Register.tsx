export interface Registro {
  nombre: string;
  puntaje: number;
  fecha: string;
}

export class RegistroJugador {
  static clave = "historial_partidas";

  static guardar(nuevo: Registro) {
    const datos = this.obtenerTodos();
    datos.push(nuevo);
    localStorage.setItem(this.clave, JSON.stringify(datos));
  }

  static obtenerTodos(): Registro[] {
    const datos = localStorage.getItem(this.clave);
    return datos ? JSON.parse(datos) : [];
  }

  static limpiar() {
    localStorage.removeItem(this.clave);
  }
}
