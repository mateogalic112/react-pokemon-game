import { VStack, Text, HStack } from '@chakra-ui/react'
import { useFetchInitialPokemons } from '../../api/pokemons/useFetchInitialPokemons'
import { usePokeTrainerContext } from '../../contexts/pokeTrainer'
import Pokemon from '../../models/Pokemon'
import ChooseCard from './ChooseCard'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate()

  const results = useFetchInitialPokemons([1, 4, 7])

  const pokemons =
    results?.map((item) => {
      if (item?.data) return new Pokemon(item?.data)
    }) || []

  const { choosePokemon, pokemons: allPokemons } = usePokeTrainerContext()

  const onPokemonChoose = (pokemon: Pokemon): void => {
    const message = choosePokemon(pokemon)

    navigate('/battlefield')
  }

  return (
    <VStack minH="60vh" alignItems="stretch" justifyContent="space-between">
      <div />

      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        Welcome to Pokemon
      </Text>

      <HStack spacing="24px" wrap="wrap" justifyContent="space-around">
        {pokemons.map(
          (pokemon) =>
            pokemon && (
              <ChooseCard
                key={pokemon.getId()}
                src={pokemon.getImage()}
                alt={pokemon.getName()}
                onClick={() => onPokemonChoose(pokemon)}
              />
            ),
        )}
      </HStack>
    </VStack>
  )
}

export default Home
