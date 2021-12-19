import { IPokemon } from './Pokemon'

enum Gender {
  Male,
  Female,
}

export interface IPokeTrainer {
  getName(): string
  getPokeBalls(): number
  getPokemons(): IPokemon[]
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
}

export default PokeTrainer
