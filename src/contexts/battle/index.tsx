import {
  createContext,
  FC,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react'
import Battle from '../../models/Battle'
import Pokemon, { Move } from '../../models/Pokemon'
import { usePokeTrainerContext } from '../poke-trainer'
import BattleActionKind from './actions'
import battleReducer from './reducer'
import { useNavigate } from 'react-router-dom'
import { useOpponentContext } from '../opponent'
import { usePatchPokemonHealth } from '../../api/pokemons/usePatchPokemonHealth'

export interface BattleState {
  turn: number
  battleMessages: string[]
}

const initialState: BattleState = {
  turn: 0,
  battleMessages: [],
}

interface IBattleContext extends BattleState {
  pokemon: Pokemon
  pokemonHealth: number
  opponentHealth: number
  animations: {
    pokeballActive: boolean
    pokemonAttackActive: boolean
    pokemonDamageActive: boolean
  }

  onPokemonAttack: (move: Move, health: number) => Promise<void>
  onPokeballThrow: () => Promise<void>
  switchPokemon: (newPokemon: Pokemon) => void
}

const initialContext: IBattleContext = {
  ...initialState,

  pokemon: null,
  pokemonHealth: 0,
  opponentHealth: 0,
  animations: {
    pokeballActive: false,
    pokemonAttackActive: false,
    pokemonDamageActive: false,
  },

  onPokemonAttack: async (move: Move, health: number) => {},
  onPokeballThrow: async () => {},
  switchPokemon: (newPokemon: Pokemon) => {},
}

const BattleContext = createContext<IBattleContext>(initialContext)

export const useBattleContext = () => {
  const context = useContext(BattleContext)
  if (!context) {
    throw new Error('Context must be within BattleContext.Provider!')
  }

  return context
}

export const getOpponentTurn = (turn: number) => turn % 2 === 1

export const BattleProvider: FC = ({ children }) => {
  const [{ turn, battleMessages }, dispatch] = useReducer(
    battleReducer,
    initialState
  )
  const { foe } = useOpponentContext()
  const { trainer, catchPokemon } = usePokeTrainerContext()
  const updateHealth = usePatchPokemonHealth()
  let navigate = useNavigate()
  console.log({ trainer })

  // Currently fighting pokemon
  const [pokemon, setPokemon] = useState<Pokemon>(trainer.pokemons[0])
  const switchPokemon = (newPokemon: Pokemon) => {
    setPokemon(newPokemon)
  }

  // Adjust classNames for animations
  const [pokeballActive, setPokeballActive] = useState(false)
  const [pokemonAttackActive, setPokemonAttackActive] = useState(false)
  const [pokemonDamageActive, setPokemonDamageActive] = useState(false)

  const battle = new Battle(pokemon, foe)
  const [pokemonHealth, setPokemonHealth] = useState(pokemon.hp)
  const [opponentHealth, setOpponentHealth] = useState(foe.hp)
  const opponentTurn = getOpponentTurn(turn)

  const onPokemonAttack = async (move: Move, health: number) => {
    setPokemonAttackActive(true)

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(setPokemonAttackActive(false))
      }, 1200)
    })

    // HOF for creating attack damage and battle message based on chosen move
    const { damage, messages } = battle.attackOpponent(opponentTurn)(
      move,
      health
    )

    if (damage > 0) {
      setPokemonDamageActive(true)

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(setPokemonDamageActive(false))
        }, 750)
      })
    }

    dispatch({
      type: BattleActionKind.pokemonAttack,
      payload: { newMessages: [...messages] },
    })

    if (opponentTurn) {
      updateHealth.mutate({
        id: pokemon.id,
        hp: pokemon.hp - damage,
      })
      setPokemonHealth((prevHealth) => prevHealth - damage)
    } else {
      setOpponentHealth((prevHealth) => prevHealth - damage)
    }
  }

  // Throw pokeball to catch opponent pokemon
  const onPokeballThrow = async () => {
    setPokeballActive(true)
    const isCaught = await battle.hasCaughtPokemon(opponentHealth)
    const caughtTryMessage = await catchPokemon(foe, isCaught)

    if (!isCaught) {
      setPokeballActive(false)
    } else {
      // Victory sound
      const victory = new Audio('/victory.mp3')
      victory.play()
      setTimeout(() => {
        navigate('/pokedex')
      }, 5500)
    }

    dispatch({
      type: BattleActionKind.pokeballThrown,
      payload: { newMessage: caughtTryMessage },
    })
  }

  const animations = useMemo(
    () => ({ pokeballActive, pokemonAttackActive, pokemonDamageActive }),
    [pokeballActive, pokemonAttackActive, pokemonDamageActive]
  )

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
        opponentHealth,
      }}
    >
      {children}
    </BattleContext.Provider>
  )
}
