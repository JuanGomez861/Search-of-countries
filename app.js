//Corregir imagenes en el dark-mode
import { generarPaises } from "./modulos/Paises.js"
import { eventdropDown } from "./modulos/filter.js"
import { handlesubmit } from "./modulos/busquedas.js"

export async function peticion() {
    const res = await fetch('https://restcountries.com/v3.1/all')
    const data = await res.json()
    return data
}

eventdropDown()
handlesubmit()
peticion().then(data => generarPaises(data))//genera todos lso paises al inicio


const toggle = document.querySelector('.header_figure')
toggle.addEventListener('click', DarkMode)
let toggleAbierto = false
function DarkMode() {
    const body = document.querySelector('body')
    const header = document.querySelector('.header')
    const main = document.querySelector('.main')
    const lupa=document.querySelector('#lupa')
    const moon=document.querySelector('.header__img')
    const drop=document.querySelector('#dropDown')
    if (!toggleAbierto) {
        toggleAbierto = !toggleAbierto
        body.classList.add('dark')
        header.classList.add('header_dark')
        main.classList.add('main_dark')
        lupa.setAttribute('src','./icons/magnifying-glass-solid (2).svg')
        moon.setAttribute('src','./icons/moon-solid (1).svg')
        drop.setAttribute('src','./icons/caret-down-solid (1).svg')
        
    } else {
        body.classList.remove('dark')
        header.classList.remove('header_dark')
        main.classList.remove('main_dark')
        toggleAbierto = !toggleAbierto
        lupa.setAttribute('src','./icons/magnifying-glass-solid.svg')
        moon.setAttribute('src','./icons/moon-regular.svg')
        drop.setAttribute('src','./icons/caret-down-solid.svg')
    }
    localStorage.setItem('Country', JSON.stringify(main.innerHTML))
}









//Crear pelicula


