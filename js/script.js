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
        if(typeof newPokemon !== 'object')
            console.log("You can add only pokemon of object type");
        else{
            const newPokemonKeys = Object.keys(newPokemon).sort().toString();
            if(newPokemonKeys === ["name","height", "types"].sort().toString()){
                pokemonList.push(newPokemon);
                console.log("After adding new pokemon: ",getAll());
            }
            else
                console.log("Objects keys are not matching");
        }           
    } 

    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button'); 
        button.innerText = pokemon.name;
        button.classList.add('pokemon-btn');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        //button event listener
        eventListener(button, pokemon);
    }

    function eventListener(button, pokemon){
        button.addEventListener('click',function(){
            showDetails(pokemon)
        });
    }

    function showDetails(pokemon){
        console.log(`Pokemon clicked: ${pokemon.name}`);
    }

    return{
        getAll : getAll,
        add : add,
        addListItem : addListItem,
    }
})();

pokemonRepository.getAll().forEach((pokemon) => {
   pokemonRepository.addListItem(pokemon);
})