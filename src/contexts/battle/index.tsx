import { createContext, FC, useContext, useReducer, useState } from 'react'
import Battle from '../../models/Battle'
import Pokemon, { Move } from '../../models/Pokemon'
import { usePokeTrainerContext } from '../poke-trainer'
import BattleActionKind from './actions'
import battleReducer from './reducer'
import { useSpeechSynthesis } from 'react-speech-kit'
import { useNavigate } from 'react-router-dom'
import { useOpponentContext } from '../opponent'

export interface BattleState {
  turn: number
  battleMessages: string[]
}

const initialState: BattleState = {
  turn: 0,
  battleMessages: [],
}

interface IBattleContext extends BattleState {}

const initialContext: IBattleContext = {
  ...initialState,
}

const BattleContext = createContext<IBattleContext>(initialContext)

export const useBattleContext = () => {
  const context = useContext(BattleContext)
  if (!context) {
    throw new Error('Context must be within BattleContext.Provider!')
  }

  return context
}

export const BattleProvider: FC = ({ children }) => {
  const [{ turn, battleMessages }, dispatch] = useReducer(
    battleReducer,
    initialState
  )
  const { foe } = useOpponentContext()
  const { trainer, catchPokemon } = usePokeTrainerContext()
  let navigate = useNavigate()

  // Currently fighting pokemon
  const [pokemon, setPokemon] = useState<Pokemon | null>(trainer?.pokemons[0])
  const switchPokemon = (newPokemon: Pokemon) => {
    setPokemon(newPokemon)
  }

  // Keep track of pokemons used in battle -> [ pokemonId, hp ]
  const [usedPokemons, setUsedPokemons] = useState(new Map<number, number>())
  const storeUsedPokemon = (pokemonId: number, hp: number) => {
    setUsedPokemons(new Map(usedPokemons.set(pokemonId, hp)))
  }

  // Pokemons hp saved in component state
  const [pokeHealth, setPokeHealth] = useState(pokemon?.hp ?? 0)
  const [opponentHealth, setOpponentHealth] = useState(foe.hp)

  // Adjust classNames for animations
  const [pokeballActive, setPokeballActive] = useState(false)
  const [pokemonAttackActive, setPokemonAttackActive] = useState(false)
  const [pokemonDamageActive, setPokemonDamageActive] = useState(false)

  // Keep track of who is next in turn for attacking
  const opponentTurn = turn % 2 === 1

  // Initiliaze fight
  const battle = new Battle(pokemon, foe)

  // Pokedex speak
  const { speak, speaking } = useSpeechSynthesis()
  const onPokedexClick = async () => {
    const text = foe.getPokedexData()
    speak({ text })
  }

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

    const setHealthRef = opponentTurn ? setPokeHealth : setOpponentHealth

    setHealthRef((prevHealth) => prevHealth - damage)
  }

  // Victory sound
  const victory = new Audio('/victory.mp3')

  // Throw pokeball to catch opponent pokemon
  const onPokeballThrow = async () => {
    setPokeballActive(true)

    const isCaught = await battle.hasCaughtPokemon(opponentHealth)
    const caughtTryMessage = await catchPokemon(foe, isCaught)

    if (!isCaught) {
      setPokeballActive(false)
    } else {
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

  const onEscape = () => {
    navigate('/game')
  }

  const onPokemonSwitch = (oldPokemon: Pokemon, newPokemon: Pokemon): void => {
    // Store old pokemon health in state
    storeUsedPokemon(oldPokemon.id, pokeHealth)

    //Check if he already was in battle
    const pokemonHealth = usedPokemons.get(newPokemon.id) ?? newPokemon.hp
    if (pokemonHealth > 0) {
      setPokeHealth(pokemonHealth)
    } else {
      return
    }

    // switch to new pokemon
    switchPokemon(newPokemon)
  }

  // Calculate available pokemons
  const availablePokemons = trainer.pokemons.filter(
    (item) => item.id !== pokemon.id
  )

  return (
    <BattleContext.Provider
      value={{
        battleMessages,
        turn,
      }}
    >
      {children}
    </BattleContext.Provider>
  )
}
