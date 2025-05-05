// src/components/Menu.tsx
import React, { useState } from 'react';
import fondoMenu from '../assets/ImagenMenuVideoJuego.png';

interface MenuProps {
  onStart: () => void;
}

const Menu: React.FC<MenuProps> = ({ onStart }) => {
  const [mostrarControles, setMostrarControles] = useState(false);
  const [mostrarCreditos, setMostrarCreditos] = useState(false);

  return (
    <div style={contenedorPrincipal}>
      <div style={contenedorImagen}>
        <img
          src={fondoMenu}
          alt="Fondo del menú"
          style={{ width: '530px', height: '900', borderRadius: '12px',   marginTop: '10px', marginBottom: '30  0px'}}
        />

        {/* ÁREA: JUGAR */}
        {!mostrarControles && !mostrarCreditos && (
          <>
            <div style={areaJugar} onClick={onStart} />
            <div style={areaControles} onClick={() => setMostrarControles(true)} />
            <div style={areaCreditos} onClick={() => setMostrarCreditos(true)} />
          </>
        )}

        {/* CONTROLES */}
        {mostrarControles && (
          <div style={superpuesto}>
            <h2>🕹️ Controles</h2>
            <ul>
              <li>✔️ Buena acción = suma puntos</li>
              <li>❌ Mala acción = resta puntos</li>
              <li>🚀 Ver el futuro = resultado</li>
            </ul>
            <button onClick={() => setMostrarControles(false)} style={boton}>🔙 Volver</button>
          </div>
        )}

        {/* CRÉDITOS */}
        {mostrarCreditos && (
          <div style={superpuesto}>
            <h2>📜 Créditos</h2>
            <p>Juego desarrollado por tu equipo ambiental 💚</p>
            <p>Ilustraciones creadas con IA</p>
            <button onClick={() => setMostrarCreditos(false)} style={boton}>🔙 Volver</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;

const contenedorPrincipal: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  padding: '2rem',
};

const contenedorImagen: React.CSSProperties = {
  position: 'relative',
  width: '400px', // se ajusta visualmente al tamaño medio
};

const areaJugar: React.CSSProperties = {
  position: 'absolute',
  top: '200px',
  left: '140px',
  width: '240px',
  height: '60px',
  cursor: 'pointer',
  
};

const areaControles: React.CSSProperties = {
  position: 'absolute',
  top: '280px',
  left: '140px',
  width: '240px',
  height: '60px',
  cursor: 'pointer',
  
};

const areaCreditos: React.CSSProperties = {
  position: 'absolute',
  top: '380px',
  left: '140px',
  width: '240px',
  height: '60px',
  cursor: 'pointer',
  
};

const superpuesto: React.CSSProperties = {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0,0,0,0.5)',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  borderRadius: '12px',
};

const boton: React.CSSProperties = {
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#4CAF50',
  color: 'white',
  cursor: 'pointer',
};

