import { Box } from '@chakra-ui/react'
import Pokemon, { Move } from '../../models/Pokemon'
import CardAction from './components/CardAction'
import CardImage from './components/CardImage'
import CardStats from './components/CardStats'

export interface IPokemonCard {
  pokemon: Pokemon
  attack: (move: Move) => void
  hp: number
  isActive: boolean
  isStruggling: boolean
  isAttacking: boolean
  isDamaging: boolean
}

const PokemonCard = ({
  pokemon,
  attack,
  hp,
  isActive,
  isAttacking,
  isDamaging,
}: Omit<IPokemonCard, 'isStruggling'>) => {
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
        hp={hp}
        isDamaging={isDamaging}
      >
        <CardAction
          moves={pokemon.moves.slice(0, 6)}
          attack={attack}
          active={isActive}
        />
      </CardStats>
    </Box>
  )
}

export default PokemonCard
