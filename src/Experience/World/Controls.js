import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import ASScroll from '@ashthornton/asscroll'


import Experience from '../Experience.js'

export default class Controls {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.room = this.experience.world.room.actualRoom
        this.room.children.forEach(child => {
            if (child.type === "RectAreaLight") {
                this.rectLight = child
            }
        })
        

        this.circleFirst = this.experience.world.floor.circleFirst
        this.circleSecond = this.experience.world.floor.circleSecond
        this.circleThird = this.experience.world.floor.circleThird

        gsap.registerPlugin(ScrollTrigger)

        document.querySelector('.page').style.overflow = 'visible'

        this.setSmoothScroll()
        this.scrollTrigger()
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.1,
            disableRaf: true
        });


        gsap.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        });


        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            fixedMarkers: true
        });


        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")
            });

        });
        return asscroll;
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll()
    }



    scrollTrigger() {
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
        this.rectLight.width = 0.2
        this.rectLight.height = 0.55

        ScrollTrigger.matchMedia({


            // Desktop
            "(min-width: 969px)": () => {

                this.room.scale.set(0.11, 0.11, 0.11)

                

                // First Section ------------------------------------------
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.00098
                    }
                })

                // Second Section  -----------------------------------------
                this.secondMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return 0
                    },
                    z: () => {
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
                    scrollTrigger: {
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

                this.room.scale.set(0.07, 0.07, 0.07)
                this.room.position.set(0, 0, 0)
                this.rectLight.width *= 0.7
                this.rectLight.height *= 0.7

                // First Section ------------------------------------------
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
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
                    scrollTrigger: {
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
                    scrollTrigger: {
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

                // Progress Bar
                this.sections = document.querySelectorAll('.section')
                this.sections.forEach((section) => {
                    this.progressWrapper = section.querySelector('.progress-wrapper')
                    this.progressBar = section.querySelector('.progress-bar')

                    if (section.classList.contains("right")) {
                        gsap.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: 'top bottom',
                                end: 'top top',
                                scrub: 0.6,
                            }
                        })
                        gsap.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: 'bottom bottom',
                                end: 'bottom top',
                                scrub: 0.6,
                            }
                        })
                    } else {
                        gsap.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: 'top bottom',
                                end: 'top top',
                                scrub: 0.6,
                            }
                        })
                        gsap.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: 'bottom bottom',
                                end: 'bottom top',
                                scrub: 0.6,
                            }
                        })
                    }
                    gsap.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: 'top top',
                            end: 'bottom bottom',
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false
                        }
                    })
                })

                // All Animation --------
                // First Section ------------------------------------------
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3
                })

                // Second Section  -----------------------------------------
                this.secondMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.circleSecond.scale, {
                    x: 3,
                    y: 3,
                    z: 3
                }, 'same').to(this.room.position, {
                    y: 0.15
                }, 'same')

                // Third Section ------------------------------------------
                this.thirdMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.circleThird.scale, {
                    x: 3,
                    y: 3,
                    z: 3
                })


                // Mini Plateform
                this.secondPartTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        start: 'center center',
                    }
                })

                this.room.children.forEach(child => {
                    if (child.name === "Mini_Floor") {
                        this.first = gsap.to(child.position, {
                            x: -1.45369,
                            z: 6.73947,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if (child.name === "Mailbox") {
                        this.second = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if (child.name === "Lamp") {
                        this.third = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if (child.name === "FlowerOne") {
                        this.fourth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if (child.name === "FlowerTwo") {
                        this.fifth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if (child.name === "FloorFirst") {
                        this.sixth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if (child.name === "FloorSecond") {
                        this.seventh = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if (child.name === "FloorThird") {
                        this.eighth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if (child.name === "Dirt") {
                        this.ninth = gsap.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                })
                this.secondPartTimeline.add(this.first)
                this.secondPartTimeline.add(this.second, '-=0.2')
                this.secondPartTimeline.add(this.third, '-=0.2')

                this.secondPartTimeline.add(this.ninth, '-=0.2')
                this.secondPartTimeline.add(this.fourth, '-=0.2')
                this.secondPartTimeline.add(this.fifth, '-=0.2')
                this.secondPartTimeline.add(this.sixth, '-=0.2')
                this.secondPartTimeline.add(this.seventh)
                this.secondPartTimeline.add(this.eighth, '-=0.1')


            }

        });
    }

    reseize() { }

    update() {


    }
}