//Es la encargada de recupera le valor del input de filtrado
import { peticion } from "../app.js"
import { generarPaises } from "./Paises.js"
export function handlesubmit() {
    const form = document.querySelector('form')
    const input = document.querySelector('#search')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        buscar(input.value)
    })

}

function buscar(title) {
    const countrys = document.querySelector('.countrys')
    countrys.innerHTML = 'Loading'
    const pais = []
    peticion().then(res => {
        const indice = res.findIndex(x=>x.name.common==title)
        return res[indice]
    }).then(data => {
    
        if(data==undefined){
            const p=document.createElement('p')
            p.innerText="No results found"
            countrys.innerHTML=p.innerText
            return
        }
        countrys.innerHTML = ""
        console.log(data)
        pais.push(data)
        generarPaises(pais)
    })

}

