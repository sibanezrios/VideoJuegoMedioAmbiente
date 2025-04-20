import React, { useEffect, useState } from "react";
import "./App.css";
import fondo1 from "./assets/fondoInicio.jpeg";

type Enemigo = {
  tipo: string;
  x: number;
  y: number;
};

type Arbol = {
  tipo: string;
  x: number;
  y: number;
};

type Nivel = {
  nivel: number;
  nombre: string;
  enemigos: Enemigo[];
  arboles: Arbol[];
  objetivo: string;
};

function App() {
  const [nivel, setNivel] = useState<Nivel | null>(null);
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    console.log("Botón presionado");
    setVisible(false); // 🔥 Oculta el botón
  };

  useEffect(() => {
    fetch("/levels/level1.json1")
      .then((res) => res.json())
      .then((data: Nivel) => setNivel(data))
      .catch((err) => console.error("Error cargando el nivel:", err));
  }, []);


  if (!nivel) return <p>Cargando nivel...</p>;

  return (
    <div className="mainContainer">
      <img src={fondo1} alt="My asset" className="imagenFondo" />
      
      {visible && (
        <button className="button" onClick={handleClick}></button>
      )}

    </div>
  );
}

export default App;

