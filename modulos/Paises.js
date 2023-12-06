import { peticion } from "../app.js"
import { Details } from "./Details.js"
export function generarPaises(data) {
    const main = document.querySelector('.main')
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

function Article(x) {
    //espera una arreglo con los peliculas que debe cargar
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
        const lista = document.createElement('ul')
        const pop = document.createElement('li')
        pop.classList.add('description_item')
        const popstrong = document.createElement('strong')
        const popularidad = document.createElement('p')
        popstrong.innerText = 'Populations: '
        popularidad.innerText = x[i].population
        pop.appendChild(popstrong)
        pop.appendChild(popularidad)
        lista.appendChild(pop)

        const reg = document.createElement('li')
        reg.classList.add('description_item')
        const regStrong = document.createElement('strong')
        const region = document.createElement('p')
        regStrong.innerText = 'Region: '
        region.innerText = x[i].region
        reg.appendChild(regStrong)
        reg.appendChild(region)
        lista.appendChild(reg)

        const cap = document.createElement('li')
        cap.classList.add('description_item')
        const capital = document.createElement('p')
        const capStrong = document.createElement('strong')
        capStrong.innerText = 'Capital'
        capital.innerText = x[i].capital
        cap.appendChild(capStrong)
        cap.appendChild(capital)
        lista.appendChild(cap)

        text.appendChild(lista)
        article.appendChild(text)

        fragment.appendChild(article)
        countrys.appendChild(fragment)

    }
}


export function articleDetails() {
    //se encarga de asignar el evento del detail a cada articulo que se genere
    const articles = document.querySelectorAll('.article')
    articles.forEach(x => {
        //mostart details al hacer click a cada articulo 
        x.addEventListener('click', (e) => {
            //recuperar el titulo
            const art = e.currentTarget
            const h3 = art.querySelector('h3').innerText
            peticion()
                .then(res => res.findIndex(x => x.name.common == h3))
                .then(data => Details(data))
        })



    })
}