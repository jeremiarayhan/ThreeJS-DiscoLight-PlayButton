import * as THREE from './three/build/three.module.js'

let scene, cam, renderer

function init() {
    scene = new THREE.Scene()

    let fov = 45
    let width = window.innerWidth
    let height = window.innerHeight
    let aspect = width/height

    cam = new THREE.PerspectiveCamera(fov, aspect)
    cam.position.set(0,0,0)
    cam.lookAt(0,0,0)

    renderer = new THREE.WebGLRenderer({antialias : true})
    renderer.setSize(width, height)


    document.body.appendChild(renderer.domElement)
}

function render(){
    renderer.render(scene, cam)
}

window.onload = () => {
    init()
    render()
}

window.onresize = () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize(width, height)
}