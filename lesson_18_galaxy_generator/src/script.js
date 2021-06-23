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

// Galaxy
const galaxyData = {
  count: 10000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.02,
  randomnessPower: 3,
  insideColor: "#ff6030",
  outsideColor: "#1b3984"
}

let geometry = null
let material = null
let points = null

const generateGalaxy = () => {

  if (points) {
    geometry.dispose()
    material.dispose()
    scene.remove(points)
  }

  geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(galaxyData.count * 3)
  const colors = new Float32Array(galaxyData.count * 3)

  const colorInside = new THREE.Color(galaxyData.insideColor)
  const colorOutside = new THREE.Color(galaxyData.outsideColor)

  for (let i = 0; i < galaxyData.count; i++) {
    const i3 = i * 3

    const radius = Math.random() * galaxyData.radius
    const spinAngle = radius * galaxyData.spin
    const branchAngle = (i % galaxyData.branches) / galaxyData.branches * Math.PI * 2

    const randomX = Math.pow(Math.random(), galaxyData.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
    const randomY = Math.pow(Math.random(), galaxyData.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
    const randomZ = Math.pow(Math.random(), galaxyData.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

    positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[i3 + 1] = randomY
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    // color
    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / galaxyData.radius)

    colors[i3 + 0] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
  }

  const positionAttribute = new THREE.BufferAttribute(positions, 3)
  geometry.setAttribute('position', positionAttribute)

  const colorAttribute = new THREE.BufferAttribute(colors, 3)
  geometry.setAttribute('color', colorAttribute)

  material = new THREE.PointsMaterial({
    size: galaxyData.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  })

  points = new THREE.Points(geometry, material)
  scene.add(points)
}

generateGalaxy()

gui.add(galaxyData, 'count').min(100).max(100000).step(100).onFinishChange(generateGalaxy)
gui.add(galaxyData, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
gui.add(galaxyData, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
gui.add(galaxyData, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(galaxyData, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
gui.add(galaxyData, 'randomness').min(0).max(2).step(0.01).onFinishChange(generateGalaxy)
gui.add(galaxyData, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
gui.addColor(galaxyData, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(galaxyData, 'outsideColor').onFinishChange(generateGalaxy)

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
camera.position.x = 3
camera.position.y = 3
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()