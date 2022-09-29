import { Heading, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePokeTrainerContext } from '../../contexts/poke-trainer'

const Pokedex = () => {
  let navigate = useNavigate()
  const { pokemons } = usePokeTrainerContext()

  useEffect(() => {
    setTimeout(() => {
      navigate('/game')
    }, 1000)
  })

  return (
    <section>
      <Heading>Pokedex</Heading>

      <Text>My pokemons</Text>

      <VStack>
        {pokemons.map((pokemon) => (
          <Heading key={pokemon.getId()}>{pokemon.getName()}</Heading>
        ))}
      </VStack>
    </section>
  )
}

export default Pokedex
