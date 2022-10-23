export interface Player {
  id: string
  trainerName: string
  position: number
  pokemonId: number
}

export interface SocketPlayers {
  players: Player[]
}
