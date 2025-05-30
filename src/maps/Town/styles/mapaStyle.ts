// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const mapaStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1000px', // Limitar el tamaño máximo de la imagen
  height: 'auto', // Mantener la relación de aspecto original
  padding: '0 10px', // Espaciado suave
  border: '4px solid #00ffff', // Borde neón más grueso
  borderRadius: '10px', // Bordes redondeados
  boxShadow: '0 0 20px #00ffff, 0 0 30px #00b3b3', // Sombras brillantes y suaves
  animation: 'neon-flicker 2s infinite alternate', // Animación de neón suave
  transition: 'transform 0.3s ease-in-out', // Suaviza la animación de escala
};