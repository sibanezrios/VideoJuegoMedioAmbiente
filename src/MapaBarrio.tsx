import React, { useState } from 'react';
import DecisionPopup from './DecisionPopup';
import mapa from './assets/mapa_inicial.png';
import arbol from './assets/arbol.png';
import fabrica from './assets/fabrica.png';
import lote from './assets/lote.png';
import FuturoEscena from './FuturoEscena';

type Futuro = "muy_bueno" | "medio" | "malo" | null;

function MapaBarrio() {
  const [arbolDecision, setArbolDecision] = useState<string | null>(null);
  const [fabricaDecision, setFabricaDecision] = useState<string | null>(null);
  const [loteDecision, setLoteDecision] = useState<string | null>(null);

  const [popup, setPopup] = useState<null | "arbol" | "fabrica" | "lote">(null);
  const [futuro, setFuturo] = useState<Futuro>(null);

  const todasTomadas = arbolDecision && fabricaDecision && loteDecision;

  function evaluarFuturo() {
    let score = 0;
    if (arbolDecision === "conservar") score++;
    if (fabricaDecision === "cerrar") score++;
    if (loteDecision === "parque") score++;

    if (score === 3) setFuturo("muy_bueno");
    else if (score === 2) setFuturo("medio");
    else setFuturo("malo");
  }

  if (futuro) {
    return <FuturoEscena tipo={futuro} />;
  }

  return (
    <div style={{ position: 'relative', width: '768px', margin: 'auto' }}>
      <img src={mapa} alt="Mapa del barrio" style={{ width: '100%' }} />

      {/* Elementos clickeables */}
      <img
        src={arbol}
        alt="Árbol"
        onClick={() => !arbolDecision && setPopup("arbol")}
        style={{
          position: 'absolute',
          top: '200px',
          left: '100px',
          width: '80px',
          cursor: arbolDecision ? 'default' : 'pointer',
          opacity: arbolDecision ? 0.4 : 1
        }}
      />
      <img
        src={fabrica}
        alt="Fábrica"
        onClick={() => !fabricaDecision && setPopup("fabrica")}
        style={{
          position: 'absolute',
          top: '150px',
          right: '120px',
          width: '90px',
          cursor: fabricaDecision ? 'default' : 'pointer',
          opacity: fabricaDecision ? 0.4 : 1
        }}
      />
      <img
        src={lote}
        alt="Lote baldío"
        onClick={() => !loteDecision && setPopup("lote")}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '300px',
          width: '90px',
          cursor: loteDecision ? 'default' : 'pointer',
          opacity: loteDecision ? 0.4 : 1
        }}
      />

      {popup && (
        <DecisionPopup
          tipo={popup}
          onClose={() => setPopup(null)}
          onSelect={(decision: string) => {
            if (popup === "arbol") setArbolDecision(decision);
            if (popup === "fabrica") setFabricaDecision(decision);
            if (popup === "lote") setLoteDecision(decision);
            setPopup(null);
          }}
        />
      )}

      {todasTomadas && (
        <button onClick={evaluarFuturo} style={{ marginTop: '20px' }}>
          Ver Futuro
        </button>
      )}
    </div>
  );
}

export default MapaBarrio;
