import { Pokemon } from "./Pokemon";

export class PokeTrainer {
  public readonly id: number;
  public readonly name: string;
  public pokeballs: number;
  public pokemons: Pokemon[] = [];

  constructor(id: number, name: string, pokeballs: number, pokemons: Pokemon[]) {
    this.id = id;
    this.name = name;
    this.pokeballs = pokeballs;
    this.pokemons = pokemons;
  }

  throwPokeball() {
    if (this.pokeballs > 0) return this.pokeballs - 1;
    return 0;
  }
}
