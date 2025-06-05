import * as fs from 'fs';
import * as path from 'path';
import { Registro } from '../utils/Register';


export class BufferWriter {
  static archivo = path.join(__dirname, 'historial_partidas.txt');

  static escribir(registros: Registro[]) {
    const contenido = registros.map((r, i) => {
      return `#${i + 1} - ${r.nombre} obtuvo ${r.puntaje.toFixed(2)}% el ${r.fecha}`;
    }).join('\n');

    fs.writeFileSync(this.archivo, contenido, 'utf-8');
    console.log(`✅ Historial guardado en ${this.archivo}`);
  }

  static agregar(registro: Registro) {
    const linea = `${registro.nombre} obtuvo ${registro.puntaje.toFixed(2)}% el ${registro.fecha}\n`;
    fs.appendFileSync(this.archivo, linea, 'utf-8');
    console.log(`➕ Registro añadido: ${linea.trim()}`);
  }

  static limpiar() {
    fs.writeFileSync(this.archivo, '', 'utf-8');
    console.log(`🧹 Historial limpiado.`);
  }
}
