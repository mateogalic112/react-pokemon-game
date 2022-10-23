import Navigation from './layout/Navigation'
import { PokeTrainerProvider } from './contexts/poke-trainer'
import Layout from './layout/Layout'
import { Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Pokedex from './screens/Pokedex'
import Game from './screens/Game'
import Battlefield from './screens/Battlefield'
import { OpponentProvider } from './contexts/opponent'
import { BattleProvider } from './contexts/battle'

function App() {
  return (
    <PokeTrainerProvider>
      <OpponentProvider>
        <Layout>
          <Navigation />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="game" element={<Game />} />
            <Route
              path="battlefield"
              element={
                <BattleProvider>
                  <Battlefield />
                </BattleProvider>
              }
            />
            <Route path="pokedex" element={<Pokedex />} />
          </Routes>
        </Layout>
      </OpponentProvider>
    </PokeTrainerProvider>
  )
}

export default App
