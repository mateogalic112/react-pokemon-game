import { useEffect, useState } from 'react'
import Navigation from './layout/Navigation'
import { PokeTrainerProvider } from './contexts/pokeTrainer'
import Layout from './layout/Layout'
import Pokemon from './models/Pokemon'
import Battlefield from './screens/Battlefield'
import { Route, Routes } from 'react-router-dom'
import Home from './screens/Home'

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
    <PokeTrainerProvider>
      <Layout>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="battlefield"
            element={<Battlefield pokemon={pokemon} opponent={opponent} />}
          />
        </Routes>
      </Layout>
    </PokeTrainerProvider>
  )
}

export default App
