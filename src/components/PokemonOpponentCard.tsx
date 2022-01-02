import { Box, Image, Badge, Flex, Center, Text, Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import { IPokemonCard } from './PokemonCard'

const PokemonOpponentCard = ({
  pokemon,
  attack,
  hp,
  active,
  struggle,
}: IPokemonCard) => {
  const randomMoveIndex = Math.round(Math.random() * 3)

  useEffect(() => {
    if (!active) return

    setTimeout(() => {
      attack(pokemon.getMoves()[randomMoveIndex])
    }, 2000)
  }, [active])

  return (
    <Box maxW="sm" py={3}>
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
      </Box>

      <Image
        className={`opponentPokemon ${struggle ? 'struggle' : ''}`}
        boxSize="120px"
        margin="auto"
        src={pokemon.getImage()}
        alt={pokemon.getName()}
        my="2"
      />
    </Box>
  )
}

export default PokemonOpponentCard
