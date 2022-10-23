import Pokemon from './Pokemon'

interface IPokeTrainer {}

class PokeTrainer implements IPokeTrainer {
  public readonly id: number
  public readonly name: string
  public pokeballs: number
  public pokemons: Pokemon[] = []

  constructor(
    id: number,
    name: string,
    pokeballs: number,
    pokemons: Pokemon[]
  ) {
    this.id = id
    this.name = name
    this.pokeballs = pokeballs
    this.pokemons = pokemons
  }
}

export default PokeTrainer
