
import { Future, FutureResults } from '../../constants';
import bueno2 from './assets/futuro_bueno_rio.png';  // Imagen para el futuro bueno (Nivel 2)
import medio2 from './assets/futuro_medio_rio.png';  // Imagen para el futuro medio (Nivel 2)
import malo2 from './assets/futuro_malo_rio.png';  // Imagen para el futuro malo (Nivel 2)


export function buildResults(type: Future, score: number): FutureResults {
  switch(type) {
    case Future.VeryGood:
      return {
        message: '¡El río está limpio y la comunidad está más saludable! 🎉',
        image: bueno2,
        type,
        score,
        title : 'El futuro del rio alcanzó su versión ideal'
      }
    case Future.Medium:
      return {
        message: 'El río ha mejorado, pero aún queda trabajo por hacer. 🌱',
        image: medio2,
        type,
        score,
        title : 'El futuro del rio es prometedor, pero...'
      }
    default:
      return {
        message: 'El río está muy contaminado y la comunidad está sufriendo. 💔',
        image: malo2,
        type,
        score,
        title : 'El futuro del rio ha alcanzado el declive máximo'
      }
  }
}