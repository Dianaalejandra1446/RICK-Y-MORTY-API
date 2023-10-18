const d = document;
//Traer el input de busqueda
const txtCharacter = d.getElementById('txt-character');
// Traer el contenedor donde se va renderizar las Cards
const containerCards = d.getElementById('containerCards');
//Importamos url API
const URL1 = "https://rickandmortyapi.com/api/character";
const URLName = "https://rickandmortyapi.com/api/character/?name="

//Utilizar el metodo fetch
//Metodo fecth cargar las primeras cards
// async await

const getApi = async(URL) =>{
    const response = await fetch(URL);//Hasta que la respuesta no se cumpla no deja continuar
    const data = await response.json(); //Lo va formatiar a JSON
    //Lamamos a los datos de array results
    return data.results;
}

//Crear funcion encargada de crear las Cards
//Funcion anonima
const createCards = ( character ) => { //Parametro
    const card = d.createElement('div');
    card.classList.add('card-character');
    
    const imgCard = d.createElement('img');
    imgCard.src = character.image;
    imgCard.alt = character.image;
    
    const containerDescription = d.createElement('div');
    containerDescription.classList.add('description-card');
    
    const nameCharacter = d.createElement('h2');
    nameCharacter.textContent = character.name;
    
    const stastusCharacter = d.createElement('p');
    stastusCharacter.classList.add('status')
    stastusCharacter.textContent =`Status: ${character.status}`;
    
    const speciesCharacter = d.createElement('p');
    speciesCharacter.classList.add('species');
    speciesCharacter.textContent = `Species: ${character.species}`;
    
    const genderCharacter =  d.createElement('p');
    genderCharacter.classList.add('gender')
    genderCharacter.textContent = `Gender: ${character.gender}`;
    
    containerDescription.appendChild(nameCharacter);
    containerDescription.appendChild(stastusCharacter);
    containerDescription.appendChild(speciesCharacter);
    containerDescription.appendChild(genderCharacter);

    card.appendChild(imgCard);
    card.appendChild(containerDescription);

    containerCards.appendChild(card); //Agregamos la tarjeta al contenedor principal
}
const generateAllCharacter = async () => {
    const data = await getApi(URL1); // Verificar que se cumpla la promesa getApi
    data.map( character => createCards(character) )
}

//Buscar Personaje por el nombre
const getCharacterByName = async ( event ) => {
    containerCards.innerHTML = "";//Primero dejamos vacio el contenedor
    const data =await getApi(URLName + event.target.value);//El evento que apliquen va tener una propiedad target,target me trae el valor del objeto ingresado
    data.map( character => createCards(character));

}

window.addEventListener('DOMContentLoaded',generateAllCharacter);//Cuando cargue por primera vez va general la funcion generateAllCharacter
txtCharacter.addEventListener('keyup', getCharacterByName);//KeyUp que se ejecute apenas se ingrese


//Utilizar la funcion fecth para crear las cards
//Filtrar personajes por nombre