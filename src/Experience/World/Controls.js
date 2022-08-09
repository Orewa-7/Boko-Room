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
        this.room.children.forEach(child => {
            if(child.type === "RectAreaLight"){
                this.rectLight = child
            }
        })
        gsap.registerPlugin(ScrollTrigger)

        this.scrollTrigger()

    }

    scrollTrigger(){
        // this.timeline = new gsap.timeline()
        // this.timeline.to(this.room.position,{
        //     x: () => {
        //          return this.sizes.width * 0.00098
        //     },
        //     scrollTrigger:{
        //         trigger: '.first-move',
        //         markers: true,
        //         start: "top top",
        //         end: "bottom bottom",
        //         scrub: 0.6,
        //         invalidateOnRefresh: true 
        //     }
        // })

        ScrollTrigger.matchMedia({
	
            // Desktop
            "(min-width: 969px)": () => {
                // First Section ------------------------------------------
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                this.firstMoveTimeline.to(this.room.position, {
                    x: () =>{
                        return this.sizes.width * 0.00098
                    }
                })

                // Second Section  -----------------------------------------
                this.secondMoveTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                this.secondMoveTimeline.to(this.room.position, {
                    x: () =>{
                        return 1
                    },
                    z: () =>{
                        return this.sizes.height * 0.00098
                    }
                }, 'same')
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                }, 'same')
                this.secondMoveTimeline.to(this.rectLight, {
                    width: 0.2 * 4,
                    height: 0.55 * 4
                }, 'same')

            },

            // Mobile 
            "(max-width: 968px)": () => {

            },
              
            // all 
            "all": function() {
            }
              
          }); 
    }

    reseize(){}

    update()
    {
        

    }
}