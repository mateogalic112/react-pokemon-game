import React, { FC } from 'react'
import { Flex, Image, Button, Box } from '@chakra-ui/react'
import { usePokeTrainerContext } from '../../contexts/poke-trainer'
import { useBattleContext } from '../../contexts/battle'

interface IBattlefieldSidebarProps {}

const Sidebar: FC<IBattlefieldSidebarProps> = ({ children }) => {
  const { trainer } = usePokeTrainerContext()
  const { animations, battleMessages, onPokeballThrow } = useBattleContext()
  const isActive =
    !animations.pokemonAttackActive &&
    !animations.pokemonDamageActive &&
    !animations.pokeballActive

  return (
    <Box
      py={10}
      px={6}
      background="blue.200"
      borderRadius="3rem"
      flexBasis="40%"
      maxH="100vh"
      overflow="auto"
      pointerEvents={isActive ? 'auto' : 'none'}
    >
      <Flex gap="3rem" mb={8} justifyContent="space-between">
        <Flex gap="0.25rem" alignItems="center">
          <Image src="/pokeball.png" alt="Pokeball" w={10} />
          <b>{trainer.pokeballs}</b>
        </Flex>
        <Button
          onClick={onPokeballThrow}
          disabled={animations.pokeballActive || trainer.pokeballs === 0}
        >
          Throw pokeball
        </Button>
        <Image
          boxSize="30px"
          objectFit="cover"
          src="/pokeball.png"
          alt="Pokeball"
          className={`pokeball ${animations.pokeballActive ? 'thrown' : ''}`}
        />
      </Flex>

      {children}

      <Box height={5} />

      {battleMessages.map((message, index) => (
        <React.Fragment key={index}>
          <p>{message}</p>
          <Box mb="4" />
        </React.Fragment>
      ))}
    </Box>
  )
}

export default Sidebar
