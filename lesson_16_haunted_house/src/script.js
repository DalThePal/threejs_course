import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#262837', 2, 25)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughenss.jpg')

const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

/**
 * House
 */

// Group
const house = new THREE.Group()
scene.add(house)

// Walls
const wallSize = {
  width: 4,
  height: 2.5,
  depth: 4
}
const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(wallSize.width, wallSize.height, wallSize.depth),
  new THREE.MeshStandardMaterial({ color: '#ac8e82'})
)
walls.position.y = wallSize.height / 2

house.add(walls)

// Roof
const roofSize = {
  width: 3.5,
  height: 1,
  depth: 4
}
const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(roofSize.width, roofSize.height, roofSize.depth),
  new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.position.y = wallSize.height + (roofSize.height / 2)
roof.rotation.y = Math.PI / 4

house.add(roof)

// Door
const doorSize = {
  width: 2.2, 
  height: 2.2,
  widthSegments: 100,
  heightSegments: 100
}
const doorGeometry = new THREE.PlaneBufferGeometry(doorSize.width, doorSize.height, doorSize.widthSegments, doorSize.heightSegments)
const doorMaterial = new THREE.MeshStandardMaterial({
  transparent: true,
  map: doorColorTexture,
  alphaMap: doorAlphaTexture,
  aoMap: doorAmbientOcclusionTexture,
  displacementMap: doorHeightTexture,
  displacementScale: 0.1,
  normalMap: doorNormalTexture,
  metalnessMap: doorMetalnessTexture,
  roughness: doorRoughnessTexture
})

const door = new THREE.Mesh(doorGeometry, doorMaterial)
const doorUV2 = new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)

door.geometry.setAttribute('uv2', doorUV2)
door.position.z = 2 + 0.01
door.position.y = doorSize.height / 2

house.add(door)

// Bushes
const bushSize = {
  radius: 1,
  widthSegments: 16,
  heightSegments: 16
}
const bushGeometry = new THREE.SphereBufferGeometry(bushSize.radius, bushSize.widthSegments, bushSize.heightSegments)
const bushMaterial = new THREE.MeshStandardMaterial({ color: 'green' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// Graves Group
const graves = new THREE.Group()
scene.add(graves)

// Graves
const graveSize = {
  width: 0.6,
  height: 0.8,
  depth: 0.2
}
const graveGeometry = new THREE.BoxBufferGeometry(graveSize.width, graveSize.height, graveSize.depth)
const graveMaterial = new THREE.MeshStandardMaterial({ color: 'gray' })
const numGraves = 40

for (let i = 0; i < numGraves; i++) {
  const angle = Math.random() * (Math.PI * 2)
  const radius = 3 + Math.random() * 6
  const grave = new THREE.Mesh(graveGeometry, graveMaterial)

  grave.position.y = 0.3
  grave.position.x = Math.sin(angle) * radius
  grave.position.z = Math.cos(angle) * radius

  grave.rotation.y = (Math.random() - 0.5) * 0.4
  grave.rotation.z = (Math.random() - 0.5) * 0.4

  graves.add(grave)
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 5
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()