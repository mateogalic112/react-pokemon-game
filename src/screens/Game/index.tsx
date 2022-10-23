import { Box, Grid, GridItem } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import Player from './Player'
import FoePokemon from './FoePokemon'
import { useFetchInitialPokemons } from '../../api/pokemons/useFetchInitialPokemons'
import Pokemon from '../../models/Pokemon'
import { useNavigate } from 'react-router-dom'
import useGameSocket from '../../api/useGameSocket'
import { useFetchGamePlayers } from '../../api/sockets/useGamePlayers'
import { useGetPokeTrainer } from '../../api/pokeTrainer/useGetPokeTrainer'
import { useOpponentContext } from '../../contexts/opponent'

// Board dimensions
const GRID_ROWS = 20
const GRID_COLUMNS = 30

// Player movement boundaries
const GO_DOWN_BOUNDARY = GRID_ROWS * GRID_COLUMNS - GRID_COLUMNS
const GO_RIGHT_BOUNDARY = GRID_COLUMNS - 1
const GO_UP_BOUNDARY = GRID_COLUMNS
const GO_LEFT_BOUNDARY = 0

// Player move validations
const invalidGoDown = (position: number): boolean =>
  position >= GO_DOWN_BOUNDARY
const invalidGoRight = (position: number): boolean =>
  position % GRID_COLUMNS === GO_RIGHT_BOUNDARY
const invalidGoUp = (position: number): boolean => position < GO_UP_BOUNDARY
const invalidGoLeft = (position: number): boolean =>
  position % GRID_COLUMNS === GO_LEFT_BOUNDARY

// Player move logic
const goDown = (position: number): number => position + GRID_COLUMNS
const goRight = (position: number): number => position + 1
const goUp = (position: number): number => position - GRID_COLUMNS
const goLeft = (position: number): number => position - 1

const Game = () => {
  let navigate = useNavigate()

  const socket = useGameSocket()
  const { data: onlinePlayers } = useFetchGamePlayers()
  const { data: trainer } = useGetPokeTrainer(1)

  const me = onlinePlayers?.find(
    (player) => player.trainerName === trainer?.name
  )

  const [freezePlayer, setFreezePlayer] = useState(false)

  const { storeOpponent } = useOpponentContext()
  const foePokemonsResult = useFetchInitialPokemons([10, 40, 70])

  const gameBoardRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    gameBoardRef.current.focus()
  }, [])

  const foePokemons = foePokemonsResult
    .map((item) => (item.data ? new Pokemon(item?.data) : undefined))
    .filter(Boolean)

  const foePokemonPositions = foePokemons.map((_, idx) => 24 * (idx + 1))
  const foePokemonsWithPositions: Record<number, Pokemon> = foePokemons.reduce(
    (acc, foe, idx) => {
      return {
        ...acc,
        [foePokemonPositions[idx]]: foe,
      }
    },
    {}
  )

  const checkEncounterWithFoe = (position: number): boolean => {
    if (foePokemonPositions.includes(position)) return true
    return false
  }

  // Battle sound
  const battleWithFoe = (foe: Pokemon) => {
    storeOpponent(foe)
    setFreezePlayer(true)
    setTimeout(() => {
      navigate('/battlefield')
    }, 2500)
  }

  const onKeyDownHandler = (
    event: React.KeyboardEvent<HTMLDivElement>,
    playerPosition: number
  ) => {
    if (freezePlayer) return
    switch (event.code) {
      case 'ArrowDown':
        if (invalidGoDown(playerPosition)) return
        if (checkEncounterWithFoe(goDown(playerPosition))) {
          return battleWithFoe(foePokemonsWithPositions[goDown(playerPosition)])
        }
        socket.emit('update_player_position', {
          trainerName: trainer.name,
          newPosition: goDown(playerPosition),
        })
        break
      case 'ArrowRight':
        if (invalidGoRight(playerPosition)) return
        if (checkEncounterWithFoe(goRight(playerPosition))) {
          return battleWithFoe(
            foePokemonsWithPositions[goRight(playerPosition)]
          )
        }
        socket.emit('update_player_position', {
          trainerName: trainer.name,
          newPosition: goRight(playerPosition),
        })
        break
      case 'ArrowUp':
        if (invalidGoUp(playerPosition)) return
        if (checkEncounterWithFoe(goUp(playerPosition))) {
          return battleWithFoe(foePokemonsWithPositions[goUp(playerPosition)])
        }
        socket.emit('update_player_position', {
          trainerName: trainer.name,
          newPosition: goUp(playerPosition),
        })
        break
      case 'ArrowLeft':
        if (invalidGoLeft(playerPosition)) return
        if (checkEncounterWithFoe(goLeft(playerPosition))) {
          return battleWithFoe(foePokemonsWithPositions[goLeft(playerPosition)])
        }
        socket.emit('update_player_position', {
          trainerName: trainer.name,
          newPosition: goLeft(playerPosition),
        })
        break
      default:
        break
    }
  }

  return (
    <Box
      bg="blue.100"
      h="500px"
      p={12}
      tabIndex={0}
      position="relative"
      onKeyDown={(e) => onKeyDownHandler(e, me?.position)}
      ref={gameBoardRef}
    >
      <Grid
        templateRows={`repeat(${GRID_ROWS}, 1fr)`}
        templateColumns={`repeat(${GRID_COLUMNS}, 1fr)`}
      >
        {Array.from(Array(600).keys()).map((_, idx) => (
          <GridItem
            key={idx}
            w="100%"
            h="5"
            bg="#99EE99"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {!!onlinePlayers?.find((player) => player.position === idx) ? (
              <Player />
            ) : null}
            {foePokemonPositions.includes(idx) ? (
              <FoePokemon
                image={foePokemonsWithPositions[idx].image}
                name={foePokemonsWithPositions[idx].name}
              />
            ) : null}
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

export default Game
