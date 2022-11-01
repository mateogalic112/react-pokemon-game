import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { Socket } from 'socket.io-client'
import { SocketPlayers } from '../../models/Player'

interface IGamePlayersListenerProps {
  socket: Socket
}

const useGamePlayersListener = ({ socket }: IGamePlayersListenerProps) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return

    socket.on('game_players', (data: SocketPlayers) => {
      queryClient.setQueryData(['game_players'], () => [...data.players])
    })

    return () => {
      socket.off('game_players')
    }
  }, [socket, queryClient])

  return true
}

export default useGamePlayersListener
