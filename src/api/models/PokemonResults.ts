export interface PokemonResults {
  count: number
  next: string
  previous: null
  results: Result[]
}

export interface Result {
  name: string
  url: string
}
