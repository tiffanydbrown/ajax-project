function getPokemonData(pokemon) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/');
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
    const genOne = xhr.response;

    for (let i = 0; i < genOne.length; i++) {
      const $pokemon = genOne[i];
      const $row = document.querySelector('.row');
      $row.appendChild($pokemon);
    }
  });
  xhr.send();

  const $colDiv = document.createElement('div');
  $colDiv.setAttribute('class', 'column-one-fifth');

  const $pcDiv = document.createElement('div');
  $pcDiv.setAttribute('class', 'pokemon-card');

  const $pokeImage = document.createElement('image');
  $pokeImage.setAttribute('src', pokemon.imageURl);

  const $pokeText = document.createElement('div');
  $pokeText.setAttribute('class', 'pokemon-card-text');

  const $name = document.createElement('h2');
  $name.textContent = pokemon.name;

  const $number = document.createElement('h3');
  $number.textContent = '#' + pokemon.number;

  const $description = document.createElement('p');
  $description.textContent = pokemon.description;

  $colDiv.appendChild($pcDiv);
  $pcDiv.appendChild($pokeImage);
  $pcDiv.appendChild($pokeText);
  $pokeText.appendChild($name);
  $pokeText.appendChild($number);
  $pokeText.appendChild($description);

  return $colDiv;
}

getPokemonData('bulbasaur');
