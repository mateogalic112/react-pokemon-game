import { PokeTrainer } from "@/models/PokeTrainer";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

interface IJoinGameEmitterProps {
  socket: Socket | null;
  trainer: PokeTrainer | null;
}

const useJoinGameEmitter = ({ socket, trainer }: IJoinGameEmitterProps) => {
  useEffect(() => {
    if (!socket || !trainer) return;

    socket.emit("join_game", {
      trainerName: trainer.name,
      pokemonId: trainer.pokemons[0].id
    });
  }, [socket, trainer]);
};

export default useJoinGameEmitter;
