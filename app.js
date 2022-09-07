let sprite = document.getElementById("image");
let nameDisplay = document.getElementById("name");
let numDisplay = document.getElementById("num");
let typesDisplay = document.getElementById("type");
let chartDisplay = document.getElementById("chart-container");
let randomBtn = document.getElementById("random-btn");
let pokemonContainer = document.getElementById("pokemon");
let pokemonSearch = document.getElementById("search-name");
let form = document.getElementById("form");
let regExLetters = /[A-Za-z0-9]/gi;
let individualStat = [["stat", ""]];

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
    sprite.innerHTML =
      "<div>Please enter a pokemon name or Pokedex number.</div>";
  }
}

function displayPokemon(pokemon) {
  individualStat = [["stat", ""]];
  id = pokemon.id;
  sprite.innerHTML = `<div id="question-mark"><img class='moving' src="images/question-mark.png" alt=""></div>`;
  let name = pokemon.name;
  let types = pokemon.types;
  let pokemonStats = pokemon.stats;
  let pokemonTypes = [];

  types.forEach((type) => {
    pokemonTypes.push(type.type.name);
  });

  pokemonStats.forEach((statType) => {
    individualStat.push([statType.stat.name, statType["base_stat"]]);
  });

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  sprite.innerHTML = `<img id="poke-sprite" src=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png>`;
  nameDisplay.innerHTML = `<div id='name-display'>${
    name.charAt(0).toUpperCase() + name.slice(1)
  }</div>`;
  numDisplay.innerHTML = `<div id="num-display">Pokedex Entry #${id}</div>`;
  typesDisplay.innerHTML = `<div id="type-display">Type(s): ${pokemonTypes.join(
    ",  "
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

function drawChart() {
  var data = google.visualization.arrayToDataTable(individualStat);

  var options = {
    title: "Pokemon Stats",
    chartArea: { top: 20, bottom: 0, right: 0, left: 50 },
    // legend: { position: "none" },
    hAxis: { gridlines: { count: 2 } },
    // vAxis: { textPosition: "none", gridlines: { count: 0 } },
    baselineColor: "transparent",
    bar: { groupWidth: "95%" },
    colors: ["#657CD0", "#DA68A0", "#06C3C0", "#777B80", "#7C6D70", "#7C0850"],
  };

  var view = new google.visualization.DataView(data);
  view.setColumns([
    0,
    1,
    { calc: "stringify", sourceColumn: 1, type: "string", role: "annotation" },
  ]);

  var chart = new google.visualization.BarChart(
    document.getElementById("myChart")
  );

  chart.draw(view, options);
}
