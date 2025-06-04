// utils/Register.ts

export interface Registro {
    nombre: string;
    puntaje: number;
    fecha: string;
  }
  
  export class RegistroJugador {
    static guardar(registro: Registro) {
      const datos = JSON.parse(localStorage.getItem('partidas') || '[]');
      datos.push(registro);
      localStorage.setItem('partidas', JSON.stringify(datos));
    }
  
    static obtenerTodos(): Registro[] {
      return JSON.parse(localStorage.getItem('partidas') || '[]');
    }
  }
  