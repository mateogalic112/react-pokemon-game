import Navigation from "./layout/Navigation";
import { PokeTrainerProvider } from "./contexts/trainer";
import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Pokedex from "./screens/Pokedex";
import Game from "./screens/Game";
import Battlefield from "./screens/Battlefield";
import { OpponentProvider } from "./contexts/opponent";
import { BattleProvider } from "./contexts/battle";
import LoginPage from "./screens/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
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
          </Routes>
        </Layout>
      </OpponentProvider>
    </PokeTrainerProvider>
  );
}

export default App;
