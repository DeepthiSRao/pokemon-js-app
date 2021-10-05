let pokemonRepository = (function(){
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function loadList(){
        return fetch(apiURL).then(function( response ){
            return response.json();
        }).then(function( json ){
            json.results.forEach(function( item ){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add( pokemon );
            });
        }).catch(function( e ){
            console.error( e );
        });
    };

    function getAll(){
        return pokemonList;
    }

    function add(newPokemon){
        if( typeof newPokemon === "object" &&
            "name" in newPokemon ){
                pokemonList.push(newPokemon);  
        }else{
            console.log("Pokemon is not correct");
        }
    };

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

    function loadDetails(item){
        let url = item.detailsUrl;

        return fetch(url).then(function( response ){
            return response.json();
        }).then(function(details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types.map( item => (
                            item.type.name
                        ));
        }).catch(function(e){
            console.error(e);
        });
    };

    function showDetails(pokemon){
        pokemonRepository.loadDetails(pokemon).then(function(){
            console.log(pokemon);
        });
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

    return{
        add : add,
        addListItem : addListItem,
        getAll : getAll,
        loadDetails: loadDetails,
        loadList : loadList,
        showDetails : showDetails,
    }
})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
 });