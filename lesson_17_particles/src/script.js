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

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const particleTextures = {
  1: textureLoader.load('/textures/particles/1.png'),
  2: textureLoader.load('/textures/particles/2.png'),
  3: textureLoader.load('/textures/particles/3.png'),
  4: textureLoader.load('/textures/particles/4.png'),
  5: textureLoader.load('/textures/particles/5.png'),
  6: textureLoader.load('/textures/particles/6.png'),
  7: textureLoader.load('/textures/particles/7.png'),
  8: textureLoader.load('/textures/particles/8.png'),
  9: textureLoader.load('/textures/particles/9.png'),
  10: textureLoader.load('/textures/particles/10.png'),
  11: textureLoader.load('/textures/particles/11.png'),
  12: textureLoader.load('/textures/particles/12.png'),
  13: textureLoader.load('/textures/particles/13.png'),
}

// particles
const particleData = {
  radius: 1,
  widthSegments: 32,
  heightSegments: 32,
  size: 0.1,
  sizeAttenuation: true,
  numParticles: 5000
}

const particlesGeometry = new THREE.BufferGeometry()

const positions = new Float32Array(particleData.numParticles * 3)
const colors = new Float32Array(particleData.numParticles * 3)

for (let i = 0; i < particleData.numParticles * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10
  colors[i] = Math.random()
}

const particlePositions = new THREE.BufferAttribute(positions, 3)
const particleColors = new THREE.BufferAttribute(colors, 3)

particlesGeometry.setAttribute('position', particlePositions)
particlesGeometry.setAttribute('color', particleColors)


const particlesMaterial = new THREE.PointsMaterial({
  size: particleData.size,
  sizeAttenuation: particleData.sizeAttenuation,
  alphaMap: particleTextures[2],
  transparent: true,
  // alphaTest: 0.01,
  // depthTest: false,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true 
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

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
camera.position.z = 3
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // update particles
    // particles.rotation.y = elapsedTime / 2
    for (let i = 0; i < particleData.numParticles; i++) {
      const i3 = i * 3
      const x = particlesGeometry.attributes.position.array[i3 + 0]
      particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }

    particlesGeometry.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()