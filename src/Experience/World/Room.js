import * as THREE from 'three'
import gsap from 'gsap'

import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import Experience from '../Experience.js'

export default class Room {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.room = this.resources.items.RoomModel
        this.actualRoom = this.room.scene
        this.roomChildern = {}

        this.device = this.sizes.device
        this.sizes.on('switchdevice', (device) => {
            this.device = device
        })

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        }

        this.setModel()
        this.setAnimation()
        this.onMouseMove()

    }

    setModel() {

        this.actualRoom.children.forEach((child) => {
            child.castShadow = true
            child.receiveShadow = true

            if (child instanceof THREE.Group) {
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true
                    groupChild.receiveShadow = true
                })
            }
            if (child.name === "Aquarium") {
                child.children[0].material = new THREE.MeshPhysicalMaterial()
                child.children[0].material.roughness = 0
                child.children[0].material.color.set(0x549dd2)
                child.children[0].material.ior = 3
                child.children[0].material.transmission = 1
                child.children[0].material.opacity = 1
            }
            if (child.name === "Computer") {
                child.children[1].material = new THREE.MeshBasicMaterial()
                child.children[1].material.map = this.resources.items.OnePiece
            }
            if (child.name === "Mini_Floor") {
                child.position.x = 1.39599 
                child.position.z = 3.88979
            }
            // if (child.name === "Mailbox" || 
            //     child.name === "Lamp" || 
            //     child.name === "FlowerOne" || 
            //     child.name === "FlowerTwo" || 
            //     child.name === "FloorFirst" || 
            //     child.name === "FloorSecond" || 
            //     child.name === "FloorThird" || 
            //     child.name === "Dirt") {

            //     child.scale.set(0,0,0)
            // }
            
            child.scale.set(0,0,0)

            if (child.name === "Cube"){
                // child.scale.set(1,1,1)
                child.position.set(0, 0.3, 0)
                child.rotation.y = Math.PI * 0.25
            }

            this.roomChildern[child.name.toLowerCase()] = child

        })

        const width = 0.2;
        const height = 0.55;
        const intensity = 3;
        const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
        rectLight.position.set(4.31207, 5.7, 0.282147)
        rectLight.rotation.x = - Math.PI * 0.5
        rectLight.rotation.z = Math.PI * 0.25
        this.actualRoom.add(rectLight)

        this.roomChildern['rectLight'] = rectLight


        // const rectLightHelper = new RectAreaLightHelper(rectLight);
        // rectLight.add(rectLightHelper);

        this.scene.add(this.actualRoom)

        if(this.device === 'desktop')
            this.actualRoom.scale.set(0.11, 0.11, 0.11)
        else 
            this.actualRoom.scale.set(0.07, 0.07, 0.07)

    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom)
        this.swim = this.mixer.clipAction(this.room.animations[0])
        this.swim.play()

    }

    onMouseMove() {
        window.addEventListener("mousemove", event => {
            this.rotation = ((event.clientX - window.innerWidth / 2) * 2) / window.innerWidth
            this.lerp.target = this.rotation * 0.1
        })
    }

    reseize() { }

    update() {
        this.lerp.current = gsap.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        )

        this.actualRoom.rotation.y = this.lerp.current

        this.mixer.update(this.time.delta * 0.0009)

    }
}