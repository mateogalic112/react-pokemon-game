import { useGetPokeTrainer } from "@/api/trainer/use-get-poke-trainer";
import { Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Pokedex = () => {
  let navigate = useNavigate();
  const trainer = useGetPokeTrainer();

  useEffect(() => {
    setTimeout(() => {
      navigate("/game");
    }, 1000);
  });

  if (!trainer) return null;

  return (
    <section>
      <Heading>Pokedex</Heading>

      <Text>My pokemons</Text>

      <VStack>
        {trainer.pokemons.map((pokemon) => (
          <Heading key={pokemon.id}>{pokemon.name}</Heading>
        ))}
      </VStack>
    </section>
  );
};

export default Pokedex;
