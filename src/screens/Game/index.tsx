import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Player from "./Player";

const GRID_ROWS = 20;
const GRID_COLUMNS = 30;

const Game = () => {
  const [position, setPosition] = useState(10);

  const gameBoardRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    gameBoardRef.current.focus();
  }, []);

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case "ArrowDown":
        if (position >= GRID_ROWS * GRID_COLUMNS - 30) return;
        setPosition(position + 30);
        break;
      case "ArrowRight":
        if (position % 30 === 29) return;
        setPosition(position + 1);
        break;
      case "ArrowUp":
        if (position < 30) return;
        setPosition(position - 30);
        break;
      case "ArrowLeft":
        if (position % 30 === 0) return;
        setPosition(position - 1);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      bg="blue.100"
      h="500px"
      p={12}
      tabIndex={0}
      position="relative"
      onKeyDown={onKeyDownHandler}
      ref={gameBoardRef}
    >
      <Grid
        templateRows={`repeat(${GRID_ROWS}, 1fr)`}
        templateColumns={`repeat(${GRID_COLUMNS}, 1fr)`}
      >
        {Array.from(Array(600).keys()).map((_, idx) => (
          <GridItem
            key={idx}
            w="100%"
            h="5"
            bg="#55C233"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {idx === position ? <Player /> : null}
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Game;
