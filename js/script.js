const pokemonRepository = (() => {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let progress = document.querySelector('.progress');

    const loadList = () => {
        return fetch(apiURL).then((response) => {
            return response.json();
        }).then(function( json ){
            setTimeout(()=>(
                closeLoadingMessage()
            ), 2000);
            json.results.forEach(( item ) => {
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

    const loadDetails = (pokemon) => {
        pokemonRepository.showLoadingMessage();
        let url = pokemon.detailsUrl;

        return fetch(url).then((response) => {
            return response.json();
        }).then((details) => {
            setTimeout(()=>(
                closeLoadingMessage()
            ), 1000);
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types.map( item => (
                            item.type.name
                        ));
        }).catch((e) => {
            closeLoadingMessage();
            console.error(e);
        });
    };
    
    const getAll = () => (
        pokemonList
    );

    const add = (newPokemon) =>{
        if( typeof newPokemon === "object" &&
            "name" in newPokemon ){
                pokemonList.push(newPokemon);  
        }else{
            console.log("Pokemon is not correct");
        }
    };

    const addListItem = (pokemon) => {
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

    const eventListener = (button, pokemon) => {
        button.addEventListener('click',function(){
            showDetails(pokemon)
        });
    }

    const showDetails = (pokemon) => {
        pokemonRepository.loadDetails(pokemon).then(() => {
            console.log(pokemon);
        });
    }

    const showLoadingMessage = () =>{
        progress.classList.add('show');
    }

    const closeLoadingMessage = () =>{
        progress.classList.remove('show');
    }

    return{
        add : add,
        addListItem : addListItem,
        getAll : getAll,
        loadDetails: loadDetails,
        loadList : loadList,
        showDetails : showDetails,
        showLoadingMessage : showLoadingMessage,
    }
})();

pokemonRepository.loadList().then(() => {
    pokemonRepository.showLoadingMessage();
    pokemonRepository.getAll().forEach((pokemon) => {
        pokemonRepository.addListItem(pokemon);
    });
 });