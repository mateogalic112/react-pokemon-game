import { Box, Image, Flex, Center, Text, Button } from '@chakra-ui/react'
import Pokemon, { Move } from '../models/Pokemon'

export interface IPokemonCard {
  pokemon: Pokemon
  attack: (move: Move) => void
  hp: number
  active: boolean
  struggle: boolean
}

const PokemonCard = ({
  pokemon,
  attack,
  hp,
  active,
}: Omit<IPokemonCard, 'struggle'>) => {
  return (
    <Box maxW="sm" py={3}>
      <Image
        boxSize="120px"
        margin="auto"
        my="2"
        src={pokemon.getImage()}
        alt={pokemon.getName()}
      />

      <Box px="6" py="2" border="1px" borderColor="gray.400" borderRadius="lg">
        <Box
          my="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
          fontSize={20}
        >
          {pokemon.getName().toUpperCase()}
        </Box>

        <Flex color="white" gap="1rem" flexWrap="wrap" mb={4}>
          <Center
            minW="50px"
            flexDirection="column"
            borderRadius="5px"
            borderRight="1px"
            borderRightColor="gray.400"
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
                minW="40px"
                py={1}
                px={2}
                flexDirection="column"
                borderRadius="5px"
                key={stat.name}
                borderRight="1px"
                borderRightColor="gray.400"
              >
                <Text color="gray.700">{stat.name.toUpperCase()}</Text>
                <Text color="black" size="xl">
                  <b>{stat.amount}</b>
                </Text>
              </Center>
            ))}
        </Flex>

        <Flex color="white" gap="1rem" flexWrap="wrap">
          {pokemon
            .getMoves()
            .slice(0, 6)
            .map((move) => (
              <Button
                key={move.name}
                boxShadow="xs"
                p="2"
                rounded="md"
                bg="gray.100"
                py={6}
                onClick={() => attack(move)}
                disabled={!active}
              >
                <Center color="black" flexDirection="column">
                  <Text fontSize={13}>{move.name.toUpperCase()}</Text>
                </Center>
              </Button>
            ))}
        </Flex>
      </Box>
    </Box>
  )
}

export default PokemonCard
