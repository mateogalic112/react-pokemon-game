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
import TownScreen from './phaser/game'
import LoginPage from './screens/Login'
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Navigation />

        <Routes>
          <Route
            path="/"
            element={
              <PokeTrainerProvider>
                <Home />
              </PokeTrainerProvider>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="town" element={<TownScreen />} />
          <Route
            path="game"
            element={
              <OpponentProvider>
                <Game />
              </OpponentProvider>
            }
          />
          <Route
            path="battlefield"
            element={
              <PokeTrainerProvider>
                <OpponentProvider>
                  <BattleProvider>
                    <Battlefield />
                  </BattleProvider>
                </OpponentProvider>
              </PokeTrainerProvider>
            }
          />
          <Route path="pokedex" element={<Pokedex />} />
        </Routes>
      </Layout>
    </Provider>
  )
}

export default App
