import * as THREE from 'three'
import gsap from 'gsap'

import Experience from '../Experience.js'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setFloor()

    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(100, 100)
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
        })
        this.plane = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.plane)
        this.plane.rotation.x = -Math.PI * 0.5
        this.plane.position.y = -0.15
        this.plane.receiveShadow = true
    }

    reseize(){}

    update()
    {
        
    }
}