import { Box, Button, Spacer } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import EnemyStats from './components/EnemyStats'
import Navigation from './components/Navigation'
import PokemonCard from './components/PokemonCard'
import Layout from './layout/Layout'
import Pokemon from './models/Pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [trainAttack, setTrainAttack] = useState(100)
  const [winner, setWinner] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${BASE_URL}/pokemon/1`).then((res) =>
        res.json(),
      )

      setPokemon(new Pokemon(result))
    }

    fetchData()
  }, [])

  const attackEnemy = (
    attackFn: Function | undefined,
    pokemonName: string | undefined,
  ): void => {
    if (!attackFn) return

    console.log(attackFn)

    const damage = attackFn()

    if (damage >= trainAttack) {
      setTrainAttack(0)
      setWinner(pokemonName)

      return
    }

    setTrainAttack(trainAttack - damage)
  }

  if (pokemon === null) {
    return <h1>Loading...</h1>
  }

  return (
    <Layout>
      <Navigation />

      <EnemyStats health={trainAttack} name="Enemy" />

      <Box height={10} />

      <div>
        <PokemonCard pokemon={pokemon} />
        {winner && <p>Winner is {winner}</p>}

        <Button
          mt={2}
          onClick={() =>
            attackEnemy(pokemon?.attack.bind(pokemon), pokemon?.name)
          }
        >
          Attack
        </Button>
      </div>
    </Layout>
  )
}

export default App
