import { Box, Center, Flex, Text } from '@chakra-ui/react'
import { Stat } from '../../../models/Pokemon'

interface ICardStatsProps {
  title: string
  stats: Stat[]
  hp: number
  children: React.ReactNode | null
}

const CardStats = ({ title, stats, hp, children }: ICardStatsProps) => {
  return (
    <Box
      px="6"
      pt="2"
      pb="4"
      border="1px"
      borderColor="gray.400"
      borderRadius="lg"
    >
      <Box
        my="1"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        isTruncated
        fontSize={20}
      >
        {title.toUpperCase()}
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
        {stats.map((stat) => (
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

      {children}
    </Box>
  )
}

export default CardStats
