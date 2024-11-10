import { VStack, Text, HStack } from "@chakra-ui/react";
import ChooseCard from "./ChooseCard";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { useCreatePokemon } from "../../api/pokemons/use-create-pokemon";
import { Pokemon } from "@/models/Pokemon";
import { useGetPokeTrainer } from "@/api/trainer/use-get-poke-trainer";
import { useGetPokemons } from "@/api/pokemons/use-get-pokemons";

const Home = () => {
  const assignPokemon = useCreatePokemon();
  const initialPokemonResults = useGetPokemons([1, 4, 7]);
  const trainer = useGetPokeTrainer();

  let navigate = useNavigate();
  // navigate before chance to paint the screen
  useLayoutEffect(() => {
    if (trainer && trainer.pokemons.length > 0) navigate("/game");
  }, [navigate, trainer]);

  const [message, setMessage] = useState("");
  const onPokemonChoose = async (pokemon: Pokemon): Promise<void> => {
    if (!trainer) return;

    setMessage(`You have choosen ${pokemon.name}`);
    await assignPokemon.mutateAsync({
      hp: pokemon.hp,
      pokemon_id: pokemon.id,
      trainer_id: trainer?.id
    });
    setTimeout(() => {
      navigate("/game");
    }, 1000);
  };

  if (!initialPokemonResults.every(({ data }) => Boolean(data))) return null;
  const pokemons = initialPokemonResults.reduce((acc, { data }) => {
    if (data) {
      acc.push(new Pokemon(data));
    }
    return acc;
  }, [] as Pokemon[]);

  return (
    <VStack minH="60vh" alignItems="stretch" justifyContent="space-between">
      <div />

      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        {message ? message : "Welcome to Pokemon"}
      </Text>

      <HStack wrap="wrap" justifyContent="space-around">
        {pokemons.map((pokemon) => (
          <ChooseCard
            key={pokemon.id}
            src={pokemon.image}
            alt={pokemon.name}
            onClick={() => onPokemonChoose(pokemon)}
          />
        ))}
      </HStack>
    </VStack>
  );
};

export default Home;
