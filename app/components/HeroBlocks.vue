<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const container = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let composer: EffectComposer
let meshGroup: THREE.Group
let frameId: number
let scrollTriggerInstance: ScrollTrigger | null = null

const mouse = new THREE.Vector2(0, 0)
const targetRotation = new THREE.Vector2(0, 0)
const isLoaded = ref(false)
const letterMeshes: THREE.Mesh[] = []

onMounted(() => {
  if (!container.value) return

  // Scene setup
  scene = new THREE.Scene()
  
  // Camera
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 80)
  
  // Renderer
  renderer = new THREE.WebGLRenderer({ 
    antialias: false,
    alpha: false,
    powerPreference: 'high-performance'
  })
  renderer.setClearColor(0xffffff, 1) // Force solid white background
  scene.background = new THREE.Color(0xffffff)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  // Composer for Deep Depth of Field Effect
  composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  const bokehPass = new BokehPass(scene, camera, {
    focus: 80.0,
    aperture: 0.00005,
    maxblur: 0.015,
  })
  composer.addPass(bokehPass)

  // Lights for a highly aesthetic dark-chrome material look
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
  scene.add(ambientLight)

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 2)
  dirLight1.position.set(20, 20, 10)
  scene.add(dirLight1)

  const dirLight2 = new THREE.DirectionalLight(0xba002b, 1.5) // Red/Primary accent lighting
  dirLight2.position.set(-10, -20, -10)
  scene.add(dirLight2)
  
  const pointLight = new THREE.PointLight(0x7f40b0, 1) // Purple accent
  pointLight.position.set(0, 0, 20)
  scene.add(pointLight)

  // Mesh Group to center the word and handle parallax
  meshGroup = new THREE.Group()
  scene.add(meshGroup)

  // Load Font and Create 3D Text
  const loader = new FontLoader()
  // Loading standard bold typeface from a reliable CDN
  loader.load('https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_bold.typeface.json', (font) => {
    
    const word = "PRINCE"
    
    const material = new THREE.MeshStandardMaterial({
      color: 0x050505,    // Pure dark/black 
      roughness: 0.1,     // High gloss
      metalness: 0.7,     // High metalness
    })

    let xOffset = 0
    let textHeight = 0
    
    // Generates each letter as a separate mesh for scatter scrolling
    for(let i = 0; i < word.length; i++) {
        const geometry = new TextGeometry(word[i]!, {
            font: font,
            size: 15,
            depth: 3,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.8,
            bevelSize: 0.3,
            bevelOffset: 0,
            bevelSegments: 5
        })
        
        geometry.computeBoundingBox()
        const width = geometry.boundingBox!.max.x - geometry.boundingBox!.min.x
        textHeight = geometry.boundingBox!.max.y - geometry.boundingBox!.min.y
        
        const mesh = new THREE.Mesh(geometry, material)
        
        // Centering the local geometry
        const yOffset = -textHeight / 2
        const zOffset = -(geometry.boundingBox!.max.z - geometry.boundingBox!.min.z) / 2
        
        // Creating a wrapper to easily rotate around the exact center of each letter
        const letterWrapper = new THREE.Group()
        mesh.position.set(-width / 2, yOffset, zOffset)
        letterWrapper.add(mesh)
        
        // Position the wrapper in the word string
        letterWrapper.position.x = xOffset + width / 2
        
        // Save initial coordinates for scroll animation scattering
        // @ts-ignore
        letterWrapper.userData = { 
          startX: letterWrapper.position.x,
          startZ: 0,
          randY: (Math.random() - 0.5) * 60,
          randRotX: (Math.random() - 0.5) * Math.PI * 4,
          randRotY: (Math.random() - 0.5) * Math.PI * 2
        }

        meshGroup.add(letterWrapper)
        // @ts-ignore
        letterMeshes.push(letterWrapper)
        
        xOffset += width + 1.2 // Spacing between letters
    }

    // Center the entire word group relative to the screen
    meshGroup.position.x = -xOffset / 2

    isLoaded.value = true

    // Explosive GSAP Initial Reveal Animation
    gsap.from(letterMeshes.map(m => m.position), {
      z: () => Math.random() * -200 - 50,
      y: () => (Math.random() - 0.5) * 100,
      duration: 3,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.5
    })

    gsap.from(letterMeshes.map(m => m.rotation), {
       x: () => Math.random() * Math.PI * 4,
       y: () => Math.random() * Math.PI * 4,
       duration: 3,
       stagger: 0.1,
       ease: 'power3.out',
       delay: 0.5
    })

    // GSAP ScrollTrigger for 3D Scattering
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: '.hero-blocks-container',
      start: 'top top',
      end: '+=1500',
      scrub: 1.5, // Smooth scrubbing
      onUpdate: (self) => {
        const progress = self.progress
        
        // Scatter letters horizontally and backwards into the depth of field blur
        letterMeshes.forEach((wrapper, idx) => {
            const dir = idx < word.length / 2 ? -1 : 1
            const push = Math.abs((word.length / 2) - idx)
            
            // @ts-ignore
            wrapper.position.x = wrapper.userData.startX + (dir * progress * 50 * push)
            wrapper.position.z = -progress * 80
            // @ts-ignore
            wrapper.position.y = progress * wrapper.userData.randY
            
            // @ts-ignore
            wrapper.rotation.x = progress * wrapper.userData.randRotX
            // @ts-ignore
            wrapper.rotation.y = progress * wrapper.userData.randRotY
        })
        
        // Tilt the camera away slightly 
        camera.position.z = 80 + (progress * 50)
        camera.position.y = -(progress * 20)
        camera.lookAt(0, 0, 0)
        
        // Adjust Bokeh focus distance so letters blur out completely as they fall back
        ;(bokehPass.uniforms as any)['focus'].value = 80.0 + (progress * 150)
      }
    })
  })

  // Smooth Parallax Interaction handlers
  const handleMouseMove = (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    composer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', handleResize)

  // Render Loop
  const animate = () => {
    frameId = requestAnimationFrame(animate)

    if (isLoaded.value) {
        const time = Date.now() * 0.001

        // Highly smoothed Parallax logic
        targetRotation.x = mouse.y * 0.15 
        targetRotation.y = mouse.x * 0.25 

        meshGroup.rotation.x += (targetRotation.x - meshGroup.rotation.x) * 0.05
        meshGroup.rotation.y += (targetRotation.y - meshGroup.rotation.y) * 0.05
        
        // Continuous organic wind sway effect
        letterMeshes.forEach((wrapper, i) => {
           wrapper.rotation.z = Math.sin(time * 2.0 + i * 0.5) * 0.08
        })
    }

    composer.render()
  }

  animate()

  onUnmounted(() => {
    cancelAnimationFrame(frameId)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
    if (scrollTriggerInstance) scrollTriggerInstance.kill()
    renderer.dispose()
    composer.dispose()
    scene.clear()
  })
})
</script>

<template>
  <!-- Full pointer-events-none overlay so it captures no direct dragging unless intended -->
  <div ref="container" class="hero-blocks-container fixed inset-0 z-0 pointer-events-none opacity-90 transition-opacity duration-1000" />
</template>

<style scoped>
.hero-blocks-container {
  width: 100%;
  height: 100%;
}

canvas {
  width: 100% !important;
  height: 100% !important;
  outline: none;
}
</style>
