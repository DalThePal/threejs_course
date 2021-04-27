import './style.css'
import * as THREE from 'three'

console.log(THREE)

// SCENE
const scene = new THREE.Scene()

const group = new THREE.Group()
group.position.set(0, 1, 0)
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "yellow" })
)

group.add(cube1)
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
)
cube2.position.set(-2, 0, 0)
group.add(cube2)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "orange" })
)
cube3.position.set(2, 0, 0)
group.add(cube3)


// // MESH (cube)
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({
//   color: 'red'
// })
// const mesh = new THREE.Mesh(geometry, material)

// // position
// // mesh.position.x = 3
// // mesh.position.y = 2
// // mesh.position.z = 1
// mesh.position.set(0.7, - 0.6, 1)

// // scale
// // mesh.scale.x = 2
// // mesh.scale.y = 0.5
// // mesh.scale.z = 0.5
// mesh.scale.set(2, 0.5, 0.5)

// // rotation
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25

// scene.add(mesh)

// // AXES HELPER
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper)

// CAMERA
const sizes = {
  width: 800,
  height: 600
}
const ratio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, ratio)

camera.position.z = 3

scene.add(camera)

// RENDERER
let canvas = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera) 
