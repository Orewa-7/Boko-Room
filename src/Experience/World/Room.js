import * as THREE from 'three'
import Experience from '../Experience.js'
export default class Room
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.room = this.resources.items.RoomModel
        this.actualRoom = this.room.scene
    
        this.setModel()
        this.setAnimation()

    }

    setModel(){
        this.actualRoom.children.forEach((child)=>{
            child.castShadow = true
            child.receiveShadow = true

            if(child instanceof THREE.Group){
                child.children.forEach((groupChild)=>{
                    groupChild.castShadow = true
                    groupChild.receiveShadow = true
                })
            }
            if(child.name === "AquaGlass"){
                child.material = new THREE.MeshPhysicalMaterial()
                child.material.roughness = 0 
                child.material.color.set(0x549dd2)
                child.material.ior = 3
                child.material.transmission = 1
                child.material.opacity = 1
            }
            if(child.name === "Screen"){
                child.material = new THREE.MeshBasicMaterial()
                child.material.map = this.resources.items.OnePiece
            }
        })
        this.scene.add(this.actualRoom)
        this.actualRoom.scale.set(0.11,0.11,0.11)
    }

    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom)
        this.swim = this.mixer.clipAction(this.room.animations[0])
        this.swim.play()

    }

    reseize(){}

    update()
    {
        this.mixer.update(this.time.delta * 0.0009)
    }
}