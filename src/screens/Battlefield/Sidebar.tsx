import React, { FC } from 'react'
import { Flex, Image, Button, Box } from '@chakra-ui/react'

interface IBattlefieldSidebarProps {
  pokeBallsCount: number
  onPokeballThrow: () => void
  pokeballActive: boolean
  messages: string[]
  isActive: boolean
}

const Sidebar: FC<IBattlefieldSidebarProps> = ({
  pokeBallsCount,
  onPokeballThrow,
  pokeballActive,
  messages,
  children,
  isActive,
}) => {
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
          <b>{pokeBallsCount}</b>
        </Flex>
        <Button onClick={onPokeballThrow} disabled={pokeballActive}>
          Throw pokeball
        </Button>
        <Image
          boxSize="30px"
          objectFit="cover"
          src="/pokeball.png"
          alt="Pokeball"
          className={`pokeball ${pokeballActive ? 'thrown' : ''}`}
        />
      </Flex>

      {children}

      <Box height={5} />

      {messages.map((message, index) => (
        <React.Fragment key={index}>
          <p>{message}</p>
          <Box mb="4" />
        </React.Fragment>
      ))}
    </Box>
  )
}

export default Sidebar
