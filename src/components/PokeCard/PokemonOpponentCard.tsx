import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { getOpponentTurn, useBattleContext } from '../../contexts/battle'
import { useOpponentContext } from '../../contexts/opponent'
import CardImage from './components/CardImage'
import CardStats from './components/CardStats'

const PokemonOpponentCard = () => {
  const { foe: opponent } = useOpponentContext()
  const { animations, turn, onPokemonAttack, opponentHealth, pokemonHealth } =
    useBattleContext()
  const opponentTurn = getOpponentTurn(turn)

  useEffect(() => {
    if (!opponentTurn) return

    const randomMoveIndex = Math.round(Math.random() * 3)
    setTimeout(() => {
      onPokemonAttack(opponent.moves[randomMoveIndex], pokemonHealth)
    }, 500)
  }, [opponentTurn])

  const isAttacking = opponentTurn && animations.pokemonAttackActive
  const isDamaging = !opponentTurn && animations.pokemonDamageActive
  const isStruggling = !opponentTurn && animations.pokeballActive

  return (
    <Box maxW="sm" py={3} m="auto">
      <CardStats
        title={opponent.name}
        stats={opponent.stats.slice(1)}
        hp={opponentHealth}
        children={null}
        isDamaging={isDamaging}
      />

      <CardImage
        src={opponent.image}
        alt={opponent.name}
        isStruggling={isStruggling}
        isAttacking={isAttacking}
        isDamaging={isDamaging}
        isOpponent
      />
    </Box>
  )
}

export default PokemonOpponentCard
