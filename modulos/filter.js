import {  peticion } from "../app.js"
import { generarPaises } from "./Paises.js"
export function eventdropDown() {
    const dropdown = document.querySelector('.select_container')
    const options = document.querySelectorAll('.option')
   
    dropdown.addEventListener('click', toggleDropdown)
    options.forEach(option => {
        option.addEventListener('click', handleOption)
    })

}
let abierto = false
function toggleDropdown() {
    const dropDownC = document.querySelector('.options')
    const classDropDown=document.querySelector('#dropDown')
    if (abierto) {
        abierto = !abierto
        dropDownC.classList.remove('options_visible')
        classDropDown.classList.remove('arrow-up')
        //asiganar evento a la opciones disponibles para filtar

    } else {
        abierto = !abierto
        dropDownC.classList.add('options_visible')
        classDropDown.classList.add('arrow-up')
    }

}

function handleOption(e) {
    const main = document.querySelector('.main')
    const filter = document.querySelector('#filter')
    const option = e.target.innerText
    filter.innerText = option
    //esta funcion es la encargada de filtrar
    filtrar(option)
    //guardar resultados
    localStorage.setItem('Country', JSON.stringify(main.innerHTML))
}

function filtrar(conten) {
    const countrys = document.querySelector('.countrys')
    peticion()
    .then(res =>  res.filter(x=>x.region==conten))
    .then(data => {
        countrys.innerHTML = ""
        generarPaises(data)
    })
}