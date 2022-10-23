import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Box,
  Text,
} from '@chakra-ui/react'
import { useBattleContext } from '../contexts/battle'
import { usePokeTrainerContext } from '../contexts/poke-trainer'

const SwitchPokemonMenu = () => {
  const { trainer } = usePokeTrainerContext()
  const { switchPokemon, pokemon } = useBattleContext()

  const availablePokemons = trainer.pokemons.filter(
    (item) => item.id !== pokemon.id
  )

  if (!availablePokemons.length) return null

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Switch pokemon
      </MenuButton>
      <MenuList>
        {availablePokemons.map((pokemon) => (
          <MenuItem key={pokemon.id} onClick={() => switchPokemon(pokemon)}>
            <Image w="40px" src={pokemon.image} alt={pokemon.name} />

            <Box mr={3} />

            <Text>{pokemon.id}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default SwitchPokemonMenu
