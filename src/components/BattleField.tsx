import { Box, Button, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { usePokeTrainerContext } from '../contexts/pokeTrainer'
import Battle from '../models/Battle'
import Pokemon, { Move } from '../models/Pokemon'
import PokemonCard from './PokemonCard'
import PokemonOpponentCard from './PokemonOpponentCard'

interface IBattleFieldProps {
  pokemon: Pokemon
  opponent: Pokemon
}

const BattleField = ({ pokemon, opponent }: IBattleFieldProps) => {
  // Pokemons hp saved in component state
  const [pokeHealth, setPokeHealth] = useState(pokemon.getHp())
  const [opponentHealth, setOpponentHealth] = useState(opponent.getHp())

  // Keep track of who is next in turn for attacking
  const [turn, setTurn] = useState(0)
  const opponentTurn = turn % 2 === 1

  // Display fight messages
  const [messages, setMessages] = useState<string[]>([])

  // Initiliaze fight
  const battle = new Battle(pokemon, opponent)
  // Get current trainer from context
  const { trainer, catchPokemon, pokeBalls, pokemons } = usePokeTrainerContext()

  const onPokemonAttack = (
    move: Move,
    health: number,
    setHealth: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    // HOF for creating attack damage and battle message based on chosen move
    const { damage, messages } = battle.attackOpponent(opponentTurn)(
      move,
      health,
    )

    setMessages((prev) => [...prev, ...messages])

    setHealth((prevHealth) => prevHealth - damage)

    setTurn(turn + 1)
  }

  // Throw pokeball to catch opponent pokemon
  const onPokeballThrow = () => {
    const caughtMessage = catchPokemon(opponent, opponentHealth)

    setMessages((prev) => [...prev, caughtMessage])
  }

  console.log(pokemons)

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
        <Flex gap="1rem">
          <p>Pokeballs available: {pokeBalls}</p>
          <Button onClick={onPokeballThrow}>Throw pokeball</Button>
        </Flex>

        <Box height={5} />

        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </Flex>
    </Flex>
  )
}

export default BattleField
