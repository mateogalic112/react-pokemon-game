import { Box, Grid, GridItem } from '@chakra-ui/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import Player from './Player'
import FoePokemon from './FoePokemon'
import { useFetchInitialPokemons } from '../../api/pokemons/useFetchInitialPokemons'
import Pokemon from '../../models/Pokemon'

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
  const [playerPosition, setPlayerPosition] = useState(10)

  const foePokemonsResult = useFetchInitialPokemons([10, 40, 70])
  const foePokemons = useMemo(
    () =>
      foePokemonsResult?.map((item) => {
        if (item?.data) {
          return new Pokemon(item?.data)
        }
        return undefined
      }) || [],
    [foePokemonsResult]
  )

  const gameBoardRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (foePokemons.every(Boolean)) {
      gameBoardRef.current.focus()
    }
  }, [foePokemons])
  console.log({ foePokemons })

  if (foePokemons.some((p) => typeof p === 'undefined')) return <h1>Hello</h1>

  const foePokemonsWithPositions: Record<number, Pokemon> = foePokemons.reduce(
    (acc, foe, idx) => {
      return {
        ...acc,
        [24 * (idx + 1)]: foe,
      }
    },
    {}
  )

  const foePositions = Array.from(Object.keys(foePokemonsWithPositions)).map(
    Number
  )

  const checkEncounterWithFoe = (position: number): boolean => {
    if (foePositions.includes(position)) {
      return true
    }
    return false
  }

  if (!foePokemons) return null

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case 'ArrowDown':
        if (invalidGoDown(playerPosition)) return
        if (checkEncounterWithFoe(goDown(playerPosition))) {
          console.log('Foe')
          return
        }
        setPlayerPosition(goDown(playerPosition))
        break
      case 'ArrowRight':
        if (invalidGoRight(playerPosition)) return
        if (checkEncounterWithFoe(goRight(playerPosition))) {
          console.log('Foe')
          return
        }
        setPlayerPosition(goRight(playerPosition))
        break
      case 'ArrowUp':
        if (invalidGoUp(playerPosition)) return
        if (checkEncounterWithFoe(goUp(playerPosition))) {
          console.log('Foe')
          return
        }
        setPlayerPosition(goUp(playerPosition))
        break
      case 'ArrowLeft':
        if (invalidGoLeft(playerPosition)) return
        if (checkEncounterWithFoe(goLeft(playerPosition))) {
          console.log('Foe')
          return
        }
        setPlayerPosition(goLeft(playerPosition))
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
      onKeyDown={onKeyDownHandler}
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
            {idx === playerPosition ? <Player /> : null}
            {foePositions.includes(idx) ? (
              <FoePokemon
                image={foePokemonsWithPositions[idx].getImage()}
                name={foePokemonsWithPositions[idx].getName()}
              />
            ) : null}
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

export default Game
