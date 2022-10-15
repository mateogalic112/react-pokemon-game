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
import Pokemon from '../models/Pokemon'

interface ISwitchPokemonMenuProps {
  title: string
  pokemons: Pokemon[]
  selectPokemon: (pokemon: Pokemon) => void
}

const SwitchPokemonMenu = ({
  title,
  pokemons,
  selectPokemon,
}: ISwitchPokemonMenuProps) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {title}
      </MenuButton>
      <MenuList>
        {pokemons.map((pokemon) => (
          <MenuItem key={pokemon.id} onClick={() => selectPokemon(pokemon)}>
            <Image w="40px" src={pokemon.image} alt={pokemon.name} />

            <Box mr={3} />

            <Text>{pokemon.name}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default SwitchPokemonMenu
