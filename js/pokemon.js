const $pokedexView = document.querySelector('#pokedex-view');
const $modalView = document.querySelector('#modal-view');

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

// const $pokemonCard = document.querySelector('.pokemon-card');

// $pokemonCard.addEventListener('click', (event) => {
//   if(event.target === pokemon.name) {
//     for (let i = 0; i < pokemon.name.length; i++) {

//     }
//   }
// })

function getPokemonModalData() {
  const xhr5 = new XMLHttpRequest();
  xhr5.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=151');
  xhr5.responseType = 'json';

  xhr5.addEventListener('load', function () {
    const genOne3 = xhr5.response;

    for (let i = 0; i < genOne3.results.length; i++) {
      const xhr6 = new XMLHttpRequest();
      xhr6.open('GET', `${genOne3.results[i].url}`);
      xhr6.responseType = 'json';
      xhr6.addEventListener('load', function () {
        const $modalContainer = document.querySelector('.modal-container');
        $modalContainer.appendChild(renderPokemonStatusCard(xhr6.response));
        console.log(xhr6.response);
      });
      xhr6.send();
    }
  });
  xhr5.send();
}

getPokemonModalData();

function renderPokemonStatusCard(pokemon) {
  const $rowModal = document.createElement('div');
  $rowModal.setAttribute('class', 'row-modal');

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
  data.view = viewName;
}

// const $exitButton = document.querySelector('.exit');

// $exitButton.addEventListener('click', (event) => {
//   if (event.target.matches('.exit')) {
//     const xhr5 = new XMLHttpRequest();
//     xhr5.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=151');
//     xhr5.responseType = 'json';

//     xhr5.addEventListener('load', function () {
//       const genOne3 = xhr5.response;

//       for (let i = 0; i < genOne3.results.length; i++) {
//         const xhr6 = new XMLHttpRequest();
//         xhr6.open('GET', `${genOne3.results[i].url}`);
//         xhr6.responseType = 'json';
//         xhr6.addEventListener('load', function () {
//           const $rowPokemon = document.querySelector('.row-pokemon');
//           $rowPokemon.appendChild(renderPokemon(xhr4.response));
//         });
//         xhr6.send();
//       }
//     });
//     xhr5.send();
//   }
// });
