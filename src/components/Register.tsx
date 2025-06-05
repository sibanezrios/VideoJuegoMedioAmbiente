import { ListaEnlazadaRegistro } from "./ListaEnlazadaRegistro";

export interface Registro {
  nombre: string;
  puntaje: number;
  fecha: string;
}
export class RegistroJugador {
  static clave = "historial_partidas";

  static guardar(nuevo: Registro): void {
    const json = localStorage.getItem(this.clave);
    const lista = ListaEnlazadaRegistro.desdeJSON(json);
    lista.agregar(nuevo);
    localStorage.setItem(this.clave, JSON.stringify(lista.obtenerTodos()));
  }

  static obtenerTodos(): Registro[] {
    const json = localStorage.getItem(this.clave);
    const lista = ListaEnlazadaRegistro.desdeJSON(json);
    return lista.obtenerTodos();
  }

  static limpiar(): void {
    localStorage.removeItem(this.clave);
  }
}
