import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import Pokemon, { Move } from '../models/Pokemon'
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

  const handleAttack = (move: Move): void => {
    if (!opponentTurn) {
      if (checkForGameEnd(move.damage, opponentHealth)) {
        setMessage(`Game Over, ${pokemon.getName()} wins`)
        return
      }
      setMessage(
        `${pokemon.getName()} attacks with ${move.name.toUpperCase()} and ${
          move.damage
        } damage`,
      )
      setOpponentHealth((prevHealth) => prevHealth - move.damage)
    } else {
      if (checkForGameEnd(move.damage, pokeHealth)) {
        setMessage(`Game Over, ${opponent.getName()} wins`)
        return
      }
      setMessage(
        `${opponent.getName()} attacks with ${move.name.toUpperCase()} and ${
          move.damage
        } damage`,
      )
      setPokeHealth((prevHealth) => prevHealth - move.damage)
    }
    setTurn(turn + 1)
  }

  const checkForGameEnd = (damage: number, health: number): boolean => {
    return damage >= health
  }

  return (
    <Box>
      <PokemonCard
        pokemon={opponent}
        attack={handleAttack}
        hp={opponentHealth}
        active={opponentTurn}
      />

      <Box height={5} />

      <p>{message}</p>

      <Box height={5} />

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
