let sprite = document.getElementById("image");
let nameDisplay = document.getElementById("name");
let numDisplay = document.getElementById("num");
let typesDisplay = document.getElementById("type");
let randomBtn = document.getElementById("random-btn");
let pokemonContainer = document.getElementById("pokemon");
let pokemonSearch = document.getElementById("search-name");
let form = document.getElementById("form");
let regExLetters = /[A-Za-z]/gi;

form.addEventListener("submit", searchPokemon);
randomBtn.addEventListener("click", loading);

function fetchPokemon() {
  id = Math.floor(Math.random() * 906) + 1;
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error");
      }

      return response.json();
    })
    .then((json) => displayPokemon(json))
    .catch((err) => console.error("Fetch problem: pokemon not found"));
}

function searchPokemon() {
  event.preventDefault();
  id = pokemonSearch.value.toLowerCase();
  if (id == "") {
    return;
  } else if (id.match(regExLetters)) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error");
        }
        return response.json();
      })
      .then((json) => displayPokemon(json))
      .catch((err) => errorMessage());
  } else {
    sprite.innerHTML = "<div>please enter only letters</div>";
  }
}

function displayPokemon(pokemon) {
  id = pokemon.id;
  sprite.innerHTML = `<div id="question-mark"><img class='moving' src="images/question-mark.png" alt=""></div>`;
  let name = pokemon.name;
  let types = pokemon.types;
  // let stats = pokemon.stats;

  let pokemonTypes = [];
  types.forEach((type) => {
    pokemonTypes.push(type.type.name);
  });

  // for (let i = 0; i < stats.length + 1; i++) {
  //   console.log(stats[i].base_stat);
  // }

  sprite.innerHTML = `<img id="poke-sprite" src=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png>`;
  nameDisplay.innerHTML = `<div id='name-display'>${
    name.charAt(0).toUpperCase() + name.slice(1)
  }</div>`;
  numDisplay.innerHTML = `<div id="num-display">#${id}</div>`;
  typesDisplay.innerHTML = `<div id="type-display">Type(s): ${pokemonTypes.join(
    " / "
  )}</div>`;

  pokemonSearch.value = name;
}

function loading() {
  sprite.innerHTML = `<div id="question-mark">
<img class='moving' src="images/question-mark.png" alt="">
<img class='moving' src="images/question-mark.png" alt="">
<img class="moving" src="images/question-mark.png" alt="">
<img class="moving" src="images/question-mark.png" alt="">
</div>`;

  nameDisplay.innerHTML = "";
  typesDisplay.innerHTML = "";
  numDisplay.innerHTML = "";
  let movingImage = document.querySelectorAll(".moving");

  for (let i = 0; i < movingImage.length; i++) {
    movingImage[i].classList.add("moving-active");
  }
  let movingImageActive = document.getElementsByClassName("moving-active");
  movingImageActive[0].addEventListener("animationend", fetchPokemon);
}

function errorMessage() {
  sprite.innerHTML = "<div>Pokemon not found. Try again.</div>";
  console.error("Fetch problem: pokemon not found");
}
