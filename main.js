
const button = document.querySelectorAll('button');
const input = document.querySelector('#search');
const typeBtn = document.querySelectorAll('.type')


let pokemon = [];

let generations = [
    {limit: 151, offset: 0},
    {limit: 100, offset: 151},
    {limit: 135, offset: 251},
    {limit: 107, offset: 386},
    {limit: 156, offset: 493},
    {limit: 72, offset: 649},
    {limit: 88, offset: 721},
    {limit: 96, offset: 809},
    {limit: 110, offset: 905},
];


const dataList = (data) => {
    document.querySelector('.card').innerHTML = data.map((item)=>{
        return `<div class = "displayItem"><div>${item.types.map(type=>`<img id="type-icon" src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${type.type.name}.svg" alt="${type.type.name}"/>`)}</div><div><p>${item.id}</p></div> <img id = "pokemon-img" src="${item.sprites.other.dream_world.front_default}"/>
    <p>${item.name}</p>  </div> `
    }).join('')
}


const fetchData = (generations) => { 
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${generations.limit}&offset=${generations.offset}`)
    .then(response => response.json())
    .then(json => {
    const fetches = json.results.map(item => {
      return fetch (item.url).then(res => res.json())
    })
    Promise.all(fetches).then(res => {
    pokemon = res;
        dataList(pokemon);
       })
         //dataList(json.results); 
console.log(json.results)
});

}

button.forEach((button,i)=>{
    button.addEventListener('click',()=> fetchData(generations[i],i))});
      



 





const pokemonSearch = (e) => {
   const searchValue = e.target.value.toLowerCase();
let filterList = [];
if( searchValue.length >0){
   filterList = pokemon.filter((item) => {
    return item.name.toLowerCase().includes(searchValue);
   });
   dataList(filterList);
}
else {
    dataList(pokemon);
}

};

const filterByType = (typesPok) =>{
    let filterList =[];
    if(pokemon.length >0 && typesPok.length > 0){
        filterList = pokemon.filter((item) => {
         return item.types.some((type)=> type.type.name === typesPok);
        });
        dataList(filterList)
    }
    else{
        dataList(pokemon)
    }
}

typeBtn.forEach((btn) =>{
    btn.addEventListener("click", () =>{
const typesName = btn.textContent.toLowerCase();
        filterByType(typesName);
    })
})




input.addEventListener('input', pokemonSearch);





