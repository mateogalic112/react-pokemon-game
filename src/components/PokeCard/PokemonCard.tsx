import { Box } from '@chakra-ui/react'
import { getOpponentTurn, useBattleContext } from '../../contexts/battle'
import CardAction from './components/CardAction'
import CardImage from './components/CardImage'
import CardStats from './components/CardStats'

export interface IPokemonCard {}

const PokemonCard = () => {
  const { pokemon, onPokemonAttack, opponentHealth, pokemonHealth, turn } =
    useBattleContext()
  const opponentTurn = getOpponentTurn(turn)

  const { animations } = useBattleContext()
  const isActive = !opponentTurn && !animations.pokeballActive
  const isAttacking = !opponentTurn && animations.pokemonAttackActive
  const isDamaging = opponentTurn && animations.pokemonDamageActive

  return (
    <Box maxW="sm" py={3} m="auto">
      <CardImage
        src={pokemon.image}
        alt={pokemon.name}
        isAttacking={isAttacking}
        isDamaging={isDamaging}
      />

      <CardStats
        title={pokemon.name}
        stats={pokemon.stats.slice(1)}
        hp={pokemonHealth}
        isDamaging={isDamaging}
      >
        <CardAction
          moves={pokemon.moves.slice(0, 6)}
          attack={(move) => onPokemonAttack(move, opponentHealth)}
          active={isActive}
        />
      </CardStats>
    </Box>
  )
}

export default PokemonCard
