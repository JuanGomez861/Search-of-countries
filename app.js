//cosas por terminar:
//Dark-mode



import { Details } from "./modulos/Details.js"
import { eventdropDown } from "./modulos/filter.js"
import { handlesubmit } from "./modulos/busquedas.js"
const main = document.querySelector('.main')

eventdropDown()
handlesubmit()
peticion().then(data => generarPaises(data))//genera todos lso paises al inicio






export function generarPaises(data) {
    //recibe arrgo con los paises a generar
    const generatedData = []


    for (let i = 0; i < data.length; i++) {
        const x = data[i]
        generatedData.push(x)
    }

    Article(generatedData)
    //guardar
    localStorage.setItem('Country', JSON.stringify(main.innerHTML))
    //se encarga de activar el evento del  articl para mostar details
    articleDetails()


}
//se encarga de asignar el evento para mostrar el detail a cada articulo
export function articleDetails() {
    const articles = document.querySelectorAll('.article')
    articles.forEach(x => {
        //mostart details al hacer click a cada articulo 
        x.addEventListener('click', (e) => {
            //recuperar el titulo
            const art = e.currentTarget
            const h3 = art.querySelector('h3').innerText
            peticion()
            .then(res=>res.findIndex(x=>x.name.common==h3))
            .then(data=>Details(data))
        })



    })
}

//Crear pelicula
function Article(x) {
    //espera una arreglo con los peliculas que debe cargar
    console.log(x)
    const countrys = document.querySelector('.countrys')
    for (let i = 0; i < x.length; i++) {
        const fragment = document.createDocumentFragment()
        const article = document.createElement('article')
        article.classList.add('article')
        const figure = document.createElement('figure')
        const img = document.createElement('img')
        img.setAttribute('src', x[i].flags.png)
        img.setAttribute('alt', x[i].name.common)
        figure.appendChild(img)
        figure.classList.add('poster')
        article.appendChild(figure)
        const text = document.createElement('div')
        text.classList.add('text')
        const h3 = document.createElement('h3')
        h3.innerText = x[i].name.common
        text.appendChild(h3)
        const popularidad = document.createElement('p')
        popularidad.innerText = `Populations: ${x[i].population}`
        text.appendChild(popularidad)
        const region = document.createElement('p')
        region.innerText = `Region: ${x[i].region}`
        text.appendChild(region)
        const capital = document.createElement('p')
        capital.innerText = `Capital: ${x[i].capital}`
        text.appendChild(capital)
        article.appendChild(text)
        fragment.appendChild(article)
        countrys.appendChild(fragment)
    }
}

export async function peticion() {
    
        const res = await fetch('https://restcountries.com/v3.1/all')
        const data = await res.json()
        return data
        
    
}
