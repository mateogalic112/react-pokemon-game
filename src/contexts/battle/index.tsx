import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
  useState
} from "react";
import Battle from "../../models/Battle";
import { Pokemon, Move } from "../../models/Pokemon";
import BattleActionKind from "./actions";
import battleReducer from "./reducer";
import { useNavigate } from "react-router-dom";
import { useOpponentContext } from "../opponent";
import { usePatchPokemonHealth } from "@/api/pokemons/use-update-pokemon-hp";
import { useCreatePokemon } from "@/api/pokemons/use-create-pokemon";

export interface BattleState {
  turn: number;
  battleMessages: string[];
}

const initialState: BattleState = {
  turn: 0,
  battleMessages: []
};

interface IBattleContext extends BattleState {
  pokemon: Pokemon | null;
  pokemonHealth: number;
  opponentHealth: number;
  animations: {
    pokeballActive: boolean;
    pokemonAttackActive: boolean;
    pokemonDamageActive: boolean;
  };

  onPokemonAttack: (move: Move, health: number) => Promise<void>;
  onPokeballThrow: () => Promise<void>;
  switchPokemon: (newPokemon: Pokemon) => void;
}

const initialContext: IBattleContext = {
  ...initialState,

  pokemon: null,
  pokemonHealth: 0,
  opponentHealth: 0,
  animations: {
    pokeballActive: false,
    pokemonAttackActive: false,
    pokemonDamageActive: false
  },

  onPokemonAttack: async (move: Move, health: number) => {},
  onPokeballThrow: async () => {},
  switchPokemon: (newPokemon: Pokemon) => {}
};

const BattleContext = createContext<IBattleContext>(initialContext);

export const useBattleContext = () => {
  const context = useContext(BattleContext);
  if (!context) {
    throw new Error("Context must be within BattleContext.Provider!");
  }

  return context;
};

export const getOpponentTurn = (turn: number) => turn % 2 === 1;

export const BattleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [{ turn, battleMessages }, dispatch] = useReducer(battleReducer, initialState);

  const { foe } = useOpponentContext();
  const updateHealth = usePatchPokemonHealth();
  const capturePokemon = useCreatePokemon();

  let navigate = useNavigate();

  // Currently fighting pokemon
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const switchPokemon = (newPokemon: Pokemon) => {
    setPokemon(newPokemon);
  };

  // Adjust classNames for animations
  const [pokeballActive, setPokeballActive] = useState(false);
  const [pokemonAttackActive, setPokemonAttackActive] = useState(false);
  const [pokemonDamageActive, setPokemonDamageActive] = useState(false);

  const battle = new Battle(pokemon, foe);
  const [pokemonHealth, setPokemonHealth] = useState(0);
  const [opponentHealth, setOpponentHealth] = useState(0);
  const opponentTurn = getOpponentTurn(turn);

  const onPokemonAttack = async (move: Move, health: number) => {
    setPokemonAttackActive(true);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(setPokemonAttackActive(false));
      }, 1200);
    });

    // HOF for creating attack damage and battle message based on chosen move
    const { damage, messages } = battle.attackOpponent(opponentTurn)(move, health);

    if (damage > 0) {
      setPokemonDamageActive(true);

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(setPokemonDamageActive(false));
        }, 750);
      });
    }

    dispatch({
      type: BattleActionKind.pokemonAttack,
      payload: { newMessages: [...messages] }
    });

    if (opponentTurn) {
      updateHealth.mutate({
        id: pokemon.id,
        hp: pokemon.hp - damage
      });
      setPokemonHealth((prevHealth) => prevHealth - damage);
    } else {
      setOpponentHealth((prevHealth) => prevHealth - damage);
    }
  };

  const catchPokemon = async (pokemon: Pokemon, isCaught: boolean) => {
    const currentPokeballCount = trainer.throwPokeball();
    if (!currentPokeballCount) {
      return "You ran out of pokeballs!";
    }
    await updatePokeballs.mutateAsync(currentPokeballCount);

    if (isCaught) {
      await capturePokemon.mutateAsync({
        hp: pokemon.hp,
        pokemon_id: pokemon.id,
        trainer_id: trainer.id
      });

      return `You caught ${pokemon.name}!`;
    }

    return `${pokemon.name} escaped!`;
  };

  // Throw pokeball to catch opponent pokemon
  const onPokeballThrow = async () => {
    setPokeballActive(true);
    const isCaught = await battle.hasCaughtPokemon(opponentHealth);
    const caughtTryMessage = await catchPokemon(foe, isCaught);

    if (!isCaught) {
      setPokeballActive(false);
    } else {
      // Victory sound
      const victory = new Audio("/victory.mp3");
      victory.play();
      setTimeout(() => {
        navigate("/pokedex");
      }, 5500);
    }

    dispatch({
      type: BattleActionKind.pokeballThrown,
      payload: { newMessage: caughtTryMessage }
    });
  };

  const animations = useMemo(
    () => ({ pokeballActive, pokemonAttackActive, pokemonDamageActive }),
    [pokeballActive, pokemonAttackActive, pokemonDamageActive]
  );

  return (
    <BattleContext.Provider
      value={{
        pokemon,
        pokemonHealth,
        battleMessages,
        turn,
        animations,
        onPokemonAttack,
        onPokeballThrow,
        switchPokemon,
        opponentHealth
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};
