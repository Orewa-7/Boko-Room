import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../Experience.js'
import GUI from 'lil-gui'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.debug = this.experience.debug
        this.obj = {}


    
        this.setSunLight()

    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight('#ffffff', 3)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 20
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(-1.5, 7, 3)
        this.scene.add(this.sunLight)

        this.ambientLight = new THREE.AmbientLight("#ffffff", 1)
        this.scene.add(this.ambientLight)

    }

    switchTheme(theme){
        if(theme === "dark"){
            gsap.to(this.sunLight.color,{
                r: 0.1725,
                g: 0.2313,
                b: 0.6862,
            })
            gsap.to(this.ambientLight.color,{
                r: 0.1725,
                g: 0.2313,
                b: 0.6862,
            })
            gsap.to(this.sunLight, {
                intensity: 0.78
            })
            gsap.to(this.ambientLight, {
                intensity: 0.78
            })
        } else{
            gsap.to(this.sunLight.color,{
                r: 255/255,
                g: 255/255,
                b: 255/255,
            })
            gsap.to(this.ambientLight.color,{
                r: 255/255,
                g: 255/255,
                b: 255/255,
            })
            gsap.to(this.sunLight, {
                intensity: 3
            })
            gsap.to(this.ambientLight, {
                intensity: 1
            })
        }
    }

    update()
    {
        
    }
}