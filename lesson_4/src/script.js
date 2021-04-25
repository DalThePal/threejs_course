import './style.css'
import * as THREE from 'three'

console.log(THREE)

// SCENE
const scene = new THREE.Scene()

// MESH (cube)
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 'red'
})
const mesh = new THREE.Mesh(geometry, material)

// add mesh to scene
scene.add(mesh)

// CAMERA
const sizes = {
  width: 800,
  height: 600
}
const ratio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, ratio)
camera.position.z = 3
camera.position.x = 2
camera.position.y = 1

// add camera to scene
scene.add(camera)

// RENDERER
let canvas = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera) 
