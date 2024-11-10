export interface Pokemon {
  id: number;
  pokemon_id: number;
  hp: number;
  trainer_id: number;
}

export interface Trainer {
  id: number;
  email: string;
  password: string;
  name: string;
  pokeballs: number;
}
