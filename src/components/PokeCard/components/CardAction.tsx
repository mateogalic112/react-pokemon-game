import { Flex, Button, Center, Text } from '@chakra-ui/react'
import { Move } from '../../../models/Pokemon'

interface ICardActionProps {
  moves: Move[]
  attack: (move: Move) => void
  active: boolean
}

const CardAction = ({ moves, attack, active }: ICardActionProps) => {
  return (
    <Flex color="white" gap="1rem" flexWrap="wrap">
      {moves.map((move) => (
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
  )
}

export default CardAction
