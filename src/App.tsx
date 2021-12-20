import { useEffect, useState } from 'react'
import BattleField from './components/BattleField'
import Navigation from './components/Navigation'
import { PokeTrainerProvider } from './contexts/pokeTrainer'
import Layout from './layout/Layout'
import Pokemon from './models/Pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [opponent, setOpponent] = useState<Pokemon | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const [p1, p2] = await Promise.all([
        fetch(`${BASE_URL}/pokemon/1`).then((res) => res.json()),
        fetch(`${BASE_URL}/pokemon/2`).then((res) => res.json()),
      ])

      setPokemon(new Pokemon(p1))
      setOpponent(new Pokemon(p2))
    }

    fetchData()
  }, [])

  if (pokemon === null || opponent === null) {
    return <h1>Loading...</h1>
  }

  return (
    <Layout>
      <Navigation />

      <PokeTrainerProvider>
        <BattleField pokemon={pokemon} opponent={opponent} />
      </PokeTrainerProvider>
    </Layout>
  )
}

export default App
