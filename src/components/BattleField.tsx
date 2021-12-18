import { Box, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import Battle from '../models/Battle'
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
  const opponentTurn = turn % 2 === 1

  const [messages, setMessages] = useState<string[]>([])

  const battle = new Battle(pokemon, opponent)

  const onPokemonAttack = (
    move: Move,
    health: number,
    setHealth: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    const { damage, messages } = battle.attackOpponent(opponentTurn)(
      move,
      health,
    )

    setMessages((prev) => [...prev, ...messages])

    setHealth((prevHealth) => prevHealth - damage)

    setTurn(turn + 1)
  }

  return (
    <Flex bg="green.100" p={4}>
      <Box flexBasis="75%">
        <PokemonOpponentCard
          pokemon={opponent}
          attack={(move) => onPokemonAttack(move, pokeHealth, setPokeHealth)}
          hp={opponentHealth}
          active={opponentTurn}
        />

        <Box height={5} />

        <PokemonCard
          pokemon={pokemon}
          attack={(move) =>
            onPokemonAttack(move, opponentHealth, setOpponentHealth)
          }
          hp={pokeHealth}
          active={!opponentTurn}
        />
      </Box>
      <Flex direction="column" pt={10}>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </Flex>
    </Flex>
  )
}

export default BattleField
