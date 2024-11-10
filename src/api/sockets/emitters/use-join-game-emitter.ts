import { Trainer } from "@/models/Trainer";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

interface IJoinGameEmitterProps {
  socket: Socket;
  trainer: Trainer;
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
