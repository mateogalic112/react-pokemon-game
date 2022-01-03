import { Heading, Text, VStack } from '@chakra-ui/react'
import { usePokeTrainerContext } from '../../contexts/pokeTrainer'

const Pokedex = () => {
  const { pokemons } = usePokeTrainerContext()
  return (
    <section>
      <Heading>Pokedex</Heading>

      <Text>My pokemons</Text>

      <VStack>
        {pokemons.map((pokemon) => (
          <Heading>{pokemon.getName()}</Heading>
        ))}
      </VStack>
    </section>
  )
}

export default Pokedex
