import * as THREE from './three/build/three.module.js'

let scene, cam, renderer
let box, triangle, plane, sphere
let spotLight, directLight

let createBox = () =>{
    let bGeo = new THREE.BoxGeometry(6,5,3)
    let bMat = new THREE.MeshPhongMaterial({
        color: 0xFF0000
    })

    return new THREE.Mesh(bGeo, bMat)
}

let createTriangle = () => {
    let tGeo = new THREE.CircleGeometry(1.4,3)
    let tMat = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF
    })

    return new THREE.Mesh(tGeo, tMat)
}

let createPlane = () =>{
    let pGeo = new THREE.PlaneGeometry(50,50)
    let pText = new THREE.TextureLoader().load('./assets/sapphire.jpg')
    let pMat = new THREE.MeshPhongMaterial({
        map: pText,
        side: THREE.DoubleSide
    })
    return new THREE.Mesh(pGeo, pMat)
}

let createSphere = () => {
    let sGeo = new THREE.SphereGeometry(2,32,32)
    let sText = new THREE.TextureLoader().load('./assets/MetalScifi/Metal_Sci-fi_003_basecolor.jpg')
    let sNormText = new THREE.TextureLoader().load('./assets/MetalScifi/Metal_Sci-fi_003_normal.jpg')
    let sMat = new THREE.MeshPhongMaterial({
        color: 0x778899,
        shininess: 7,
        specular: 0xFFFFFF,
        map: sText,
        normalMap: sNormText
    })

    return new THREE.Mesh(sGeo, sMat)
}

let createSpotLight = () => {
    return new THREE.SpotLight(0xFFFFFF, 0.8, 1000, Math.PI/6)
}

let createDirectLight = () => {
    return new THREE.DirectionalLight(0xFFFFFF, 0.5)
}

function init() {
    scene = new THREE.Scene()

    let fov = 45
    let near = 0.1
    let far = 1000
    let width = window.innerWidth
    let height = window.innerHeight
    let aspect = width/height

    cam = new THREE.PerspectiveCamera(fov, aspect, near, far)
    cam.position.set(20,7,11)
    cam.lookAt(0,0,0)

    renderer = new THREE.WebGLRenderer({antialias : true})
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true

    spotLight = createSpotLight()
    spotLight.position.set(10,40,5)
    spotLight.shadowMapWidth = 2048
    spotLight.shadowMapHeight = 2048
    spotLight.targetObject = box
    spotLight.castShadow = true

    directLight = createDirectLight()
    directLight.position.set(7,2,5)
    directLight.shadowMapWidth = 2048
    directLight.shadowMapHeight = 2048
    directLight.targetObject = box
    directLight.castShadow = true

    box = createBox()
    box.position.set(7.5,3.5,0)
    box.rotation.y = Math.PI/5
    box.castShadow = true

    triangle = createTriangle()
    triangle.position.set(8.5,3.6,1.5)
    triangle.rotation.y = Math.PI/5
    triangle.castShadow = true

    plane = createPlane()
    plane.position.set(1,1,2)
    plane.rotation.set(Math.PI/2, 0, Math.PI/3)
    plane.receiveShadow = true

    sphere = createSphere()
    sphere.position.set(6,3,9)
    sphere.castShadow = true


    scene.add(box)
    scene.add(triangle)
    scene.add(plane)
    scene.add(sphere)

    scene.add(spotLight)
    scene.add(directLight)

    document.body.appendChild(renderer.domElement)
}

function rendering(){
    renderer.render(scene, cam)
    requestAnimationFrame(rendering)
}

window.onload = () => {
    init()
    rendering()
}

window.onresize = () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize(width, height)
}