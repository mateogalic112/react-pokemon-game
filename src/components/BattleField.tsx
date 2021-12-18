import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import Pokemon, { Move } from '../models/Pokemon'
import PokemonCard from './PokemonCard'
import PokemonOpponentCard from './PokemonOpponentCard'

interface IBattleFieldProps {
  pokemon: Pokemon
  opponent: Pokemon
}

const BattleField = ({ pokemon, opponent }: IBattleFieldProps) => {
  const [pokeHealth, setPokeHealth] = useState(pokemon.getHp())
  const [opponentHealth, setOpponentHealth] = useState(opponent.getHp())
  const [turn, setTurn] = useState(0)
  const [messages, setMessages] = useState<string[]>([])

  const opponentTurn = turn % 2 === 1

  const displayMessages = messages

  const handleAttack = (
    attacker: Pokemon,
    defender: Pokemon,
    health: number,
    setHealth: React.Dispatch<React.SetStateAction<number>>,
  ) => (move: Move): void => {
    displayMessages.push(
      `${attacker.getName()} attacks with ${move.name.toUpperCase()} and ${
        move.damage
      } damage`,
    )

    if (defender.dodge()) {
      displayMessages.push(`${defender.getName()} dodged the attack!`)
    }

    if (checkForGameEnd(move.damage, health)) {
      displayMessages.push(`Game over, ${attacker.getName()} wins!`)
      setMessages([...displayMessages])
      return
    }

    setMessages([...displayMessages])

    setHealth((prevHealth) => prevHealth - move.damage)

    setTurn(turn + 1)
  }

  const checkForGameEnd = (damage: number, health: number): boolean => {
    return damage >= health
  }

  return (
    <Box bg="green.100" p={4}>
      <PokemonOpponentCard
        pokemon={opponent}
        attack={handleAttack(opponent, pokemon, pokeHealth, setPokeHealth)}
        hp={opponentHealth}
        active={opponentTurn}
      />

      <Box height={5} />

      {messages.map((message) => (
        <p>{message}</p>
      ))}

      <Box height={5} />

      <PokemonCard
        pokemon={pokemon}
        attack={handleAttack(
          pokemon,
          opponent,
          opponentHealth,
          setOpponentHealth,
        )}
        hp={pokeHealth}
        active={!opponentTurn}
      />
    </Box>
  )
}

export default BattleField
