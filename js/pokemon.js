const $pokedexView = document.querySelector('.pokedex-view');
const $modalView = document.querySelector('.modal-view');
const $favoriteView = document.querySelector('.favorite-view');

function getPokemonData() {
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

getPokemonData();

function renderPokemon(pokemon) {
  const $colDiv = document.createElement('div');
  $colDiv.setAttribute('class', 'column-one-fifth');
  $colDiv.setAttribute('data-name', pokemon.name);

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

  $colDiv.addEventListener('click', (event) => {
    const $clickedCard = event.target.closest('.column-one-fifth');
    const $modalCard = $clickedCard.getAttribute('data-name');

    let clickedID;
    const cardID = event.target.id;
    clickedID = pokemon.id;

    getPokemonModalData(pokemon.id);

    viewSwap('modal-view');
  });

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

function getPokemonModalData(id) {
  const xhr5 = new XMLHttpRequest();
  xhr5.open('GET', `https://pokeapi.co/api/v2/pokemon/${id}`);
  xhr5.responseType = 'json';

  xhr5.addEventListener('load', function () {
    const genOne3 = xhr5.response;

    const $modalContainer = document.querySelector('.modal-container');
    $modalContainer.appendChild(renderPokemonStatusCard(genOne3));
  });
  xhr5.send();
}

function renderPokemonStatusCard(pokemon) {
  const $rowModal = document.createElement('div');
  $rowModal.setAttribute('class', 'row-modal');
  $rowModal.setAttribute('data-name', pokemon.name);

  const $cardDiv = document.createElement('div');
  $cardDiv.setAttribute('class', 'card-column-one-half');

  const $pscDiv = document.createElement('div');
  $pscDiv.setAttribute('class', 'pokemon-status-card');

  const $cardName = document.createElement('p');
  $cardName.textContent = pokemon.name;

  const $cardNumber = document.createElement('p');
  $cardNumber.textContent = '#' + pokemon.id;

  const $pokeCardImage = document.createElement('img');
  $pokeCardImage.setAttribute('src', pokemon.sprites.front_default);

  const $favorite = document.createElement('i');
  $favorite.setAttribute('class', 'fa-regular fa-heart');
  $favorite.setAttribute('id', 'likes');

  const $cardStats = document.createElement('p');
  $cardStats.textContent = pokemon.stats[0].base_stat + ' HP';

  const $cardDiv2 = document.createElement('div');
  $cardDiv2.setAttribute('class', 'card-column-one-half');

  const $pokeCardText2 = document.createElement('div');
  $pokeCardText2.setAttribute('class', 'pokemon-card-text2');

  const $cardType = document.createElement('p');
  $cardType.textContent = 'Type: ' + pokemon.types[0].type.name;

  const $cardMoves = document.createElement('p');
  $cardMoves.textContent = 'Moves: ' + pokemon.moves[0].move.name;

  const $cardHeight = document.createElement('p');
  $cardHeight.textContent = 'Height: ' + pokemon.height;

  const $cardWeight = document.createElement('p');
  $cardWeight.textContent = 'Weight: ' + pokemon.weight;

  const $cardAbilities = document.createElement('p');
  $cardAbilities.textContent = 'Ability: ' + pokemon.abilities[0].ability.name;

  $rowModal.appendChild($cardDiv);
  $cardDiv.appendChild($pscDiv);
  $pscDiv.appendChild($cardName);
  $pscDiv.appendChild($cardNumber);
  $pscDiv.appendChild($pokeCardImage);
  $pscDiv.appendChild($favorite);
  $pscDiv.appendChild($cardStats);
  $rowModal.appendChild($cardDiv2);
  $cardDiv2.appendChild($pokeCardText2);
  $pokeCardText2.appendChild($cardType);
  $pokeCardText2.appendChild($cardMoves);
  $pokeCardText2.appendChild($cardHeight);
  $pokeCardText2.appendChild($cardWeight);
  $pokeCardText2.appendChild($cardAbilities);

  let click = 0;

  $favorite.addEventListener('click', (event) => {
    click++;
    if (click % 2 === 0) {
      $favorite.className = 'fa-regular fa-heart';
      removeFromFavorites(pokemon.id);
    } else if (click % 2 === 1) {
      $favorite.className = 'fa-solid fa-heart';
      addToFavorites(pokemon);
    }
  });
  function addToFavorites(pokemon) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(pokemon);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  function removeFromFavorites(pokemonId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter((pokemon) => pokemon.id !== pokemonId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  return $rowModal;
}

function viewSwap(viewName) {
  if (viewName === 'modal-view') {
    $pokedexView.classList.add('hidden');
    $modalView.classList.remove('hidden');
  } else {
    $modalView.classList.add('hidden');
    $pokedexView.classList.remove('hidden');
  }
}

const $exitButton = document.querySelector('.exit');

$exitButton.addEventListener('click', (event) => {
  if (event.target.matches('.exit')) {
    const $rowModal = document.querySelector('.row-modal');

    if ($rowModal) {
      $rowModal.remove();
      viewSwap('pokedex-view');
    }
  }
});

function favoriteViewSwap(viewName) {
  if (viewName === 'favorite-view') {
    $pokedexView.classList.add('hidden');
    $favoriteView.classList.remove('hidden');
  } else {
    $favoriteView.classList.add('hidden');
    $pokedexView.classList.remove('hidden');
  }
}

const $heartIcon = document.querySelector('#favoriteHeart');

$heartIcon.addEventListener('click', (event) => {
  if (event.target.matches('#favoriteHeart')) {
    favoriteViewSwap('favorite-view');
    renderFavoritePokemon();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const $favoritesBottom = document.querySelector('.favorite-container');
  const $favoritesModal = document.querySelector('.modal-container');

  if ($favoritesBottom) {
    $favoritesBottom.classList.add('hide-favorites');
  }

  if ($favoritesModal) {
    $favoritesModal.classList.add('hide-favorites');
  }

  renderFavoritePokemon();
});

function renderFavoritePokemon() {
  const currentView = document.querySelector('.favorite-view');
  if (!currentView) return;

  const $favoriteContainer = document.querySelector('.favorite-container');
  $favoriteContainer.innerHTML = '';

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  for (let i = 0; i < favorites.length; i++) {
    const favoriteData = favorites[i];
    const $cardDiv = renderPokemonFavorites(favoriteData);

    $cardDiv.classList.add('column-one-fifth');

    $favoriteContainer.appendChild($cardDiv);
  }
}

function renderPokemonFavorites(pokemon) {
  const $colDiv = document.createElement('div');
  $colDiv.setAttribute('class', 'column-one-fifth');
  $colDiv.setAttribute('data-name', pokemon.name);

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

  $colDiv.addEventListener('click', (event) => {
    const $clickedCard = event.target.closest('.column-one-fifth');
    const pokemonId = $clickedCard.getAttribute('data-name'); // Ensure this is the correct attribute

    getPokemonModalData(pokemonId);

    viewSwap('modal-view');
  });
  return $colDiv;
}
