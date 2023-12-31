
import {  peticion } from "../app.js"
import { articleDetails } from "./Paises.js"
import { handlesubmit } from "./busquedas.js"
import { eventdropDown } from "./filter.js"





// esta funcion se en carga de encontar el pais segun el idnice que rcibio
export function Details(indice) {
    peticion()
        .then(res => res[indice])
        .then(data => {
            mostrarDetail(data)
        })
}

// esta funcion se encarga de cargar el archivo html a los details para modificar su contenido ademas, se le asigna el evento para salir de esta seccion
function mostrarDetail(r) {
    const main = document.querySelector('.main')
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

//se encarga de generar la seccion de dedatils
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
    const boards=doc.querySelector('.boards')
    name.innerHTML = Object.keys(r.name).length==0  ? r.name : r.name.common
    native.innerHTML = Object.keys(r.name).length==0  ? r.name : r.name.common;
    population.innerHTML = r.population
    region.innerHTML = r.region
    subRegion.innerHTML = r.subregion
    capita.innerHTML = r.capital
    top.innerHTML = r.tld
    currences.innerHTML = Object.keys(r.currencies)
    language.innerHTML = Object.values(r.languages)
    poster.setAttribute('src', r.flags.png)
    if(r.hasOwnProperty('borders')){
        for(let i=0;i<r.borders.length;i++){
            const div=doc.createElement('div')
            div.innerText=r.borders[i]
            boards.appendChild(div)
        }
    }
    else{
        const p=doc.createElement('p')
        p.innerText='No tiene bordes'
        boards.appendChild(p)
    }
    
    return doc
}


