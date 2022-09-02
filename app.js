id = Math.floor(Math.random() * 906) + 1;
let sprite = document.getElementById("image");
let nameDisplay = document.getElementById("name");
let typesDisplay = document.getElementById("type");
let randomBtn = document.getElementById("random-btn");

function fetchPokemon(id){
fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error");
    }

    return response.json();
  })
  .then((json) => initialize(json))
  .catch((err) => console.error("Fetch problem: pokemon not found"));
}

function initialize(pokemon) {


  console.log(pokemon);
  let name = pokemon.name;

  let types = pokemon.types;
  let pokemonTypes = [];

  types.forEach((type) => {
    pokemonTypes.push(type.type.name);
  });
  console.log(id);
  console.log(name);
  console.log(pokemonTypes.join(" "));

  sprite.innerHTML = `<img src=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png>`;

  nameDisplay.innerHTML = `<p>${name}</p>`;
  typesDisplay.innerHTML = `<p>${pokemonTypes.join(" ")}</p>`;
}

randomBtn.addEventListener("click", displayPokemon);
