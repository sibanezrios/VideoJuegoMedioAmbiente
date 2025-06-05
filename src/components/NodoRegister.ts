import { Registro } from "./Register";


export class NodoRegistro {
  valor: Registro;
  siguiente: NodoRegistro | null;

  constructor(valor: Registro) {
    this.valor = valor;
    this.siguiente = null;
  }
}
