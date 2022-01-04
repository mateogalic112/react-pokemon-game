import { useRef, useState } from 'react'
import Battlefield from '.'
import { useFetchPokemon } from '../../api/pokemons/useFetchPokemon'
import { usePokeTrainerContext } from '../../contexts/pokeTrainer'
import Pokemon from '../../models/Pokemon'

const PrepareBattle = () => {
  const { pokemons } = usePokeTrainerContext()
  const [pokemon, setPokemon] = useState(pokemons[0])

  const switchPokemon = (newPokemon: Pokemon) => {
    setPokemon(newPokemon)
  }

  // Store side-effect in mutable ref
  const ref = useRef(Math.ceil(Math.random() * 20))
  const { data: opponentData } = useFetchPokemon(ref.current)

  let opponent = null
  if (opponentData) opponent = new Pokemon(opponentData)

  if (!opponent) {
    return <div>Loading...</div>
  }

  return (
    <Battlefield
      pokemon={pokemon}
      opponent={opponent}
      switchPokemon={switchPokemon}
    />
  )
}

export default PrepareBattle
