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
  const [progress, setProgress] = useState<number>(0);

  return (
    <TTSProvider>
      {fase === Fase.Start && <Inicio onStart={() => setFase(Fase.Menu)} />}
      {fase === Fase.Menu && <Menu onStart={() => setFase(Fase.Game)} />}
      {fase === Fase.Game && <Game onFinish={(p) => {setFase(Fase.End);setProgress(p)}} />}
      {fase === Fase.End && (<FinalScene progress={progress} onFinish={() => setFase(Fase.Start)} />
      )}
    </TTSProvider>
  );
}

export default App;
