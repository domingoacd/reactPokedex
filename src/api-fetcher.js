const api = {
  getAllPokemons: async function() {
    const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(res => res.json())
    return pokemons;
  },
  getAllTypes: async function() {
    const types = await fetch('https://pokeapi.co/api/v2/type')
      .then(res => res.json());
    return types;
  },
  getPokemonDataToCard: async function() {

  },
  getPokemonsByType: async function(type) {
    const pokemonsByType = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then(res => res.json());
      
      
      return pokemonsByType
  }
}

export default api;