const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const pokemonsList = document.getElementsByClassName("pokemon");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}" onclick="showPokemonDetails(${
    pokemon.number
  })">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function convertSectionPokemonDetails(pokemon) {
  return `
        <div class="pokemon-details ${pokemon.type}">
        <div class="div-btn-close">
          <button" id="btn-close" aria-label="Botão para sair dos detalhes do pokemon e voltar para lista completa">
            <img src="./assets/imgs/icons/close.png">
          </button>
          </div>
            <div>
                <h2 class="pokemon-modal-h2">${pokemon.name}</h2>
                <div class="details-header-modal">
                <ul class="types">
                  ${pokemon.types
                    .map((type) => `<li class="type ${type}">${type}</li>`)
                    .join("")}

                </ul>
                  
                  <span id="id-number">#${pokemon.number}</span>
                </div>
                <picture class="picture-details">
                    <img class="pokemon-modal-image"
                        src="${pokemon.photo}"
                        alt="Imagem do Pokémon ${pokemon.name}">
                </picture>
            </div>

            <div class="pokemon-infos">
                <h3>About</h3>
                <p><span>Height:</span> ${pokemon.height}</p>
                <p><span>Weight:</span> ${pokemon.weight}</p>
                <p><span>Abilities:</span> ${pokemon.abilities.join(", ")}</p>
                
                <h3>Base Stats</h3>
                ${pokemon.stats
                  .map(
                    (stat) => `<p><span>${stat.name}:</span> ${stat.value}</p>`
                  )
                  .join("")}
            </div>
        </div>
    `;
}

const pokemonModalSection = document.getElementById("section-modal");
const pokemonModalCloseButton = document.getElementById("btn-close");

function showPokemonDetails(pokemonId) {
  if (pokemonModalSection.classList.contains("hidden"))
    pokemonModalSection.classList.remove("hidden");

  pokemonApiDetailsModal
    .pokemonsDetailsModal(pokemonId)
    .then((pokemonDetail) => {
      const pokeSession = convertSectionPokemonDetails(pokemonDetail);
      pokemonModalSection.innerHTML = pokeSession;
    });
}

function closePokemonDetails(e) {
  e.stopPropagation();
  if (
    e.target === pokemonModalSection ||
    e.target === document.getElementById("btn-close")
  ) {
    pokemonModalSection.classList.add("hidden");
    pokemonModalSection.innerHTML = "";
  }
}

pokemonModalSection.addEventListener("click", closePokemonDetails);
pokemonModalCloseButton.addEventListener("click", closePokemonDetails);
