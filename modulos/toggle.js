export function activeToogle() {
    const toggle = document.querySelector('.header_figure')
    toggle.addEventListener('click', DarkMode)
}
let toggleAbierto = false
function DarkMode() {
    const body = document.querySelector('body')
    const header = document.querySelector('.header')
    const main = document.querySelector('.main')
    if (!toggleAbierto) {
        toggleAbierto = !toggleAbierto
        body.classList.add('dark')
        header.classList.add('header_dark')
        main.classList.add('main_dark')
        
        
    } else {
        body.classList.remove('dark')
        header.classList.remove('header_dark')
        main.classList.remove('main_dark')
        toggleAbierto = !toggleAbierto

    }
   
}
