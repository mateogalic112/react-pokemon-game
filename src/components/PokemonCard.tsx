import { Box, Image, Badge, Flex, Center, Text } from '@chakra-ui/react'
import Pokemon from '../models/Pokemon'

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <Box maxW="xs" borderWidth="1px" borderRadius="lg" py={3}>
      <Image
        boxSize="120px"
        margin="auto"
        src={pokemon.image}
        alt={pokemon.name}
      />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          ></Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {pokemon.name.toUpperCase()}
        </Box>

        <Flex color="white" gap="1rem" flexWrap="wrap">
          {pokemon.getStats().map((stat) => (
            <Center
              minW="60px"
              py={1}
              px={2}
              bg="green.600"
              flexDirection="column"
              borderRadius="10px"
              key={stat.name}
            >
              <Text>{stat.name.toUpperCase()}</Text>
              <Text color="black" size="xl">
                <b>{stat.amount}</b>
              </Text>
            </Center>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export default PokemonCard
