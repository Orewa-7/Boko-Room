import EventEmitter from './Utils/EventEmitter.js'

export default class Theme extends EventEmitter
{
    constructor()
    {
        super()
        this.theme = "light"

        this.toggleButton = document.querySelector('.toggle-button')
        this.toggleCircle = document.querySelector('.toggle-circle')
    
        this.setEvenetListeners()
    }

    setEvenetListeners(){
        this.toggleButton.addEventListener('click', ()=>{
            this.toggleCircle.classList.toggle("slide")
            this.theme = this.theme === "light" ? "dark" : "light"
            this.trigger('switch', [this.theme])
        })
    }
}