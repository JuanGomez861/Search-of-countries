const main = document.querySelector('.main')
import { generarPaises } from "./app.js"
export function Details(indice) {
    fetch('./data.json').then(res => res.json()).then(data=>{
        return data.countrys[indice]
    }).then(r=>{
        mostrarDetail(r)
    })
}


function mostrarDetail(r){
    fetch('./details.html').then(res=>res.text())
    .then(html=>generarDetail(html,r)).then(h=>{
        //mostrar details
        const mian=h.querySelector('.mian_details')
        main.innerHTML=mian.innerHTML
        //Quitar details
        const button=main.querySelector('.boton')
        button.addEventListener('click',()=>{
            
            main.innerHTML=JSON.parse(localStorage.getItem('Country'))
            generarPaises()
            
        })
        
    })
}

function generarDetail(html,r){
const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html')
        const poster=doc.querySelector('#poster')
        const name=doc.querySelector('.name')
        const native=doc.querySelector("#native")
        const population=doc.querySelector('#population')
        const region=doc.querySelector('#Region')
        const subRegion=doc.querySelector('#subregion')
        const capita=doc.querySelector('#capital')
        const top=doc.querySelector('#domain')
        const currences=doc.querySelector('#curriencies')
        const language=doc.querySelector('#language')
     
        name.innerHTML=r.name
        native.innerHTML=r.nativeName
        population.innerHTML=r.population
        region.innerHTML=r.region
        subRegion.innerHTML=r.subregion
        capita.innerHTML=r.capital
        top.innerHTML=r.topLevelDomain
        currences.innerHTML=r.currencies[0].code
        let lang=''
        for(let i=0; i<r.languages.length;i++){
            lang+=`${i>0?', ':''}${r.languages[i].name}`
        }
        language.innerHTML=lang
        poster.setAttribute('src',r.flag)

        return doc
}