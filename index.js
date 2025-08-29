const dropdown = document.getElementById('dropdown')
const button = document.querySelector('button')
const info = document.querySelector('.info')

async function getInfo() {
    const response = await fetch('http://pokeapi.co/api/v2/pokemon')
    const data = await response.json();
    console.log(data)
    pokemons(data)
}
getInfo()

function pokemons(data) {

    data.results.forEach((res) => {
        const options = document.createElement('option')
        options.value = res.name
        options.innerText = res.name
        dropdown.appendChild(options)

    })
    let pokemon = ''
    dropdown.addEventListener('change', (e) => {
        pokemon  = e.target.value;
        // getPowers(e.target.value, data)
    })
    button.addEventListener('click',()=>{
        getPowers(pokemon,data)
    })
}

async function getPowers(names, data) {
    let urls = '';
    data.results.forEach((res) => {
        if (res.name == names) {
            urls = res.url;
        }
    })
    const response = await fetch(urls)
    const datas = await response.json()

    showAbility(datas)

}

function showAbility(datas) {
    info.innerHTML = ''
    const h2 = document.createElement('h2')
    h2.innerText = `Name:` + datas.name;
    const height = document.createElement('p')
    height.innerText = 'height:' + datas.height;
    info.appendChild(h2)
    info.appendChild(height)
}