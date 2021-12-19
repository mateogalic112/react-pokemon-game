import { IPokemon } from './Pokemon'

enum Gender {
  Male,
  Female,
}

export interface IPokeTrainer {
  getPokeBalls(): number
  getPokemons(): IPokemon[]
  setPokemons(pokemon: IPokemon): void

  catchPokemon(pokemon: IPokemon, hp: number): string
}

class PokeTrainer implements IPokeTrainer {
  private readonly name: string
  private readonly gender: Gender
  private pokeBalls: number = 10
  private pokemons: IPokemon[] = []

  constructor(name: string, gender: Gender) {
    this.name = name
    this.gender = gender
  }

  getPokeBalls() {
    return this.pokeBalls
  }

  getPokemons() {
    return this.pokemons
  }

  setPokemons(pokemon: IPokemon) {
    this.pokemons.push(pokemon)
  }

  catchPokemon(pokemon: IPokemon, hp: number): string {
    if (this.getPokeBalls() === 0) {
      return 'Out of pokeballs!'
    }

    if (hp < 50) {
      this.setPokemons(pokemon)
      return `You caught ${pokemon.getName()}!`
    }

    return `${pokemon.getName()} escaped!`
  }
}

export default PokeTrainer
