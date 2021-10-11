const pokemonRepository = (() => {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let progress = document.querySelector('.progress');
    let modalContainer = document.querySelector('#modal-container');

    const loadList = () => {
        return fetch(apiURL).then((response) => {
            return response.json();
        }).then(function( json ){
            setTimeout(()=>(
                closeLoadingMessage()
            ), 1000);
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
        showLoadingMessage();
        let url = pokemon.detailsUrl;

        return fetch(url).then((response) => {
            return response.json();
        }).then((details) => {
            closeLoadingMessage();
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

    //Display pokemon details modal on click 
    const showDetails = (pokemon) => {
        pokemonRepository.loadDetails(pokemon).then(() => {
            displayPokemonModal(pokemon);
        });
    }

    const displayPokemonModal = (pokemon) =>{
        const {name, height, imageUrl} = pokemon;

        //clear previous content
        modalContainer.innerText = '';

        //Creating modal
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let modalContent = document.createElement('div');
        modal.classList.add('modal-body');

        let titleElement = document.createElement('h1');
        titleElement.innerText = name;
        titleElement.style.textTransform = 'capitalize';
        titleElement.classList.add('pokemon-title');

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = `Height : ${height}`;

        let pokemonImage = document.createElement('img');
        pokemonImage.src = imageUrl;
        pokemonImage.classList.add('pokemon-img');

        let closeButtonElement = document.createElement('div');
        closeButtonElement.classList.add('close-btn');
        closeButtonElement.addEventListener('click', hideModal);

        modalContent.appendChild(titleElement);
        modalContent.appendChild(pokemonHeight);
        modalContent.appendChild(pokemonImage);
        modal.append(modalContent);
        modal.appendChild(closeButtonElement);
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
    }

    const hideModal = () =>{
        modalContainer.classList.remove('is-visible');
    }

    //close the modal on press of Esc key
    window.addEventListener('keydown', (e)=>{
        if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
            hideModal();
        }
    });

    //close the modal if we click outside the modal
    modalContainer.addEventListener('click', e =>{
        let target = e.target;
        if(target === modalContainer)
            hideModal();
    });

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