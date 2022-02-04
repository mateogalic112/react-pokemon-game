import { Button, Flex, Image, Box } from '@chakra-ui/react'

interface IPokedexProps {
  onPokedexClick: () => void
  isDisabled: boolean
  pokemonImage: string
  pokemonName: string
  isSpeaking: boolean
}

const Pokedex = ({ onPokedexClick, isDisabled, isSpeaking, pokemonImage, pokemonName }: IPokedexProps) => {
  const className = ['pokedex']

  switch (true) {
    case isSpeaking:
      className.push('speaking')
      break
    default:
      break
  }

  return (
    <>
      <Button display='block' ml='auto' mb='4' alignSelf='flex-end' onClick={onPokedexClick} disabled={isDisabled}>
        Pokedex
      </Button>

      <Flex gap="0.25rem" alignItems="center" className={className.join(' ')}>
        <Image src="/pokedex.png" alt="Pokedex" w={80} />
        <Box pos="absolute" top="25%" left="0" w={40} h={20}>
          <Image transform='translate(110%, 40%)' w='50px' h='50px' src={pokemonImage} alt={pokemonName} />
        </Box>
      </Flex>
    </>
  )
}

export default Pokedex