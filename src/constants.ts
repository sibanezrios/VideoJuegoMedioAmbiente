
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
  Town,
  River,
  City
}

export type FutureResults = {
  message: string,
  image: string,
  score: number,
  type: Future
}

export { Fase, Future, Level };