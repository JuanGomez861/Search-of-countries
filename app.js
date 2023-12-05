import { Details } from "./Details.js"
const options = document.querySelectorAll('.option')
const filter = document.querySelector('.filter')
const countrys = document.querySelector('.countrys')
const main = document.querySelector('.main')


const dropdown = document.querySelector('.select_container')
const dropDownC = document.querySelector('.options')
let abierto = false
dropdown.addEventListener('click', () => {
    console.log(Response)
    if (abierto) {
        abierto = !abierto
        dropDownC.classList.remove('options_visible')
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                filter.innerText = e.target.innerText
            })
        })
    } else {
        abierto = !abierto
        dropDownC.classList.add('options_visible')
    }

})


//generar paises al inicio
export function generarPaises() {
    const generatedData = []
    fetch('./data.json')
        .then(res => res.json()).
        then(data => {
            
            for (let i = 0; i < 250; i++) {
                const x = data.countrys[i]
                generatedData.push(x)
            }
            Article(generatedData)
            localStorage.setItem('Country', JSON.stringify(main.innerHTML))


        }).then(() => {
            const articles = document.querySelectorAll('.article')
            const main = document.querySelector('.main')
            const generatedData = [];
            articles.forEach(x => {
                x.addEventListener('click', (e) => {
                    const art = e.currentTarget
                    generatedData.push(x);
                    const h3 = art.querySelector('h3').innerText
                    buscarIndice(h3).then(res => {
                        Details(res)
                    })
                })



            })
        })
    }

    generarPaises()

    //Buscar indice del pais
    async function buscarIndice(title) {
        const res = await fetch('./data.json')
        const data = await res.json()
        let indice = null
        for (let i = 0; i < data.countrys.length; i++) {
            if (data.countrys[i].name==title) {
                indice = i
            }
        }
        return indice

    }
    console.log('h')



    //Crear pelicula
    function Article(x) {
        for (let i = 0; i < x.length; i++) {
            const fragment = document.createDocumentFragment()
            const article = document.createElement('article')
            article.classList.add('article')
            const figure = document.createElement('figure')
            const img = document.createElement('img')
            img.setAttribute('src', x[i].flag)
            img.setAttribute('alt', x[i].name)
            figure.appendChild(img)
            figure.classList.add('poster')
            article.appendChild(figure)
            const text = document.createElement('div')
            text.classList.add('text')
            const h3 = document.createElement('h3')
            h3.innerText = x[i].name
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









