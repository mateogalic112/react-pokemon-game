import Pokemon from './Pokemon'

class PokeTrainer {
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

  throwPokeball = (): string | void => {
    if (this.pokeballs === 0) return 'You ran out of pokeballs!'
    this.pokeballs = this.pokeballs - 1
  }

  catchPokemon = async (pokemon: Pokemon, isCaught: boolean) => {
    if (this.pokeballs === 0) return 'You ran out of pokeballs!'

    if (isCaught) {
      return `You caught ${pokemon.name}!`
    }

    return `${pokemon.name} escaped!`
  }

  choosePokemon = (pokemon: Pokemon) => {
    return `${pokemon.name} is now yours!!`
  }
}

export default PokeTrainer
