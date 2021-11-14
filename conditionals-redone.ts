import axios from "axios";

interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

function fetchPokemon(url: string, cb: (data: PokemonResults) => void): void;

function fetchPokemon(url: string): Promise<PokemonResults>;

function fetchPokemon(
  url: string,
  cb?: (data: PokemonResults) => void
): unknown {
  console.log({ url });
  if (cb) {
    axios
      .get(url)
      .then((resp) => {
        return resp.data;
      })
      .then(cb);
    return undefined;
  } else {
    return axios.get(url).then((resp) => resp.data);
  }
}

fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10", (data) => {
  data.results.forEach((pokemon) => console.log(pokemon.name));
});

(async function () {
  const data = await fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10");
  data.results.forEach((pokemon) => console.log(pokemon.name));
})();
