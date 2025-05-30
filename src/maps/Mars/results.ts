import { Future, FutureResults } from "../../constants"
import muyBueno5 from './assets/futuro_bueno_marte.png';  // Imagen para el futuro bueno
import medio5 from './assets/futuro_medio_marte.png';  // Imagen para el futuro medio
import malo5 from './assets/futuro_malo_marte.png';  // Imagen para el futuro malo

export function buildResults(type: Future, score: number): FutureResults {
    switch(type) {
      case Future.VeryGood:
        return {
          message: `¡Marte ha prosperado! 🌍🌱`,
          image: muyBueno5,
          type,
          score,
          title: 'El futuro de Marte es autosuficiente y sostenible'
        }
      case Future.Medium:
        return {
          message: `Marte está en proceso de crecimiento. 🌱`,
          image: medio5,
          type,
          score,
          title: 'El futuro de Marte está en transición, pero aún hay desafíos'
        }
      default:
        return {
          message: `Marte enfrenta grandes desafíos. 💔`,
          image: malo5,
          type,
          score,
          title: 'El futuro de Marte está en peligro debido a malas decisiones'
        }
    }
  }