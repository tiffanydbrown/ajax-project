/* exported data */
let data = [];

window.addEventListener('beforeunload', (event) => {
  const pokemonJSON = JSON.stringify(pokemon);
  localStorage.setItem('ajax-project', pokemonJSON);
});

const previousPokemonJSON = localStorage.getItem('ajax-project');
if (previousPokemonJSON !== null) {
  pokemon = JSON.parse(previousPokemonJSON);
}
