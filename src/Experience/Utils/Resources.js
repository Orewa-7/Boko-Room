import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'


import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor(sources, )
    {
        super()

        // Options
        this.sources = sources

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0


        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()

        this.loaders.glbLoader = new GLTFLoader()
        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.dracoLoader.setDecoderPath('/draco/')
        this.loaders.glbLoader.setDRACOLoader(this.loaders.dracoLoader)

        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'glbModel')
            {
                this.loaders.glbLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'videoTexture')
            {
                this.video = {}
                this.videoTexture = {}

                this.video[source.name] = document.createElement("video")
                this.video[source.name].src = source.path
                this.video[source.name].muted = true
                this.video[source.name].playInline = true
                this.video[source.name].autoPLay = true
                this.video[source.name].loop = true
                this.video[source.name].play()

                this.videoTexture[source.name] = new THREE.VideoTexture(
                    this.video[source.name]
                ) 

                this.videoTexture[source.name].flipY = true
                this.videoTexture[source.name].minFilter = THREE.NearestFilter
                this.videoTexture[source.name].magFilter = THREE.NearestFilter
                this.videoTexture[source.name].generateMipmaps = false
                this.videoTexture[source.name].encoding = THREE.sRGBEncoding

                
                this.sourceLoaded(source, this.videoTexture[source.name])
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}