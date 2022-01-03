import Navigation from './layout/Navigation'
import { PokeTrainerProvider } from './contexts/pokeTrainer'
import Layout from './layout/Layout'
import { Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import PrepareBattle from './screens/Battlefield/PrepareBattle'
import Pokedex from './screens/Pokedex'

function App() {
  return (
    <PokeTrainerProvider>
      <Layout>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="battlefield" element={<PrepareBattle />} />
          <Route path="pokedex" element={<Pokedex />} />
        </Routes>
      </Layout>
    </PokeTrainerProvider>
  )
}

export default App
