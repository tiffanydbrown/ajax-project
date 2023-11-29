function getPokemonData(name) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=76/');
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    const genOne = xhr.response;

    for (let i = 0; i < genOne.results.length; i++) {
      const xhr2 = new XMLHttpRequest();
      xhr2.open('GET', `${genOne.results[i].url}`);
      xhr2.responseType = 'json';
      xhr2.addEventListener('load', function () {
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
  $experience.textContent = 'Experience: ' + pokemon.base_experience;

  const $species = document.createElement('p');
  $species.textContent = 'Species: ' + pokemon.species.name;

  $colDiv.appendChild($pcDiv);
  $pcDiv.appendChild($pokeImage);
  $pcDiv.appendChild($pokeText);
  $pokeText.appendChild($name);
  $pokeText.appendChild($number);
  $pokeText.appendChild($experience);
  $pokeText.appendChild($species);

  return $colDiv;
}

const $button = document.querySelector('.load');

$button.addEventListener('click', (event) => {
  if (event.target.matches('.load')) {
    const xhr3 = new XMLHttpRequest();
    xhr3.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=76&offset=76/');
    xhr3.responseType = 'json';

    xhr3.addEventListener('load', function () {
      const genOne2 = xhr3.response;

      for (let i = 0; i < genOne2.results.length; i++) {
        const xhr4 = new XMLHttpRequest();
        xhr4.open('GET', `${genOne2.results[i].url}`);
        xhr4.responseType = 'json';
        xhr4.addEventListener('load', function () {
          const $rowPokemon = document.querySelector('.row-pokemon');
          $rowPokemon.appendChild(renderPokemon(xhr4.response));
        });
        xhr4.send();
      }
    });
    xhr3.send();
  }
});
