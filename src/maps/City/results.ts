
import muyBueno3 from './assets/futuro_bueno_ciudad.png';  
import medio3 from './assets/futuro_medio_ciudad.png';  
import malo3 from './assets/futuro_malo_ciudad.png'; 
import { Future, FutureResults } from "../../constants"

export function buildResults(type: Future, score: number): FutureResults {
  switch(type) {
    case Future.VeryGood:
      return {
        message: `¡Felicidades! La ciudad ha crecido de manera sostenible. 🌳🎉 Puntaje: ${score}`,
        image: muyBueno3,
        type,
        score,
        title : 'EL futuro que escogiste ha mantenido viva la ciudad a lo largo de los años'
      }
    case Future.Medium:
      return {
        message: `La ciudad ha mejorado, pero aún quedan algunos problemas por resolver. 🌱 Puntaje: ${score}`,
        image: medio3,
        type,
        score,
        title : 'El futuro de la ciudad se mantiene estable, pero no por mucho tiempo'
      }
    default:
      return {
        message: `La ciudad ha empeorado, con consecuencias negativas a largo plazo. 💔 Puntaje: ${score}`,
        image: malo3,
        type,
        score,
        title : 'La ciudad dejó de lado el concepto de futuro y se tiene poca probabilidad de mejora'
      }
  }
}