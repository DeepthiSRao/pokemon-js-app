const pokemonRepository = (() => {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    const loadList = () => {
        return fetch(apiURL).then((response) => {
            return response.json();
        }).then(function( json ){
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
        let url = pokemon.detailsUrl;

        return fetch(url).then((response) => {
            return response.json();
        }).then((details) => {
            pokemon.imageUrl = details.sprites.other.dream_world.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types.map( item => (
                            item.type.name
                        ));
        }).catch((e) => {
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
        let pokemonList = document.querySelector('#list-group');
        let listItem = document.createElement('li');
        listItem.classList.add(
            'list-group-item',
            'border-0',
            'col-xl-2',
            'col-lg-3',
            'col-md-4',
            'col-sm-6',
            'col-xs-12',
            'align-items-center',
        );
        let button = document.createElement('button'); 
        button.innerText = pokemon.name;
        button.classList.add(
            'btn',
            'btn-warning',
            'text-capitalize',
            'btn-lg',
            'w-100',
            'pokemon-btn'
            );
        button.setAttribute('data-toggle','modal');
        button.setAttribute('data-target','#pokemonModal');

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        //button event listener
        btnEventListener(button, pokemon);
    }

    const btnEventListener = (button, pokemon) => {
        button.addEventListener('click',function(){          
            showDetails(pokemon)
        });
    }

    //Display pokemon details modal on click 
    const showDetails = (pokemon) => {
        pokemonRepository.loadDetails(pokemon).then(() => {
            showModal(pokemon);
        });
    }

    const showModal = (pokemon) =>{
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        //clear the content
        modalBody.empty();
        modalTitle.empty();
        
        let titleElement = pokemon.name;
        let heightElement = $(`<p class="mb-n1 py-1">Height: ${pokemon.height}</p>`);
        let typesElement = $(`<p class="text-capitalize mb-n1">Types: ${pokemon.types}</p>`);
        let imageElement = $(`<img src="" alt="pokemon-pic" class="pokemon-img w-100 mx-auto">`);
        imageElement.attr('src', pokemon.imageUrl);

        modalTitle.append(titleElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
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

pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach((pokemon) => {
        pokemonRepository.addListItem(pokemon);
    });
 });