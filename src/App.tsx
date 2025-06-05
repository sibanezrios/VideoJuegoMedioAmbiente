import React, { useState } from 'react';
import Menu from './components/Menu';
import Inicio from './components/inicio';
import './Nivel.css';
import { Fase } from './constants';
import Game from './components/Game';
import FinalScene from './components/FinalScene';
import { TTSProvider } from './assets/hooks/TTSContext'; 
import { RegistroJugador } from './utils/Register';


function App() {
  const [fase, setFase] = useState<Fase>(Fase.Start);
  const [progress, setProgress] = useState<number>(0);
  const [jugador, setJugador] = useState('');

  return (
    <TTSProvider>
      {fase === Fase.Start && <Inicio onStart={(nombre) => {
      setJugador(nombre);
      setFase(Fase.Menu);
      }} />}
      {fase === Fase.Menu && <Menu onStart={() => setFase(Fase.Game)} />}
      {fase === Fase.Game && (
  <Game
    onFinish={(p) => {
      setFase(Fase.End);
      setProgress(p);

      const partida = {
        nombre: jugador || 'Jugador1',
        puntaje: p,
        fecha: new Date().toISOString(),
      };

      RegistroJugador.guardar(partida); // ✅ guarda partida en localStorage
    }}
  />
)}

      {fase === Fase.End && (<FinalScene progress={progress} onFinish={() => setFase(Fase.Start)} />
      )}
    </TTSProvider>
  );
}

export default App;
