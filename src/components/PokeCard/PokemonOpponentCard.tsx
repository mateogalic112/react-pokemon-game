import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import CardImage from './components/CardImage'
import CardStats from './components/CardStats'
import { IPokemonCard } from './PokemonCard'

const PokemonOpponentCard = ({
  pokemon,
  attack,
  hp,
  isActive,
  isStruggling,
  isAttacking,
  isDamaging,
}: IPokemonCard) => {
  const randomMoveIndex = Math.round(Math.random() * 3)

  useEffect(() => {
    if (!isActive) return

    setTimeout(() => {
      attack(pokemon.getMoves()[randomMoveIndex])
    }, 500)
  }, [isActive])

  return (
    <Box maxW="sm" py={3} m="auto">
      <CardStats
        title={pokemon.getName()}
        stats={pokemon.getStats().slice(1)}
        hp={hp}
        children={null}
        isDamaging={isDamaging}
      />

      <CardImage
        src={pokemon.getImage()}
        alt={pokemon.getName()}
        isStruggling={isStruggling}
        isAttacking={isAttacking}
        isDamaging={isDamaging}
        isOpponent
      />
    </Box>
  )
}

export default PokemonOpponentCard
