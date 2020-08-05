const api = {
  getAllPokemons: async function() {
    const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(res => res.json())
    return pokemons;
  }
}

export default api;