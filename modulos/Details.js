
import { articleDetails, peticion } from "../app.js"
import { handlesubmit } from "./busquedas.js"
import { eventdropDown } from "./filter.js"


const main = document.querySelector('.main')



export function Details(indice) {
    peticion()
        .then(res => res[indice])
        .then(data => {
            mostrarDetail(data)
        })
}


function mostrarDetail(r) {
    fetch('./details.html').then(res => res.text())
        .then(html => generarDetail(html, r)).then(h => {
            //mostrar details
            const mian = h.querySelector('.mian_details')
            main.innerHTML = mian.innerHTML
            //Quitar details
            const button = main.querySelector('.boton')
            button.addEventListener('click', () => {
                //se dibuja en el html lo que habia guardado el local
                main.innerHTML = JSON.parse(localStorage.getItem('Country'))
                //se llama las siguientes funcion con el fin de volver a asignar los eventos a los elemento recuperados
                handlesubmit()
                articleDetails()
                eventdropDown()


            })
        })
}

//se encarga de genera la seccion de dedatils
function generarDetail(html, r) {
    //recibe archivo html y el objeto con los detalles del pais clickeado

    //para poder accedar al dom
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html')

    //creacion del elemento deatils
    const poster = doc.querySelector('#poster_details')
    const name = doc.querySelector('.name')
    const native = doc.querySelector("#native")
    const population = doc.querySelector('#population')
    const region = doc.querySelector('#Region')
    const subRegion = doc.querySelector('#subregion')
    const capita = doc.querySelector('#capital')
    const top = doc.querySelector('#domain')
    const currences = doc.querySelector('#curriencies')
    const language = doc.querySelector('#language')

    name.innerHTML = Object.keys(r.name).length==0  ? r.name : r.name.common
    native.innerHTML = Object.keys(r.name).length==0  ? r.name : r.name.common;
    population.innerHTML = r.population
    region.innerHTML = r.region
    subRegion.innerHTML = r.subregion
    capita.innerHTML = r.capital
    top.innerHTML = r.topLevelDomain
    currences.innerHTML = r.currences
    let lang = ''
    for (let i = 0; i < r.languages.length; i++) {
        lang += `${i > 0 ? ', ' : ''}${r.languages[i].name}`
    }
    language.innerHTML = lang
    poster.setAttribute('src', r.flags.png)

    return doc
}