import { IPokemon } from './Pokemon'

enum Gender {
  Male,
  Female,
}

export interface IPokeTrainer {
  getName(): string
  getPokeBalls(): number
  getPokemons(): IPokemon[]

  catchPokemon(pokemon: IPokemon): string
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

  getName() {
    return this.name
  }

  getPokeBalls() {
    return this.pokeBalls
  }

  getPokemons() {
    return this.pokemons
  }

  catchPokemon(pokemon: IPokemon): string {
    if (this.getPokeBalls() === 0) {
      return 'Out of pokeballs!'
    }

    if (Math.random() * 10 > 5) {
      return `You caught ${pokemon.getName()}!`
    }

    return `${pokemon.getName()} escaped!`
  }
}

export default PokeTrainer
