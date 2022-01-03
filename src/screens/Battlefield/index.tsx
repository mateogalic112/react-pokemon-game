import { Box, Button, Flex, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { usePokeTrainerContext } from '../../contexts/pokeTrainer'
import Battle from '../../models/Battle'
import Pokemon, { Move } from '../../models/Pokemon'
import PokemonCard from '../../components/PokeCard/PokemonCard'
import Sidebar from './Sidebar'
import PokemonOpponentCard from '../../components/PokeCard/PokemonOpponentCard'

interface IBattlefieldProps {
  pokemon: Pokemon
  opponent: Pokemon
}

const Battlefield = ({ pokemon, opponent }: IBattlefieldProps) => {
  // Pokemons hp saved in component state
  const [pokeHealth, setPokeHealth] = useState(pokemon.getHp())
  const [opponentHealth, setOpponentHealth] = useState(opponent.getHp())

  // Adjust classNames for animations
  const [pokeballActive, setPokeballActive] = useState(false)

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
  const onPokeballThrow = async () => {
    setPokeballActive(true)

    const isCaught = await battle.hasCaughtPokemon(opponentHealth)

    const caughtMessage = catchPokemon(opponent, isCaught)

    if (!isCaught) {
      setPokeballActive(false)
    }

    setMessages((prev) => [...prev, caughtMessage])
  }

  console.log(pokemons)

  return (
    <Flex bg="blue.100" p={12} borderRadius="5rem" position="relative">
      <Box flexBasis="60%">
        <PokemonOpponentCard
          pokemon={opponent}
          attack={(move) => onPokemonAttack(move, pokeHealth, setPokeHealth)}
          hp={opponentHealth}
          active={opponentTurn}
          struggle={pokeballActive}
        />

        <Box height={5} />

        <PokemonCard
          pokemon={pokemon}
          attack={(move) =>
            onPokemonAttack(move, opponentHealth, setOpponentHealth)
          }
          hp={pokeHealth}
          active={!opponentTurn && !pokeballActive}
        />
      </Box>

      <Sidebar
        pokeBallsCount={pokeBalls}
        onPokeballThrow={onPokeballThrow}
        pokeballActive={pokeballActive}
        messages={messages}
      />
    </Flex>
  )
}

export default Battlefield
