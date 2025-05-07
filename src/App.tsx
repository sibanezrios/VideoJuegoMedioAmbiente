import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import Inicio from './components/inicio';
import MapaBarrio from './MapaBarrio';
import MapaRio from './MapaRio';
import FuturoEscena from './FuturoEscena';
import FuturoEscena2 from './FuturoEscena2';

import fondoOscuro from './assets/fondoOscuro.jpg';
import fondoClaro from './assets/fondoClaro.jpg';
import './Nivel.css'; // asegúrate de que esté correctamente enlazado

type Fase = 'inicio' | 'menu' | 'juego';
type Futuro = 'muy_bueno' | 'medio' | 'malo' | null;

function App() {
  const [fase, setFase] = useState<Fase>('inicio');
  const [nivel, setNivel] = useState(1);
  const [futuro, setFuturo] = useState<Futuro>(null);
  const [puntos, setPuntos] = useState(0);

  const avanzarNivel = () => {
    setFuturo(null);
    if (nivel === 1) setNivel(2);
  };

  // 👉 Scroll al top cuando entras al nivel 2
  useEffect(() => {
    if (nivel === 2) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [nivel]);

  // === Fases ===
  if (fase === 'inicio') {
    return <Inicio onStart={() => setFase('menu')} />;
  }

  if (fase === 'menu') {
    return <Menu onStart={() => setFase('juego')} />;
  }

  // === Fase juego ===
  if (fase === 'juego') {
    return (
      <div className="nivel-con-fondo">
        <img src={fondoOscuro} alt="Fondo oscuro" className="imagen-incendio" />
        <img src={fondoClaro} alt="Fondo claro" className="imagen-bosque" />

        <div className="contenido-nivel">
          {nivel === 1 ? (
            <>
              <h1>🌱 Juego Ambiental - Nivel 1: El Barrio</h1>
              <MapaBarrio setPuntos={setPuntos} setFuturo={setFuturo} />
              {futuro && (
                <FuturoEscena
                  tipo={futuro}
                  puntos={puntos}
                  onContinuar={avanzarNivel}
                />
              )}
            </>
          ) : (
            <>
              <h1>🌊 Juego Ambiental - Nivel 2: El Río</h1>
              <MapaRio setPuntos={setPuntos} setFuturo={setFuturo} />
              {futuro && <FuturoEscena2 futuro={futuro} />}
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default App;
