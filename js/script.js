var pokemonList = [
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

document.write(`<h2 class="pokemon-list-title">Pokemon List</h2>`);

for(let i = 0; i < pokemonList.length; i++){
    var pokemonName = pokemonList[i].name;
    var pokemonHeight = '\(height: ' + pokemonList[i].height + '\)';
    var isPokemonBig = pokemonList[i].height > 1 ? '- Wow,that\'s big!' : '';

    document.write(`<p class="pokemon">
                       ${i+1}. ${pokemonName} ${pokemonHeight} <span class="pokemon-big">${isPokemonBig}</span>
                    </p>`);
}