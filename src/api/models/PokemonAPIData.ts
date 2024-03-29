export interface PokemonAPIData {
  id: number
  name: string
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  }
  stats: [
    {
      base_stat: number
      stat: {
        name: string
        url: string
      }
    }
  ]
  types: [
    {
      slot: number
      type: {
        name: string
        url: string
      }
    }
  ]
  moves: [
    {
      move: {
        name: string
      }
    }
  ]
}
