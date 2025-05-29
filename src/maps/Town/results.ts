import { Future, FutureResults } from "../../constants"
import bueno from './assets/futuro_bueno.png'; // Imagen para el futuro bueno
import medio from './assets/futuro_medio.png'; // Imagen para el futuro medio
import malo from './assets/futuro_malo.png'; // Imagen para el futuro malo

export function buildResults(type: Future, score: number): FutureResults {
  switch (type) {
    case Future.VeryGood:
      return {
        message: `¡Felicidades! Has creado un barrio saludable y sostenible. 🌳🎉 Puntaje: ${score}`,
        image: bueno,
        type,
        score,
        title: 'Futuro del barrio'
      }
    case Future.Medium:
      return {
        message: `Bien hecho, el barrio mejoró, pero aún hay trabajo por hacer. 🌱 Puntaje: ${score}`,
        image: medio,
        type,
        score,
        title: 'Futuro del barrio'
      }
    default:
      return {
        message: `El barrio empeoró. ¡Aún puedes mejorar! 💔 Puntaje: ${score}`,
        image: malo,
        type,
        score,
        title: 'Futuro del barrio'
      }
  }
}