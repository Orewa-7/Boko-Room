import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

import Experience from '../Experience.js'

export default class Controls
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.room = this.experience.world.room.actualRoom
        gsap.registerPlugin(ScrollTrigger)

        this.setPath()

    }

    setPath(){
        this.timeline = new gsap.timeline()
        this.timeline.to(this.room.position,{
            x: () => {
                 return this.sizes.width * 0.00098
            },
            scrollTrigger:{
                trigger: '.first-move',
                markers: true,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true 
            }
        })
    }

    reseize(){}

    update()
    {
        

    }
}