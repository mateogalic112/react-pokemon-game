import { Box, Button, Flex, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { usePokeTrainerContext } from '../../contexts/pokeTrainer'
import Battle from '../../models/Battle'
import Pokemon, { Move } from '../../models/Pokemon'
import PokemonCard from '../../components/PokeCard/PokemonCard'
import Sidebar from './Sidebar'
import PokemonOpponentCard from '../../components/PokeCard/PokemonOpponentCard'
import { useNavigate } from 'react-router-dom'
import SwitchPokemonMenu from '../../components/SwitchPokemonMenu'
import { focusManager } from 'react-query'
import EscapePopover from '../../components/EscapePopover'

interface IBattlefieldProps {
  pokemon: Pokemon
  opponent: Pokemon
  switchPokemon: (newPokemon: Pokemon) => void
}

const Battlefield = ({
  pokemon,
  opponent,
  switchPokemon,
}: IBattlefieldProps) => {
  let navigate = useNavigate()
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
    } else {
      setTimeout(() => {
        navigate('/pokedex')
      }, 3000)
    }

    setMessages((prev) => [...prev, caughtMessage])
  }

  const onEscape = () => {
    navigate('/pokedex')
  }

  // Calculate available pokemons
  const availablePokemons = pokemons.filter(
    (item) => item.getId() !== pokemon.getId(),
  )

  console.log(trainer)

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
      >
        <VStack alignItems="flex-end">
          {availablePokemons.length > 0 && (
            <SwitchPokemonMenu
              pokemons={availablePokemons}
              title="Switch pokemon"
              selectPokemon={(pokemon: Pokemon) => switchPokemon(pokemon)}
            />
          )}

          <EscapePopover onClick={onEscape} />
        </VStack>
      </Sidebar>
    </Flex>
  )
}

export default Battlefield
