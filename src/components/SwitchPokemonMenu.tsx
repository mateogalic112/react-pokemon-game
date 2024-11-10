import { Button, Menu, MenuButton, MenuList, MenuItem, Image, Box, Text } from "@chakra-ui/react";
import { useBattleContext } from "../contexts/battle";
import { useGetPokeTrainer } from "@/api/trainer/use-get-poke-trainer";

const SwitchPokemonMenu = () => {
  const trainer = useGetPokeTrainer();

  const { switchPokemon, pokemon } = useBattleContext();

  const availablePokemons = trainer?.pokemons.filter((item) => item.id !== pokemon?.id);

  if (!availablePokemons) return null;

  return (
    <Menu>
      <MenuButton as={Button}>Switch pokemon</MenuButton>
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
  );
};

export default SwitchPokemonMenu;
