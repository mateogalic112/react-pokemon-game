import { PokemonAPIData } from '../api/models/PokemonAPIData'

export interface Stat {
  amount: number
  name: string
}

export interface Move {
  damage: number
  name: string
}

export interface IPokemon {
  attack(moveIndex: number): number
  dodge(): boolean
  defend(damage: number): number
  getHp(): number
}

class Pokemon implements IPokemon {
  private readonly id: number
  private readonly height: number
  private readonly weight: number
  private readonly name: string
  private readonly image: string
  private readonly stats: Stat[]
  private readonly moves: Move[]

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
      damage: Math.round(Math.random() * 10),
      name: move.move.name,
    }))
  }

  getId() {
    return this.id
  }

  getImage() {
    return this.image
  }

  getName() {
    return this.name.toUpperCase()
  }

  getStats() {
    return this.stats
  }

  getMoves() {
    return this.moves
  }

  attack(moveIndex: number): number {
    const attack =
      this.stats.find((item) => item.name === 'attack')?.amount ?? 0

    return Math.round((this.moves[moveIndex].damage * attack) / 10)
  }

  dodge(): boolean {
    const speed = this.stats.find((item) => item.name === 'speed')?.amount ?? 0

    if (Math.random() * 75 + speed > 10000) return true

    return false
  }

  defend(damage: number): number {
    const defense =
      this.stats.find((item) => item.name === 'defense')?.amount ?? 0

    return damage - defense
  }

  getHp(): number {
    return this.stats.find((item) => item.name === 'hp')?.amount ?? 100
  }
}

export default Pokemon
