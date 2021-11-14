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

type FetchPokemonResult<T> = T extends undefined
  ? Promise<PokemonResults[]>
  : void;

function fetchPokemon<T extends undefined | ((data: PokemonResults) => void)>(
  url: string,
  cb?: T
): FetchPokemonResult<T> {
  console.log({ url });
  if (cb) {
    axios
      .get(url)
      .then((resp) => {
        return resp.data;
      })
      .then(cb);
    return undefined as FetchPokemonResult<T>;
  } else {
    return axios.get(url).then((resp) => resp.data) as FetchPokemonResult<T>;
  }
}

// fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10", (data) => {
//   data.results.forEach((pokemon) => console.log(pokemon.name));
// });

(async function () {
  const data = (await fetchPokemon(
    "https://pokeapi.co/api/v2/pokemon?limit=10"
  )) as unknown as PokemonResults;
  data.results.forEach((pokemon) => console.log(pokemon.name));
})();
