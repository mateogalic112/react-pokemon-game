import Battlefield from '.'
import { useFetchPokemon } from '../../api/pokemons/useFetchPokemon'
import { usePokeTrainerContext } from '../../contexts/pokeTrainer'
import Pokemon from '../../models/Pokemon'

const RANDOM_POKEMON_ID = Math.floor(Math.random() * 20)

const PrepareBattle = () => {
  const { data: opponentData } = useFetchPokemon(RANDOM_POKEMON_ID)

  const { pokemons } = usePokeTrainerContext()
  const pokemon = pokemons[0]

  let opponent = null
  if (opponentData) opponent = new Pokemon(opponentData)

  if (!opponent) {
    return <div>Loading...</div>
  }

  return <Battlefield pokemon={pokemon} opponent={opponent} />
}

export default PrepareBattle
