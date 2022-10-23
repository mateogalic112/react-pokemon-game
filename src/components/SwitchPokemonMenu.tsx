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
import { usePokeTrainerContext } from '../contexts/poke-trainer'
import Pokemon from '../models/Pokemon'

interface ISwitchPokemonMenuProps {
  activePokemonId: number
  selectPokemon: (pokemon: Pokemon) => void
}

const SwitchPokemonMenu = ({
  activePokemonId,
  selectPokemon,
}: ISwitchPokemonMenuProps) => {
  const { trainer } = usePokeTrainerContext()

  // Calculate available pokemons
  const availablePokemons = trainer.pokemons.filter(
    (item) => item.id !== activePokemonId
  )

  if (!availablePokemons.length) return null

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Switch pokemon
      </MenuButton>
      <MenuList>
        {availablePokemons.map((pokemon) => (
          <MenuItem key={pokemon.id} onClick={() => selectPokemon(pokemon)}>
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
