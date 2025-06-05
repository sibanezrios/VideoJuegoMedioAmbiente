import { Registro } from './Register';

export class BufferWriterNavegador {
  static descargarComoTxt(registros: Registro[]): void {
    const contenido = registros.map((r, i) => {
      return `#${i + 1} - ${r.nombre} obtuvo ${r.puntaje.toFixed(2)}% el ${r.fecha}`;
    }).join('\n');

    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'historial_partidas.txt';
    enlace.click();

    URL.revokeObjectURL(url);
  }
}
