import { Future, FutureResults } from "../../constants"
import muyBueno4 from './assets/Futuro-bueno-mundo.png';
import medio4 from './assets/Futuro-medio-mundo.png';
import malo4 from './assets/Futuro-malo-mundo.png';

export function buildResults(type: Future, score: number): FutureResults {
  switch (type) {
    case Future.VeryGood:
      return {
        message: `¡Felicidades! El mundo ha logrado equilibrar sus problemas globales. 🌍🎉 Puntaje: ${score}`,
        image: muyBueno4,
        type,
        score,
        title: 'Futuro del mundo'
      }
    case Future.Medium:
      return {
        message: `El mundo ha mejorado, pero aún hay desafíos por resolver. 🌱 Puntaje: ${score}`,
        image: medio4,
        type,
        score,
        title: 'Futuro del mundo'
      }
    default:
      return {
        message: `La crisis global sigue empeorando, con consecuencias negativas a largo plazo. 💔 Puntaje: ${score}`,
        image: malo4,
        type,
        score,
        title: 'Futuro del mundo'
      }
  }
}