function getPokemonData(name) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/');
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    console.log(xhr.response);
    const genOne = xhr.response;

    const xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'https://pokeapi.co/api/v2/pokemon/1/');
    xhr2.responseType = 'json';

    xhr2.addEventListener('load', function () {
      const $rowPokemon = document.querySelector('.row-pokemon');
      console.log(xhr2.response);

      for (let i = 0; i < xhr2.response.length; i++) {
        const $pokemon = renderPokemon(xhr2.response[i]);
        $rowPokemon.appendChild($pokemon);
      }
    });
    xhr2.send();
  });
  xhr.send();
}

getPokemonData('bulbasaur');

function renderPokemon(pokemon) {
  const $colDiv = document.createElement('div');
  $colDiv.setAttribute('class', 'column-one-fifth');

  const $pcDiv = document.createElement('div');
  $pcDiv.setAttribute('class', 'pokemon-card');

  const $pokeImage = document.createElement('image');
  $pokeImage.setAttribute('src', pokemon.sprites.front_default);

  const $pokeText = document.createElement('div');
  $pokeText.setAttribute('class', 'pokemon-card-text');

  const $name = document.createElement('h2');
  $name.textContent = pokemon.name;

  const $number = document.createElement('h3');
  $number.textContent = '#' + pokemon.id;

  // const $description = document.createElement('p');
  // $description.textContent = pokemon.description;

  $colDiv.appendChild($pcDiv);
  $pcDiv.appendChild($pokeImage);
  $pcDiv.appendChild($pokeText);
  $pokeText.appendChild($name);
  $pokeText.appendChild($number);
  // $pokeText.appendChild($description);

  return $colDiv;
}
