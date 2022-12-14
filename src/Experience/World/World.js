import Experience from '../Experience.js'
import Room from './Room.js'
import Environment from './Environment.js'
import Controls from './Controls.js'
import Floor from './Floor.js'
import EventEmitter from '../Utils/EventEmitter.js'


export default class World extends EventEmitter
{
    constructor()
    {
        super()
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.theme = this.experience.theme

        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.environment = new Environment()
            this.floor = new Floor()
            this.room = new Room()
            // this.controls = new Controls()
            this.trigger('worldready')
        })
        
        this.theme.on('switch', theme =>{
            this.switchTheme(theme)
        })
        
    }
    switchTheme(theme){
        if(this.environment){
            this.environment.switchTheme(theme)
        }
    }

    reseize(){}

    update()
    {
        if(this.room){
            this.room.update()
        }

        if(this.controls){
            this.controls.update()
        }
    }
}