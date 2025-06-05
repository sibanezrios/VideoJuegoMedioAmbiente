import { BufferWriter } from "./BufferWritter";
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

    // Guardar en localStorage
    const datosActualizados = lista.obtenerTodos();
    localStorage.setItem(this.clave, JSON.stringify(datosActualizados));

    // Guardar también en archivo
    BufferWriter.escribir(datosActualizados);
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
