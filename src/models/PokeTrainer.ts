import { IPokemon } from './Pokemon'

enum Gender {
  Male,
  Female,
}

export interface IPokeTrainer {
  getName(): string
}

class PokeTrainer implements IPokeTrainer {
  private readonly name: string
  private readonly gender: Gender
  private readonly pokemons: IPokemon[] = []

  constructor(name: string, gender: Gender) {
    this.name = name
    this.gender = gender
  }

  getName() {
    return this.name
  }

  getPokemons() {
    return this.pokemons
  }
}

export default PokeTrainer
