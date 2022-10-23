import { Box, Flex, VStack } from '@chakra-ui/react'
import PokemonCard from '../../components/PokeCard/PokemonCard'
import Sidebar from './Sidebar'
import PokemonOpponentCard from '../../components/PokeCard/PokemonOpponentCard'
import SwitchPokemonMenu from '../../components/SwitchPokemonMenu'
import EscapePopover from '../../components/EscapePopover'
import Pokedex from '../../components/Pokedex'

const Battlefield = () => {
  return (
    <Flex bg="blue.100" p={12} borderRadius="5rem" position="relative">
      <Box flexBasis="60%">
        <PokemonOpponentCard />
        <Box height={5} />
        <PokemonCard />
      </Box>

      <Sidebar>
        <Pokedex />
        <VStack alignItems="flex-end">
          <SwitchPokemonMenu />
          <EscapePopover />
        </VStack>
      </Sidebar>
    </Flex>
  )
}

export default Battlefield
