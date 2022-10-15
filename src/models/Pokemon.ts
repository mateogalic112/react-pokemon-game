import { PokemonAPIData } from '../api/models/PokemonAPIData'

export interface Stat {
  amount: number
  name: string
}

export interface Move {
  damage: number
  name: string
}

export interface Type {
  name: string
  url: string
}

export interface IPokemon {
  attack(moveIndex: number): number
  dodge(): boolean
  defend(damage: number): number
  getHp(): number
}

class Pokemon implements IPokemon {
  public readonly id: number
  public readonly name: string
  public readonly image: string
  public hp: number
  public stats: Stat[]
  public moves: Move[]
  public types: Type[]

  constructor(pokemonData: PokemonAPIData, hp: number = 100) {
    this.id = pokemonData.id
    this.hp = hp
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
    this.types = pokemonData.types.map((type) => ({
      name: type.type.name,
      url: type.type.url,
    }))
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
    return this.hp
  }

  getPokedexData() {
    return `${this.name.toUpperCase()} is of ${this.types
      .slice(0, 2)
      .map((t) => t.name.toUpperCase())
      .join(' and ')} type. Common moves are ${this.moves
      .slice(0, 2)
      .map((m) => m.name.toUpperCase())
      .join(' and ')}.`
  }
}

export default Pokemon
