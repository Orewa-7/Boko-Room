import EventEmitter from './Utils/EventEmitter.js'
import Experience from './Experience.js'
import convert from './Utils/convertDivsToSpans.js'

import gsap from 'gsap'


export default class Preloader extends EventEmitter {
    constructor() {
        super()

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.world = this.experience.world
        this.device = this.sizes.device

        this.sizes.on('switchdevice', (device) => {
            this.device = device
        })


        this.world.on('worldready', () => {
            this.setAssets()
            this.playIntro()
        })
    }

    setAssets() {
        convert(document.querySelector('.intro-text'))
        convert(document.querySelector('.hero-main-title'))
        convert(document.querySelector('.hero-main-description'))
        convert(document.querySelector('.hero-second-subheading'))
        convert(document.querySelector('.second-sub'))
        this.room = this.experience.world.room.actualRoom
        this.roomChildren = this.experience.world.room.roomChildern
        console.log(this.roomChildren);

    }

    firstIntro() {
        

        return new Promise((resolve) => {
            this.timeline = new gsap.timeline()
            this.timeline.to('.preLoader', {
                delay: 1,
                opacity: 0,
                onComplete: ()=>{
                    document.querySelector('.preLoader').classList.add('hidden')
                }
            })

            if (this.device === 'desktop') {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'Back.out(2.5)',
                    duration: 0.7,
                }).to(this.room.position, {
                    x: -1,
                    ease: "power1.out",
                    duration: 0.7,
                    onComplete: resolve
                })
            } else {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: 'Back.out(2.5)',
                    duration: 0.7,
                }).to(this.room.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                })
            }
            this.timeline
            .to('.intro-text .animatedis', {
                yPercent: -100,
                stagger: 0.05,
                ease: 'back.out(1.7)',
            })
            .to('.arrow-svg-wrapper', {
                opacity: 1,
            }, 'same')
            .to('.toggle-bar', {
                opacity: 1,
                onComplete: resolve
            }, 'same')
        })

    }
    secondIntro() {
        return new Promise(resolve => {
            this.secondTimeline = new gsap.timeline()

            this.secondTimeline
            .to('.intro-text .animatedis', {
                yPercent: 100,
                stagger: 0.05,
                ease: 'back.in(1.7)',
            }, 'fadeout')
            .to('.arrow-svg-wrapper', {
                opacity: 0,
            }, 'fadeout')
            .to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
            },'same')
                .to(this.roomChildren.cube.rotation, {
                    y: 2 * Math.PI + Math.PI * 0.25
                }, 'same')
                .to(this.roomChildren.cube.scale, {
                    x: 5,
                    y: 5,
                    z: 5
                }, 'same')
                .to(this.camera.orthographicCamera.position, {
                    y: 3.5
                }, 'same')
                .to(this.roomChildren.cube.position, {
                    x: 0,
                    y: 5.71374,
                    z: 1.21017
                }, 'same')
                .set(this.roomChildren.body.scale, {
                    x: 1,
                    y: 1,
                    z: 1
                })
                .to(this.roomChildren.cube.scale, {
                    x: 0,
                    y: 0,
                    z: 0
                }, 'introtext')
                .to('.hero-main-title .animatedis', {
                    yPercent: -100,
                    stagger: 0.07,
                    ease: 'back.out(1.7)',
                }, 'introtext')
                .to('.hero-main-description .animatedis', {
                    yPercent: -100,
                    stagger: 0.07,
                    ease: 'back.out(1.7)',
                }, 'introtext')
                .to('.first-sub .animatedis', {
                    yPercent: -100,
                    stagger: 0.07,
                    ease: 'back.out(1.7)',
                }, 'introtext')
                .to('.second-sub .animatedis', {
                    yPercent: -100,
                    stagger: 0.07,
                    ease: 'back.out(1.7)',
                }, 'introtext')
                .to(this.roomChildren.aquarium.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                }, ">-0.5")
                .to(this.roomChildren.clock.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                }, ">-0.4")
                .to(this.roomChildren.shelves.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                }, ">-0.3")
                .to(this.roomChildren.floor_items.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                }, ">-0.2")
                .to(this.roomChildren.desks.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                }, ">-0.2")
                .to(this.roomChildren.table_stuff.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                }, ">-0.2")
                .to(this.roomChildren.desks.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                } , ">-0.2")
                .to(this.roomChildren.computer.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                }, ">-0.2")
                
                .to(this.roomChildren.chair.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                }, 'chair', ">-0.2")
                .to(this.roomChildren.chair.rotation, {
                    y: 4 * Math.PI + Math.PI * 0.25,
                    ease: "power2.out",
                    duration: 1,
                }, 'chair', ">-0.2")
                .to(this.roomChildren.mini_floor.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.5,
                }, ">-0.2")
                .to('.arrow-svg-wrapper', {
                    opacity: 1,
                    onComplete: resolve

                })

        })

    }


    onScroll(e) {
        if (e.deltaY > 0) {
            console.log('added event')
            this.removeEventListeners()
            this.playSecondIntro()

        }
    }
    
    onTouch(e){
        this.initialY = e.touches[0].clientY
    }

    onTouchMove(e){
        let currentY = e.touches[0].clientY
        let difference = this.initialY - currentY
        if(difference > 0){
            this.removeEventListeners()
            this.playSecondIntro()
        }
        this.initialY = null
    }

    removeEventListeners(){
        window.removeEventListener('wheel', this.scrollOnceEvent)
        window.removeEventListener('touchstart', this.touchStart)
        window.removeEventListener('touchmove', this.touchMove)
    }

    async playIntro() {
        await this.firstIntro()
        this.moveFlag = true
        this.scrollOnceEvent = this.onScroll.bind(this)
        this.touchStart = this.onTouch.bind(this)
        this.touchMove = this.onTouchMove.bind(this)

        window.addEventListener('wheel', this.scrollOnceEvent)
        window.addEventListener('touchstart', this.touchStart)
        window.addEventListener('touchmove', this.touchMove)
    }

    async playSecondIntro() {
        this.moveFlag = false
        this.scaleFlag = true
        await this.secondIntro()
        this.scaleFlag = false
        console.log('enable')

        this.trigger('enablecontrols')
    }

    move(){
        if(this.device === "desktop"){
            this.room.position.set(-1, 0, 0)
        } else {
            this.room.position.set(0, 0, -1)

        }
    }

    scale(){
        if(this.device === "desktop"){
            this.room.scale.set(0.11, 0.11, 0.11)
        } else {
            this.room.scale.set(0.07, 0.07, 0.07)

        }
    }

    update(){
        if(this.moveFlag)
            this.move()
        if(this.scaleFlag)
            this.scale()
    }
}