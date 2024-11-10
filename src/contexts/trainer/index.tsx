import { createContext, FC, PropsWithChildren, useContext, useEffect, useReducer } from "react";
import { useCreatePokemon } from "../../api/pokemons/use-create-pokemon";
import PokeTrainerActionKind from "./actions";
import pokeTrainerReducer from "./reducer";
import { Trainer } from "@/models/PokeTrainer";
import { Pokemon } from "@/models/Pokemon";
import { useUpdatePokeballs } from "@/api/trainer/use-update-pokeballs";
import { useGetMe } from "@/api/auth/use-get-me";

export type TrainerState = {
  trainer: Trainer | null;
};

interface ITrainerContext {
  trainer: Trainer | null;
  catchPokemon: (pokemon: Pokemon, isCaught: boolean) => Promise<string>;
}

const initialContext: ITrainerContext = {
  trainer: null,
  catchPokemon: async () => ""
};

const PokeTrainerContext = createContext<ITrainerContext>(initialContext);

export const PokeTrainerProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: apiTrainer } = useGetMe();

  const [{ trainer }, dispatch] = useReducer(pokeTrainerReducer, {
    trainer: null
  });

  const capturePokemon = useCreatePokemon();
  const updatePokeballs = useUpdatePokeballs();

  const trainerPokemonResults = useGetTrainerPokemons(queryTrainer);

  const catchPokemon = async (pokemon: Pokemon, isCaught: boolean) => {
    const currentPokeballCount = trainer.throwPokeball();
    if (!currentPokeballCount) {
      return "You ran out of pokeballs!";
    }
    await updatePokeballs.mutateAsync(currentPokeballCount);

    if (isCaught) {
      await capturePokemon.mutateAsync({
        hp: pokemon.hp,
        pokemonID: pokemon.id,
        pokeTrainerId: trainer.id
      });

      return `You caught ${pokemon.name}!`;
    }

    return `${pokemon.name} escaped!`;
  };

  return (
    <PokeTrainerContext.Provider value={{ trainer, catchPokemon }}>
      {children}
    </PokeTrainerContext.Provider>
  );
};

export const usePokeTrainerContext = () => {
  const context = useContext(PokeTrainerContext);

  if (!context) {
    throw new Error("Context must be within PokeTrainer.Provider!");
  }

  return context;
};
