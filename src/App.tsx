import React, { useState } from 'react';
import Menu from './components/Menu';
import Inicio from './components/inicio';
import './Nivel.css';
import { Fase } from './constants';
import Game from './components/Game';
import FinalScene from './components/FinalScene';
import { TTSProvider } from './assets/hooks/TTSContext'; 

function App() {
  const [fase, setFase] = useState<Fase>(Fase.Start);

  return (
    <TTSProvider>
      {fase === Fase.Start && <Inicio onStart={() => setFase(Fase.Menu)} />}
      {fase === Fase.Menu && <Menu onStart={() => setFase(Fase.Game)} />}
      {fase === Fase.Game && <Game onFinish={() => setFase(Fase.End)} />}
      {fase === Fase.End && (
        <FinalScene
          onFinish={() => setFase(Fase.Start)}
          progress={0}
        />
      )}
    </TTSProvider>
  );
}

export default App;
