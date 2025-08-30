const dropdown = document.getElementById('dropdown');
const button = document.querySelector('button');
const info = document.querySelector('.info');

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=150';

let allPokemons = [];
let selectedPokemon = "";

async function getInfo() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    allPokemons = data.results;
    populateDropdown(allPokemons);
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    alert("Failed to load Pokémon list. Please try again later.");
  }
}
getInfo();


function populateDropdown(data) {
  data.forEach((res) => {
    const option = document.createElement('option');
    option.value = res.name;
    option.innerText = res.name;
    dropdown.appendChild(option);
  });


  dropdown.addEventListener('change', (e) => {
    selectedPokemon = e.target.value;
    button.disabled = !selectedPokemon;
  });

  button.addEventListener('click', () => {
    if (!selectedPokemon) {
      alert("Please select a Pokémon first!");
      return;
    }
    getPokemonData(selectedPokemon);
  });
}


async function getPokemonData(name) {
  const pokemonData = allPokemons.find(res => res.name === name);
  if (!pokemonData) return;

  try {
    const response = await fetch(pokemonData.url);
    const data = await response.json();
    showAbility(data);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    alert("Failed to load Pokémon details.");
  }
}


function showAbility(data) {
  info.innerHTML = `
    <h2>${data.name.toUpperCase()}</h2>
    <p><strong>Height:</strong> ${data.height}</p>
    <p><strong>Weight:</strong> ${data.weight}</p>
    <p><strong>Base Experience:</strong> ${data.base_experience}</p>
    <img src="${data.sprites.front_default}" alt="${data.name}">
  `;
}
