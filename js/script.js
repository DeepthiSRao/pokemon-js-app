const pokemonRepository = (() => {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
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
        let titleElement = `#${pokemon.id} ${pokemon.name}`;
        let typeElement = $(`<p class="mb-n1 pt-2">
                                <span class="text-bold">Type: </span>
                                ${pokemon.types.map((pokemon)=>{
                                    return `<span class="pokemon-type" style='background-color:${pokemon.color}'}>${pokemon.type}</span>`
                                }).join('')}
                            </p>`);
        let heightElement = $(`<p class="mb-n1">
                                    <span class="text-bold">Height: </span>${pokemon.height/10}m
                                </p>`);
        let weightElement = $(`<p class="mb-n1">
                                    <span class="text-bold">Weight: </span>${pokemon.weight/10}Kg
                                </p>`);
        let imageElement = $(`<img src="" alt="pokemon-pic" class="pokemon-img w-100 mx-auto">`);
        imageElement.attr('src', pokemon.imageUrl);

        modalTitle.append(titleElement);
        modalBody.append(imageElement);
        modalBody.append(typeElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
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

    //set text color based on pokemon type
    const changePokemonTypeColor = () =>{
        let pokemonType = document.getElementById('pokemon-type');
        let type = pokemonType.innerHTML;
        console.log(type);

        if(type.includes('grass'))
            pokemonType.style.backgroundColor = 'green';
        else if(type.includes('fire'))
            pokemonType.style.backgroundColor = 'orange';   
        else if(type.includes('bug'))
            pokemonType.style.backgroundColor = 'red';     
        else if(type.includes('fairy'))
            pokemonType.style.backgroundColor = 'pink';    
        else if(type.includes('water'))
            pokemonType.style.backgroundColor = 'blue';      
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