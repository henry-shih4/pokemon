
let sprite = document.getElementById("image");
let nameDisplay = document.getElementById("name");
let typesDisplay = document.getElementById("type");
let randomBtn = document.getElementById("random-btn");

function fetchPokemon(){
  id = Math.floor(Math.random() * 906) + 1;
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
  sprite.innerHTML = `<div id="question-mark"><img class='moving' src="images/question-mark.png" alt=""></div>`  
  let name = pokemon.name;
  let types = pokemon.types;
  let pokemonTypes = [];
  types.forEach((type) => {
    pokemonTypes.push(type.type.name);
  });

  sprite.innerHTML = `<img id="poke-sprite" src=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png>`;
  nameDisplay.innerHTML = `<p>${name.charAt(0).toUpperCase() + name.slice(1)}</p>`;
  typesDisplay.innerHTML = `<p>Type(s): ${pokemonTypes.join(" ")}</p>`;
  
}



function loading(){

sprite.innerHTML = `<div id="question-mark">
<img class='moving' src="images/question-mark.png" alt="">
<img class='moving' src="images/question-mark.png" alt="">
<img class="moving" src="images/question-mark.png" alt="">
<img class="moving" src="images/question-mark.png" alt="">
</div>`

nameDisplay.innerHTML = '';
typesDisplay.innerHTML = '';
let movingImage = document.querySelectorAll('.moving');

for (let i=0; i<movingImage.length;i++){
  movingImage[i].classList.add('moving-active');
}
let movingImageActive = document.getElementsByClassName('moving-active');
movingImageActive[0].addEventListener('animationend', fetchPokemon)
}



randomBtn.addEventListener("click", loading);
