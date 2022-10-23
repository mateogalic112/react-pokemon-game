import { Box, Flex, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { usePokeTrainerContext } from '../../contexts/poke-trainer'
import Battle from '../../models/Battle'
import Pokemon, { Move } from '../../models/Pokemon'
import PokemonCard from '../../components/PokeCard/PokemonCard'
import Sidebar from './Sidebar'
import PokemonOpponentCard from '../../components/PokeCard/PokemonOpponentCard'
import { useNavigate } from 'react-router-dom'
import SwitchPokemonMenu from '../../components/SwitchPokemonMenu'
import EscapePopover from '../../components/EscapePopover'
import { useSpeechSynthesis } from 'react-speech-kit'
import Pokedex from '../../components/Pokedex'
import { useOpponentContext } from '../../contexts/opponent'

const Battlefield = () => {
  let navigate = useNavigate()

  const { foe: opponent } = useOpponentContext()
  const { trainer, catchPokemon } = usePokeTrainerContext()

  const [pokemon, setPokemon] = useState<Pokemon>(trainer.pokemons[0])
  const switchPokemon = (newPokemon: Pokemon) => {
    setPokemon(newPokemon)
  }

  // Keep track of pokemons used in battle -> [ pokemonId, hp ]
  const [usedPokemons, setUsedPokemons] = useState(new Map<number, number>())
  const storeUsedPokemon = (pokemonId: number, hp: number) => {
    setUsedPokemons(new Map(usedPokemons.set(pokemonId, hp)))
  }

  // Pokemons hp saved in component state
  const [pokeHealth, setPokeHealth] = useState(pokemon.hp)
  const [opponentHealth, setOpponentHealth] = useState(opponent.hp)

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

  // Pokedex speak
  const { speak, speaking } = useSpeechSynthesis()
  const onPokedexClick = async () => {
    const text = opponent.getPokedexData()
    speak({ text })
  }

  // Victory sound
  const victory = new Audio('/victory.mp3')

  const onPokemonAttack = async (
    move: Move,
    health: number,
    setHealth: React.Dispatch<React.SetStateAction<number>>
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
      health
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

    const caughtMessage = await catchPokemon(opponent, isCaught)

    if (!isCaught) {
      setPokeballActive(false)
    } else {
      victory.play()
      setTimeout(() => {
        navigate('/pokedex')
      }, 5500)
    }

    setMessages((prev) => [...prev, caughtMessage])
  }

  const onEscape = () => {
    navigate('/game')
  }

  const onPokemonSwitch = (oldPokemon: Pokemon, newPokemon: Pokemon): void => {
    // Store old pokemon health in state
    storeUsedPokemon(oldPokemon.id, pokeHealth)

    //Check if he already was in battle
    const pokemonHealth = usedPokemons.get(newPokemon.id) ?? newPokemon.hp
    if (pokemonHealth > 0) {
      setPokeHealth(pokemonHealth)
    } else {
      return
    }

    // switch to new pokemon
    switchPokemon(newPokemon)
  }

  // Calculate available pokemons
  const availablePokemons = trainer.pokemons.filter(
    (item) => item.id !== pokemon.id
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
          pokemonImage={opponent.image}
          pokemonName={opponent.name}
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
