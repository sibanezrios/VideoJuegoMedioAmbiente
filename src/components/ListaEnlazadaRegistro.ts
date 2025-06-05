import { NodoRegistro } from "./NodoRegister";
import { Registro } from "./Register";

export class ListaEnlazadaRegistro {
  cabeza: NodoRegistro | null = null;

  agregar(nuevo: Registro): void {
    const nodo = new NodoRegistro(nuevo);
    if (!this.cabeza) {
      this.cabeza = nodo;
    } else {
      let actual = this.cabeza;
      while (actual.siguiente) {
        actual = actual.siguiente;
      }
      actual.siguiente = nodo;
    }
  }

  obtenerTodos(): Registro[] {
    const registros: Registro[] = [];
    let actual = this.cabeza;
    while (actual) {
      registros.push(actual.valor);
      actual = actual.siguiente;
    }
    return registros;
  }

  limpiar(): void {
    this.cabeza = null;
  }

  static desdeJSON(json: string | null): ListaEnlazadaRegistro {
    const lista = new ListaEnlazadaRegistro();
    if (json) {
      const arr: Registro[] = JSON.parse(json);
      for (const reg of arr) {
        lista.agregar(reg);
      }
    }
    return lista;
  }
}
