import { generarPaises } from "./modulos/Paises.js"
import { eventdropDown } from "./modulos/filter.js"
import { handlesubmit } from "./modulos/busquedas.js"
import { activeToogle } from "./modulos/toggle.js"

//peticion general
export async function peticion() {
    const res = await fetch('https://restcountries.com/v3.1/all')
    const data = await res.json()
    return data
}

eventdropDown()//se encarag de gestionar el menu de filtrado
handlesubmit()// se encarga de enviar y buscar pasa
peticion().then(data => generarPaises(data))//genera todos lso paises al inicio
activeToogle()



