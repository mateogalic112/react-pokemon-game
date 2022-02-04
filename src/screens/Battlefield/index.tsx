import { Box, Flex, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { usePokeTrainerContext } from '../../contexts/pokeTrainer'
import Battle from '../../models/Battle'
import Pokemon, { Move } from '../../models/Pokemon'
import PokemonCard from '../../components/PokeCard/PokemonCard'
import Sidebar from './Sidebar'
import PokemonOpponentCard from '../../components/PokeCard/PokemonOpponentCard'
import { useNavigate } from 'react-router-dom'
import SwitchPokemonMenu from '../../components/SwitchPokemonMenu'
import EscapePopover from '../../components/EscapePopover'
import { useSpeechSynthesis } from 'react-speech-kit';
import Pokedex from '../../components/Pokedex'

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

  // Keep track of pokemons used in battle -> [ pokemonId, hp ]
  const [usedPokemons, setUsedPokemons] = useState(
    new Map<number, number>([[pokemon.getId(), pokemon.getHp()]]),
  )

  const storeUsedPokemon = (pokemonId: number, hp: number) => {
    setUsedPokemons(new Map(usedPokemons.set(pokemonId, hp)))
  }

  // Pokemons hp saved in component state
  const [pokeHealth, setPokeHealth] = useState(pokemon.getHp())
  const [opponentHealth, setOpponentHealth] = useState(opponent.getHp())

  // Adjust classNames for animations
  const [pokeballActive, setPokeballActive] = useState(false)
  const [pokemonAttackActive, setPokemonAttackActive] = useState(false)
  const [pokemonDamageActive, setPokemonDamageActive] = useState(false)

  // Keep track of who is next in turn for attacking
  const [turn, setTurn] = useState(0)
  const opponentTurn = turn % 2 === 1

  // Display fight messages
  const [messages, setMessages] = useState<string[]>([])

  // Initiliaze fight
  const battle = new Battle(pokemon, opponent)
  // Get current trainer from context
  const { catchPokemon, pokeBalls, pokemons } = usePokeTrainerContext()

  // Pokedex speak
  const { speak, speaking } = useSpeechSynthesis();
  const onPokedexClick = async () => {
    const text = opponent.getPokedexData()
    speak({ text })
  }

  const onPokemonAttack = async (
    move: Move,
    health: number,
    setHealth: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setPokemonAttackActive(true)

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(setPokemonAttackActive(false))
      }, 1200)
    })

    // HOF for creating attack damage and battle message based on chosen move
    const { damage, messages } = battle.attackOpponent(opponentTurn)(
      move,
      health,
    )

    if (damage > 0) {
      setPokemonDamageActive(true)

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(setPokemonDamageActive(false))
        }, 750)
      })
    }

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
      }, 1000)
    }

    setMessages((prev) => [...prev, caughtMessage])
  }

  const onEscape = () => {
    navigate('/pokedex')
  }

  const onPokemonSwitch = (oldPokemon: Pokemon, newPokemon: Pokemon): void => {
    // Store old pokemon health in state
    storeUsedPokemon(oldPokemon.getId(), pokeHealth)

    //Check if he already was in battle
    const pokemonHealth =
      usedPokemons.get(newPokemon.getId()) ?? newPokemon.getHp()
    if (pokemonHealth > 0) {
      setPokeHealth(pokemonHealth)
    } else {
      return
    }

    // switch to new pokemon
    switchPokemon(newPokemon)
  }

  // Calculate available pokemons
  const availablePokemons = pokemons.filter(
    (item) => item.getId() !== pokemon.getId(),
  )

  return (
    <Flex bg="blue.100" p={12} borderRadius="5rem" position="relative">
      <Box flexBasis="60%">
        <PokemonOpponentCard
          pokemon={opponent}
          attack={(move) => onPokemonAttack(move, pokeHealth, setPokeHealth)}
          hp={opponentHealth}
          isActive={opponentTurn}
          isStruggling={!opponentTurn && pokeballActive}
          isAttacking={opponentTurn && pokemonAttackActive}
          isDamaging={!opponentTurn && pokemonDamageActive}
        />

        <Box height={5} />

        <PokemonCard
          pokemon={pokemon}
          attack={(move) =>
            onPokemonAttack(move, opponentHealth, setOpponentHealth)
          }
          hp={pokeHealth}
          isActive={!opponentTurn && !pokeballActive}
          isAttacking={!opponentTurn && pokemonAttackActive}
          isDamaging={opponentTurn && pokemonDamageActive}
        />
      </Box>

      <Sidebar
        pokeBallsCount={pokeBalls}
        onPokeballThrow={onPokeballThrow}
        pokeballActive={pokeballActive}
        messages={messages}
        isActive={
          !pokemonAttackActive && !pokemonDamageActive && !pokeballActive
        }
      >
        <Pokedex
          onPokedexClick={onPokedexClick}
          isDisabled={pokeballActive}
          pokemonImage={opponent.getImage()}
          pokemonName={opponent.getName()}
          isSpeaking={speaking}
        />

        <VStack alignItems="flex-end">
          {availablePokemons.length > 0 && (
            <SwitchPokemonMenu
              pokemons={availablePokemons}
              title="Switch pokemon"
              selectPokemon={(newPokemon: Pokemon) =>
                onPokemonSwitch(pokemon, newPokemon)
              }
            />
          )}

          <EscapePopover onClick={onEscape} />
        </VStack>
      </Sidebar>
    </Flex>
  )
}

export default Battlefield
