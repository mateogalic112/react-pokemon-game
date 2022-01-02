import React from 'react'
import { Flex, Image, Button, Box } from '@chakra-ui/react'

interface IBattlefieldSidebarProps {
  pokeBallsCount: number
  onPokeballThrow: () => void
  pokeballActive: boolean
  messages: string[]
}

const Sidebar = ({
  pokeBallsCount,
  onPokeballThrow,
  pokeballActive,
  messages,
}: IBattlefieldSidebarProps) => {
  return (
    <Flex
      direction="column"
      py={10}
      px={6}
      background="blue.200"
      borderRadius="3rem"
      flexBasis="40%"
      maxH="100vh"
      overflow="auto"
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

      <Box height={5} />

      {messages.map((message, index) => (
        <React.Fragment key={index}>
          <p>{message}</p>
          <Box mb="4" />
        </React.Fragment>
      ))}
    </Flex>
  )
}

export default Sidebar
