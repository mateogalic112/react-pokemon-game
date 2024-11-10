export interface PokeApiResults {
  count: number;
  next: string;
  previous: null;
  results: Array<{ name: string; url: string }>;
}

export interface PokeApiPokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  stats: [
    {
      base_stat: number;
      stat: {
        name: string;
        url: string;
      };
    }
  ];
  types: [
    {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }
  ];
  moves: [
    {
      move: {
        name: string;
      };
    }
  ];
}
