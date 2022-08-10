import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()
        // Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.aspect = this.width / this.height
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.frustrum = 3

        if(this.width < 968){
            this.device = "mobile"
        } else {
            this.device = "desktop"
        }


        // Resize event
        window.addEventListener('resize', () =>
        {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.aspect = this.width / this.height
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.trigger('resize')

            if(this.width < 968 && this.device !== 'mobile'){
                this.device = "mobile"
                this.trigger('switchdevice', [this.device])
                console.log('mobile')
            } else if(this.width >= 968 && this.device !== 'desktop') {
                this.device = "desktop"
                this.trigger('switchdevice', [this.device])
                console.log('desktop')

            }
        })
    }
}