import { VStack, Text, HStack } from '@chakra-ui/react'
import { useFetchInitialPokemons } from '../../api/pokemons/useFetchInitialPokemons'
import Pokemon from '../../models/Pokemon'
import ChooseCard from './ChooseCard'
import { useNavigate } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'
import { useGetPokeTrainer } from '../../api/pokeTrainer/useGetPokeTrainer'
import { useCreatePokemon } from '../../api/pokemons/useCreatePokemon'

const Home = () => {
  const assignPokemon = useCreatePokemon()
  const initialPokemonResults = useFetchInitialPokemons([1, 4, 7])
  const { data: trainer } = useGetPokeTrainer(1)

  let navigate = useNavigate()
  // navigate before chance to paint the screen
  useLayoutEffect(() => {
    if (trainer && trainer.pokemons.length > 0) navigate('/game')
  }, [navigate, trainer])

  const [message, setMessage] = useState('')
  const onPokemonChoose = async (pokemon: Pokemon): Promise<void> => {
    setMessage(`You have choosen ${pokemon.name}`)
    await assignPokemon.mutateAsync({
      hp: pokemon.hp,
      pokemonID: pokemon.id,
      pokeTrainerId: trainer?.id,
    })
    setTimeout(() => {
      navigate('/game')
    }, 1000)
  }

  if (!trainer) return null
  if (!initialPokemonResults.every(({ data }) => Boolean(data))) return null

  const pokemons = initialPokemonResults.map(({ data }) => new Pokemon(data))

  return (
    <VStack minH="60vh" alignItems="stretch" justifyContent="space-between">
      <div />

      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        {message ? message : 'Welcome to Pokemon'}
      </Text>

      <HStack spacing="24px" wrap="wrap" justifyContent="space-around">
        {pokemons.map((pokemon) => (
          <ChooseCard
            key={pokemon.id}
            src={pokemon.image}
            alt={pokemon.name}
            onClick={() => onPokemonChoose(pokemon)}
          />
        ))}
      </HStack>
    </VStack>
  )
}

export default Home
