import { Box, Flex, VStack } from '@chakra-ui/react'
import PokemonCard from '../../components/PokeCard/PokemonCard'
import Sidebar from './Sidebar'
import PokemonOpponentCard from '../../components/PokeCard/PokemonOpponentCard'
import SwitchPokemonMenu from '../../components/SwitchPokemonMenu'
import EscapePopover from '../../components/EscapePopover'
import { useSpeechSynthesis } from 'react-speech-kit'
import Pokedex from '../../components/Pokedex'
import { getOpponentTurn, useBattleContext } from '../../contexts/battle'
import { useOpponentContext } from '../../contexts/opponent'
import { usePokeTrainerContext } from '../../contexts/poke-trainer'

const Battlefield = () => {
  const { trainer } = usePokeTrainerContext()
  const { foe: opponent } = useOpponentContext()
  const {
    pokemon,
    pokemonHealth,
    switchPokemon,
    battleMessages,
    turn,
    animations,
    onPokemonAttack,
    onPokeballThrow,
    opponentHealth,
  } = useBattleContext()
  const opponentTurn = getOpponentTurn(turn)

  // Pokedex speak
  const { speak, speaking } = useSpeechSynthesis()
  const onPokedexClick = async () => {
    const text = opponent.getPokedexData()
    speak({ text })
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
          attack={(move) => onPokemonAttack(move, pokemon.hp)}
          hp={opponentHealth}
          isActive={opponentTurn}
          isStruggling={!opponentTurn && animations.pokeballActive}
          isAttacking={opponentTurn && animations.pokemonAttackActive}
          isDamaging={!opponentTurn && animations.pokemonDamageActive}
        />

        <Box height={5} />

        <PokemonCard
          pokemon={pokemon}
          attack={(move) => onPokemonAttack(move, opponentHealth)}
          hp={pokemonHealth}
          isActive={!opponentTurn && !animations.pokeballActive}
          isAttacking={!opponentTurn && animations.pokemonAttackActive}
          isDamaging={opponentTurn && animations.pokemonDamageActive}
        />
      </Box>

      <Sidebar
        onPokeballThrow={onPokeballThrow}
        pokeballActive={animations.pokeballActive}
        messages={battleMessages}
        isActive={
          !animations.pokemonAttackActive &&
          !animations.pokemonDamageActive &&
          !animations.pokeballActive
        }
      >
        <Pokedex
          onPokedexClick={onPokedexClick}
          isDisabled={animations.pokeballActive}
          pokemonImage={opponent.image}
          pokemonName={opponent.name}
          isSpeaking={speaking}
        />

        <VStack alignItems="flex-end">
          {availablePokemons.length > 0 && (
            <SwitchPokemonMenu
              pokemons={availablePokemons}
              title="Switch pokemon"
              selectPokemon={switchPokemon}
            />
          )}

          <EscapePopover />
        </VStack>
      </Sidebar>
    </Flex>
  )
}

export default Battlefield
