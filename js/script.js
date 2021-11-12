const pokemonRepository = (() => {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let loadingDiv = document.querySelector('.loading');
    let typeColor = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    const loadList = () => {
        showLoadingMessage();
        return fetch(apiURL).then((response) => {
            return response.json();
        }).then(function( json ){
            json.results.forEach(( item ) => {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
                };
                add( pokemon );
            });
            hideLoadingMessage();
        }).catch((e) => {
            console.error(e);
            hideLoadingMessage();
        });
    };

    const loadDetails = (pokemon) => {
        let url = pokemon.detailsUrl;

        return fetch(url).then((response) => {
            return response.json();
        }).then((details) => {
            pokemon.imageUrl = details.sprites.other.dream_world.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types.map( item => {
                                return {
                                    'type' :  item.type.name,
                                    'color' : typeColor[item.type.name]
                                }});
            pokemon.weight = details.weight;
            pokemon.id = details.id;
        }).catch((e) => {
            console.error(e);
        });
    };
    
    const getAll = () => (
        pokemonList
    );

    const add = (pokemon) =>{
        if( typeof pokemon === "object" &&
            "name" in pokemon &&
            "detailsUrl" in pokemon ){
                pokemonList.push(pokemon);  
        }else{
            console.log("Pokemon is not correct");
        }
    };

    const getPokemonImageUrl = async (pokemonUrl) => {
        const response = await fetch(pokemonUrl);
        const details = await response.json();
        let imageUrl = details && details.sprites.other.dream_world.front_default;
        return imageUrl;
    }

    const addListItem = async (pokemon) => {
        let pokemonList = document.querySelector('#list-group');
        let listItem = document.createElement('li');
        let imageUrl = await getPokemonImageUrl(pokemon.detailsUrl);

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
        button.innerHTML = `
                                <p>${pokemon.name}</p>
                                <img src="${imageUrl}" alt="Pokemon image"/>
                            `;
        button.classList.add(
                                'btn',
                                'text-capitalize',
                                'btn-lg',
                                'w-100',
                                'pokemon-card',
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
        let titleElement = `#${pokemon.id} ${pokemon.name}`;
        let typeElement = $(`<p class="mb-n1">
                                Type: 
                                ${pokemon.types.map((pokemon)=>{
                                    return `<span class="pokemon-type" style='background-color:${pokemon.color}'}>${pokemon.type}</span>`
                                }).join('')}
                            </p>`);
        let heightElement = $(`<p class="mb-n1">
                                    Height: <span class="text-bold">${pokemon.height/10}m</span>
                                </p>`);
        let weightElement = $(`<p class="mb-n1">
                                    Weight: <span class="text-bold">${pokemon.weight/10}Kg</span>
                                </p>`);
        let imageElement = $(`<img src="" alt="pokemon-pic" class="pokemon-img w-100 mx-auto">`);
        imageElement.attr('src', pokemon.imageUrl);

        modalTitle.append(titleElement);
        modalBody.append(imageElement);
        modalBody.append(typeElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
    }

    //display loading message while fetching data
    const showLoadingMessage = () =>{
        loadingDiv.classList.add('show')
    }

    const hideLoadingMessage = () =>{
        setTimeout(()=>{
            loadingDiv.classList.remove('show');
        }, 1000);
    }

    //Search pokemon name for containing typed word
    let searchPokemon = document.querySelector('#search-bar');
    searchPokemon.addEventListener('input', () =>{
        let value = searchPokemon.value.toLowerCase();
        let pokemonList = document.querySelectorAll('li');

        pokemonList.forEach((pokemon) =>{
            if(pokemon.innerText.toLowerCase().includes(value))
                pokemon.style.display = 'block';
            else
                pokemon.style.display = 'none';
        })
    });

    //Get the button
    let mybutton = document.getElementById("btn-back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = () => {
        scrollFunction();
    };

    const scrollFunction = () =>{
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    const backToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    // When the user clicks on the button, scroll to the top of the document
    mybutton.addEventListener("click", backToTop);

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