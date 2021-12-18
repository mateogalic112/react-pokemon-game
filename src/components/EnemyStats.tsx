import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'

interface IEnemyStats {
  health: number
  name: string
}

const EnemyStats = ({ health, name }: IEnemyStats) => {
  return (
    <Stat w={200} border="1px solid gray" p={2} borderRadius={10}>
      <StatLabel>Enemy Stats</StatLabel>
      <StatNumber>Health: {health}</StatNumber>
      <StatHelpText>{name}</StatHelpText>
    </Stat>
  )
}

export default EnemyStats
