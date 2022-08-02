import Experience from '../Experience.js'
import Room from './Room.js'
import Environment from './Environment.js'

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
        })
        
    }

    update()
    {
        
    }
}