let pokemonRepository = (function(){
    let pokemonList = [
        {
            name : 'Bulbasaur',
            height: 0.7,
            types: ['grass' , 'poison']
        },
        {
            name : 'Ivysaur',
            height: 1,
            types: ['grass' , 'poison']
        },
        {
            name : 'Venusaur',
            height: 2,
            types: ['grass' , 'poison']
        },
        {
            name : 'Charmander',
            height: 0.6,
            types: 'fire'
        },
        {
            name : 'Charmeleon',
            height: 1.1,
            types: 'fire'
        },
        {
            name : 'Charizard',
            height: 1.7,
            types: ['fire', 'flying']
        },
        {
            name : 'Squirtle',
            height: 1,
            types: 'water'
        }
    ];

    function getAll(){
        return pokemonList;
    }

    function add(newPokemon){
        pokemonList.push(newPokemon);
    } 

    return{
        getAll : getAll,
        add : add,
    }
})();

document.write(`<h2 class="pokemon-list-title">Pokemon List</h2>`);

// for(let i = 0; i < pokemonList.length; i++){
//     let pokemonName = pokemonList[i].name;
//     let pokemonHeight = '\(height: ' + pokemonList[i].height + '\)';
//     let isPokemonBig = pokemonList[i].height > 1 ? '- Wow,that\'s big!' : '';

//     document.write(`<p class="pokemon">
//                        ${i+1}. ${pokemonName} ${pokemonHeight} <span class="pokemon-big">${isPokemonBig}</span>
//                     </p>`);
// }

pokemonRepository.getAll().forEach((pokemon, index) => {
    let pokemonName = pokemon.name;
    let pokemonHeight = '\(height: ' + pokemon.height + '\)';
    let isPokemonBig = pokemon.height > 1 ? '- Wow,that\'s big!' : '';
    
    document.write(`<p class="pokemon">
                    ${index+1}. ${pokemonName} ${pokemonHeight} <span class="pokemon-big">${isPokemonBig}</span>
                    </p>`);
});

document.write(`
    <form id="search-by-name">
        <input type="text" id="searchTerm" placeholder="Type name here" required>
        <button class="btn" type="submit">Serach</button>
    </form>
`);

function handleSubmit( event ){
    event.preventDefault();
    let serachInput = document.querySelector('#searchTerm');
    let term = serachInput.value;
    console.log(term);

    let filteredPokemonList = !!term && searchPokemonByName(term.trim().toLowerCase());
    console.log(filteredPokemonList);
    filteredPokemonList && displayPokemon(filteredPokemonList);
}

function searchPokemonByName(term){
    return pokemonRepository.getAll().filter(pokemon => {
        if(pokemon.name.toLowerCase().startsWith(term))
            return pokemon;
    });
}

function displayPokemon(pokemonList){
    if(pokemonList.length === 0){
        document.write(`<h2 class="pokemon-list-title">No match found</h2>`);
    }
    else{
        document.write(`<h2 class="pokemon-list-title">Filtered List</h2>`);
        pokemonList.forEach((pokemon, index) => {
            let pokemonName = pokemon.name;
            let pokemonHeight = '\(height: ' + pokemon.height + '\)';
            let isPokemonBig = pokemon.height > 1 ? '- Wow,that\'s big!' : '';
            
            document.write(`<p class="pokemon">
                            ${index+1}. ${pokemonName} ${pokemonHeight} <span class="pokemon-big">${isPokemonBig}</span>
                            </p>`);
        });  
    }
}

let searchForm = document.querySelector('#search-by-name');
searchForm.addEventListener('submit', handleSubmit);

