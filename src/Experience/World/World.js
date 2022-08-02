import Experience from '../Experience.js'
import Room from './Room.js'
import Environment from './Environment.js'
import Controls from './Controls.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
    
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.environment = new Environment()
            this.room = new Room()
            this.controls = new Controls()
        })
        
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