
import React, { useState } from 'react';
import Menu from './components/Menu';
import campoLimpio from './assets/ImagenGranja.png';
import feliz from './assets/ImagenGranjaFinalFeliz.png';
import campoSucio from './assets/ImagenGranjaFinalTriste.png';
import deforestado from './assets/ImagenGranjaFinalSinArboles.png';

function App() {
  const [mostrarJuego, setMostrarJuego] = useState(false);

  const [puntosPositivos, setPuntosPositivos] = useState(0);
  const [puntosNegativos, setPuntosNegativos] = useState(0);
  const [futuroFinal, setFuturoFinal] = useState<string | null>(null);

  type Futuro = "inicio" | "positivo" | "neutral" | "negativo";

  const decidirFuturo = (positivos: number, negativos: number): Futuro => {
    const total = positivos - negativos;
    if (total >= 5) return "positivo";
    if (total > 0) return "neutral";
    if (total === 0) return "inicio";
    return "negativo";
  };

  const viajarAlFuturo = () => {
    const futuro = decidirFuturo(puntosPositivos, puntosNegativos);
    setFuturoFinal(futuro);
  };

  const obtenerImagenFuturo = () => {
    if (futuroFinal === "inicio") return campoLimpio;
    if (futuroFinal === "positivo") return feliz;
    if (futuroFinal === "neutral") return campoSucio;
    if (futuroFinal === "negativo") return deforestado;
    return null;
  };

  // Mostrar menú principal si no ha iniciado el juego
  if (!mostrarJuego) {
    return <Menu onStart={() => setMostrarJuego(true)} />;
  }

  // Si ya empezó, mostrar el juego
  return (
    <div className="App" style={{ textAlign: 'center' }}>
      <h1>🌱 Juego Ambiental</h1>

      <button onClick={() => setPuntosPositivos(p => p + 1)}>✔️ Buena acción</button>
      <button onClick={() => setPuntosNegativos(n => n + 1)}>❌ Mala acción</button>
      <button onClick={viajarAlFuturo}>🚀 Ver el futuro</button>

      {futuroFinal && (
        <div>
          <h2>Futuro: {futuroFinal}</h2>
          <img src={obtenerImagenFuturo()!} alt="Futuro" width="600" />
        </div>
      )}
    </div>
  );
}

export default App;



