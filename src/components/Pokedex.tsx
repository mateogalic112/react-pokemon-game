import { Button, Flex, Image, Box } from '@chakra-ui/react'
import { useSpeechSynthesis } from 'react-speech-kit'
import { useBattleContext } from '../contexts/battle'

const Pokedex = () => {
  const { animations } = useBattleContext()
  const { pokemon } = useBattleContext()

  // Pokedex speak
  const { speak, speaking } = useSpeechSynthesis()
  const onPokedexClick = async () => {
    const text = pokemon.getPokedexData()
    speak({ text })
  }

  return (
    <>
      <Button
        display="block"
        ml="auto"
        mb="4"
        alignSelf="flex-end"
        onClick={onPokedexClick}
        disabled={animations.pokeballActive}
      >
        Pokedex
      </Button>

      <Flex
        gap="0.25rem"
        alignItems="center"
        className={`pokedex ${speaking ? 'speaking' : ''}`}
      >
        <Image src="/pokedex.png" alt="Pokedex" w={80} />
        <Box pos="absolute" top="25%" left="0" w={40} h={20}>
          <Image
            transform="translate(110%, 40%)"
            w="50px"
            h="50px"
            src={pokemon.image}
            alt={pokemon.name}
          />
        </Box>
      </Flex>
    </>
  )
}

export default Pokedex
