import { Box, Image, Badge, Flex, Center, Text, Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import Pokemon, { Move } from '../models/Pokemon'

const PokemonOpponentCard = ({
  pokemon,
  attack,
  hp,
  active,
}: {
  pokemon: Pokemon
  attack: (move: Move) => void
  hp: number
  active: boolean
}) => {
  const randomMoveIndex = Math.round(Math.random() * 3)

  useEffect(() => {
    if (!active) return

    setTimeout(() => {
      attack(pokemon.moves[randomMoveIndex])
    }, 2000)
  }, [active])

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" py={3}>
      <Box px="6" py="1">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {pokemon.name.toUpperCase()}
        </Box>

        <Flex color="white" gap="1rem" flexWrap="wrap" mb={4}>
          <Center
            minW="60px"
            py={1}
            px={2}
            flexDirection="column"
            borderRadius="10px"
          >
            <Text color="gray.700">HP</Text>
            <Text color="black" size="xl">
              <b>{hp}</b>
            </Text>
          </Center>
          {pokemon
            .getStats()
            .slice(1)
            .map((stat) => (
              <Center
                minW="60px"
                py={1}
                px={2}
                flexDirection="column"
                borderRadius="10px"
                key={stat.name}
              >
                <Text color="gray.700">{stat.name.toUpperCase()}</Text>
                <Text color="black" size="xl">
                  <b>{stat.amount}</b>
                </Text>
              </Center>
            ))}
        </Flex>

        <Flex color="white" gap="1rem" flexWrap="wrap" display={'none'}>
          {pokemon
            .getMoves()
            .slice(0, 3)
            .map((move) => (
              <Button
                key={move.name}
                bg="gray.500"
                py={6}
                onClick={() => attack(move)}
                disabled={!active}
              >
                <Center flexDirection="column">
                  <Text>{move.name.toUpperCase()}</Text>
                  <Text color="black" size="xl">
                    <b>{move.damage}</b>
                  </Text>
                </Center>
              </Button>
            ))}
        </Flex>
      </Box>

      <Image
        boxSize="120px"
        margin="auto"
        src={pokemon.image}
        alt={pokemon.name}
      />
    </Box>
  )
}

export default PokemonOpponentCard