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

                this.room.scale.set(0.11,0.11,0.11)

                this.rectLight.width = 0.2               
                this.rectLight.height = 0.55

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
                        return 0
                    },
                    z: () =>{
                        return this.sizes.height * 0.00098
                    }
                }, 'same')
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.3,
                    y: 0.3,
                    z: 0.3,
                }, 'same')
                this.secondMoveTimeline.to(this.rectLight, {
                    width: 0.2 * 3,
                    height: 0.55 * 3
                }, 'same')

                // Third Section ------------------------------------------
                this.thirdMoveTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger: '.third-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
                    y: 1,
                    x: -2
                })

            },

            // Mobile 
            "(max-width: 968px)": () => {

                this.room.scale.set(0.07,0.07,0.07)
                this.room.position.set(0,0,0)
                this.rectLight.width *= 0.7                
                this.rectLight.height *= 0.7

                // First Section ------------------------------------------
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.room.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
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
                }).to(this.room.scale, {
                    x: 0.3,
                    y: 0.3,
                    z: 0.3,
                }, 'same').to(this.rectLight, {
                    width: this.rectLight.width * 3.4,
                    height: this.rectLight.height * 3.4 
                }, 'same').to(this.room.position, {
                    x: 1.25,
                }, 'same')

                // Third Section ------------------------------------------
                this.thirdMoveTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger: '.third-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                this.thirdMoveTimeline.to(this.room.position, {
                    z: -3
                })
            },
              
            // all 
            "all": () => {
                // Mini Plateform

                this.secondPartTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger: '.third-move',
                        start: 'center center',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })

                this.room.children.forEach(child =>{
                    if(child.name === "Mini_Floor"){
                        this.first = gsap.to(child.position, {
                            x: -1.45369,
                            z: 6.73947,
                            duration: 0.3
                        })
                    }
                    if(child.name === "Mailbox"){
                        this.second = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.3
                        })
                    }
                    if(child.name === "Lamp"){
                        this.third = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.3
                        })
                    }
                    if(child.name === "FlowerOne"){
                        this.fourth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.3
                        })
                    }
                    if(child.name === "FlowerTwo"){
                        this.fifth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.3
                        })
                    }
                    if(child.name === "FloorFirst"){
                        this.sixth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.3
                        })
                    }
                    if(child.name === "FloorSecond"){
                        this.seventh = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.3
                        })
                    }
                    if(child.name === "FloorThird"){
                        this.eighth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.3
                        })
                    }
                    if(child.name === "Dirt"){
                        this.ninth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.3
                        })
                    }
                })
                this.secondPartTimeline.add(this.first)
                this.secondPartTimeline.add(this.second)
                this.secondPartTimeline.add(this.third)
                this.secondPartTimeline.add(this.fourth)
                this.secondPartTimeline.add(this.fifth)
                this.secondPartTimeline.add(this.sixth)
                this.secondPartTimeline.add(this.seventh)
                this.secondPartTimeline.add(this.eighth)
                this.secondPartTimeline.add(this.ninth)


            }
              
          }); 
    }

    reseize(){}

    update()
    {
        

    }
}