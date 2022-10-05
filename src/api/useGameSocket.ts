import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { io } from 'socket.io-client'
import { usePokeTrainerContext } from '../contexts/poke-trainer'

const useGameSocket = () => {
  const [socket, setSocket] = useState(null)
  const queryClient = useQueryClient()
  const { trainer, pokemons } = usePokeTrainerContext()

  useEffect(() => {
    const s = io('http://localhost:4000')
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.emit('join_game', {
      trainerName: trainer.getName(),
      pokemonId: pokemons[0].getId(),
    })
  }, [socket, queryClient, pokemons, trainer])

  useEffect(() => {
    if (!socket) return
    socket.on('game_players', (data) => {
      queryClient.setQueryData(['game_players'], () => [...data.players])
    })

    return () => {
      socket.off('game_players')
    }
  }, [socket, queryClient])

  return socket
}

export default useGameSocket
