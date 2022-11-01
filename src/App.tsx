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
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Provider store={store}>
      <PokeTrainerProvider>
        <OpponentProvider>
          <Layout>
            <Navigation />
            <Routes>
              <Route element={<ProtectedRoute />}>
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
              </Route>
              <Route path="pokedex" element={<Pokedex />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="town" element={<TownScreen />} />
            </Routes>
          </Layout>
        </OpponentProvider>
      </PokeTrainerProvider>
    </Provider>
  )
}

export default App
