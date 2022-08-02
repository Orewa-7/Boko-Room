import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from './Experience.js'

export default class Camera {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setPerspectiveCamera()
        this.setOrthographicCamera()

        this.setControls()
    }

    setPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 100)
        this.scene.add(this.perspectiveCamera)
        this.perspectiveCamera.position.z = 5
    }

    setOrthographicCamera() {
        this.frustrum = 5
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.frustrum) / 2,
            (this.sizes.aspect * this.frustrum) / 2,
            this.frustrum / 2,
            -this.frustrum / 2,
            -100,
            100
        )
        this.scene.add(this.orthographicCamera)

        const size = 10;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper( 10 );
        this.scene.add( axesHelper );
    }

    setControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
        this.controls.enableDamping = true
        this.controls.enableZoom = true
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()

        this.orthographicCamera.left = (-this.sizes.aspect * this.frustrum) / 2
        this.orthographicCamera.right = (this.sizes.aspect * this.frustrum) / 2
        this.orthographicCamera.top = this.frustrum / 2
        this.orthographicCamera.bottom = -this.frustrum / 2
        this.orthographicCamera.updateProjectionMatrix()

    }

    update() {
        this.controls.update()
    }
}