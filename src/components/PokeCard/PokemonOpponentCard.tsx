import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import CardImage from './components/CardImage'
import CardStats from './components/CardStats'
import { IPokemonCard } from './PokemonCard'

const PokemonOpponentCard = ({
  pokemon,
  attack,
  hp,
  active,
  struggle,
}: IPokemonCard) => {
  const randomMoveIndex = Math.round(Math.random() * 3)

  useEffect(() => {
    if (!active) return

    setTimeout(() => {
      attack(pokemon.getMoves()[randomMoveIndex])
    }, 2000)
  }, [active])

  return (
    <Box maxW="sm" py={3} m="auto">
      <CardStats
        title={pokemon.getName()}
        stats={pokemon.getStats().slice(1)}
        hp={hp}
        children={null}
      />

      <CardImage
        src={pokemon.getImage()}
        alt={pokemon.getName()}
        struggle={struggle}
      />
    </Box>
  )
}

export default PokemonOpponentCard
