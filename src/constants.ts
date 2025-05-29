
enum Fase {
  Start,
  Menu,
  Game
}

enum Future {
  VeryGood,
  Medium,
  Bad,
};

enum Level {
  Town = 'Mapa del barrio',
  River = 'Mapa del Rio',
  City = 'Mapa de la ciudad',
  Global = 'Mapa del mundo',
  Mars ='Mapa de marte'
}

export type FutureResults = {
  message: string,
  image: string,
  score: number,
  type: Future,
  title: string 
}


export { Fase, Future, Level };