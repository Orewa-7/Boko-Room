import EventEmitter from './Utils/EventEmitter.js'
import Experience from './Experience.js'

import gsap from 'gsap'


export default class Preloader extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.world = this.experience.world
        this.device = this.sizes.device

        this.sizes.on('switchdevice', (device) =>{
            this.device = device
        })


        this.world.on('worldready', ()=>{
            this.setAssets()
            this.playIntro()
        })
    }

    setAssets(){
        this.room = this.experience.world.room.actualRoom
        this.roomChildren = this.experience.world.room.roomChildern
        console.log(this.roomChildren);

    }

    firstIntro(){
        this.timeline = new gsap.timeline()

        return new Promise((resolve)=>{
            if(this.device === 'desktop') {
                this.timeline.to(this.roomChildren.cube.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'Back.out(2.5)',
                    duration: 0.7,
                }).to(this.room.position,{
                    x: -1,
                    ease: "power1.out",
                    duration: 0.7,
                    onComplete: resolve
                })
            } else {
                this.timeline.to(this.roomChildren.cube.scale,{
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: 'Back.out(2.5)',
                    duration: 0.7,
                }).to(this.room.position,{
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                    onComplete: resolve
                })
            }
        })
        
    }

    onScroll(e){
        if(e.deltaY > 0){
            console.log('added event')
            window.removeEventListener('wheel', this.scrollOnceEvent)
            this.playSecondIntro()

        }
    }
    //7: 27: 30
    async playIntro(){
        await this.firstIntro()
        this.scrollOnceEvent = this.onScroll.bind(this)
        window.addEventListener('wheel', this.scrollOnceEvent)
    }

    playSecondIntro(){
        this.secondTimeline = new gsap.timeline()

        if(this.device === 'desktop') {
            this.secondTimeline.to(this.room.position,{
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
                duration: 0.7
            })
        } else {
            this.secondTimeline.to(this.room.position,{
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
                duration: 0.7
            })
        }
    }

}