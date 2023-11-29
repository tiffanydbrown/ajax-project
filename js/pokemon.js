function getPokemonData(name) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=151/');
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    console.log(xhr.response);
    const genOne = xhr.response;
    console.log('xhr', genOne.results);
    for (let i = 0; i < genOne.results.length; i++) {
      const xhr2 = new XMLHttpRequest();
      xhr2.open('GET', `${genOne.results[i].url}`);
      xhr2.responseType = 'json';
      xhr2.addEventListener('load', function () {
        console.log('xh2', xhr2.response);
        const $rowPokemon = document.querySelector('.row-pokemon');
        $rowPokemon.appendChild(renderPokemon(xhr2.response));
      });
      xhr2.send();
    }
  });
  xhr.send();
}

getPokemonData('bulbasaur');

function renderPokemon(pokemon) {
  const $colDiv = document.createElement('div');
  $colDiv.setAttribute('class', 'column-one-fifth');

  const $pcDiv = document.createElement('div');
  $pcDiv.setAttribute('class', 'pokemon-card');

  const $pokeImage = document.createElement('img');
  $pokeImage.setAttribute('src', pokemon.sprites.front_default);

  const $pokeText = document.createElement('div');
  $pokeText.setAttribute('class', 'pokemon-card-text');

  const $name = document.createElement('h2');
  $name.textContent = pokemon.name;

  const $number = document.createElement('h3');
  $number.textContent = '#' + pokemon.id;

  const $experience = document.createElement('p');
  $experience.textContent = pokemon.base_experience;

  $colDiv.appendChild($pcDiv);
  $pcDiv.appendChild($pokeImage);
  $pcDiv.appendChild($pokeText);
  $pokeText.appendChild($name);
  $pokeText.appendChild($number);
  $pokeText.appendChild($experience);

  return $colDiv;
}
