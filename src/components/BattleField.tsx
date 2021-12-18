import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import Pokemon from '../models/Pokemon'
import PokemonCard from './PokemonCard'

interface IBattleFieldProps {
  pokemon: Pokemon
  opponent: Pokemon
}

const BattleField = ({ pokemon, opponent }: IBattleFieldProps) => {
  const [pokeHealth, setPokeHealth] = useState(10)
  const [opponentHealth, setOpponentHealth] = useState(10)
  const [turn, setTurn] = useState(0)
  const [message, setMessage] = useState('')

  const opponentTurn = turn % 2 === 1

  const handleAttack = (damage: number): void => {
    if (!opponentTurn) {
      if (checkForGameEnd(damage, opponentHealth)) {
        setMessage('Game Over, you win')
        return
      }
      setOpponentHealth((prevHealth) => prevHealth - damage)
    } else {
      checkForGameEnd(damage, pokeHealth)
      if (checkForGameEnd(damage, pokeHealth)) {
        setMessage('Game Over, opponent wins')
        return
      }
      setPokeHealth((prevHealth) => prevHealth - damage)
    }
    setTurn(turn + 1)
  }

  const checkForGameEnd = (damage: number, health: number): boolean => {
    return damage >= health
  }

  return (
    <Box>
      <p>{message}</p>
      <p>{opponentHealth}</p>
      <PokemonCard
        pokemon={opponent}
        attack={handleAttack}
        hp={opponentHealth}
        active={opponentTurn}
      />

      <Box height={10} />

      <PokemonCard
        pokemon={pokemon}
        attack={handleAttack}
        hp={pokeHealth}
        active={!opponentTurn}
      />
    </Box>
  )
}

export default BattleField
