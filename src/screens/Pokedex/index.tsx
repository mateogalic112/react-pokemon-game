import { Heading, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePokeTrainerContext } from '../../contexts/pokeTrainer'

const Pokedex = () => {
  let navigate = useNavigate()
  const { pokemons } = usePokeTrainerContext()

  useEffect(() => {
    setTimeout(() => {
      navigate('/battlefield')
    }, 2000)
  })

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
