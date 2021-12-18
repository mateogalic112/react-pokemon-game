import { PokemonAPIData } from './API/PokemonAPIData'

interface Stat {
  amount: number
  name: string
}

interface Move {
  damage: number
  name: string
}

class Pokemon {
  readonly id: number
  height: number
  weight: number
  readonly name: string
  image: string
  stats: Stat[]
  moves: Move[]

  constructor(pokemonData: PokemonAPIData) {
    this.id = pokemonData.id
    this.height = pokemonData.height
    this.weight = pokemonData.weight
    this.name = pokemonData.name
    this.image = pokemonData.sprites.other.dream_world.front_default
    this.stats = pokemonData.stats
      .map((item) => ({
        amount: item.base_stat,
        name: item.stat.name,
      }))
      .filter((item) => !item.name.includes('special'))
    this.moves = pokemonData.moves.map((move) => ({
      damage: 10,
      name: move.move.name,
    }))
  }

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }

  getStats() {
    return this.stats
  }

  attack() {
    return this.moves[0].damage
  }
}

export default Pokemon
