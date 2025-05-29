"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Color } from "three"

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [showHint, setShowHint] = useState(true)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    sceneRef.current = scene
    rendererRef.current = renderer
    cameraRef.current = camera

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Starfield
    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = window.innerWidth < 768 ? 5000 : 10000
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: window.innerWidth < 768 ? 0.5 : 0.7,
      sizeAttenuation: true,
    })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Sizes
    const getGlobeSize = () => {
      if (window.innerWidth < 480) return 3
      if (window.innerWidth < 768) return 3.5
      if (window.innerWidth < 1024) return 4
      return 5
    }
    const globeSize = getGlobeSize()

    // Atmosphere shader
    const atmosphereVertexShader = `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `
    const atmosphereFragmentShader = `
      uniform vec3 glowColor;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        gl_FragColor = vec4(glowColor, 1.0) * intensity;
      }
    `
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      uniforms: {
        glowColor: { value: new Color(0x3a86ff) },
      },
    })
    const atmosphereGeometry = new THREE.SphereGeometry(globeSize + 0.2, 32, 32)
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    scene.add(atmosphereMesh)

    // Wireframe globe
    const wireframeGeometry = new THREE.SphereGeometry(globeSize, 32, 32)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x3a86ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    })
    const wireframeGlobe = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
    scene.add(wireframeGlobe)

    // Solid globe (color only)
    const solidGeometry = new THREE.SphereGeometry(globeSize - 0.1, 64, 64)
    const solidMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a237e,
      transparent: true,
      opacity: 0.6,
    })
    const solidGlobe = new THREE.Mesh(solidGeometry, solidMaterial)
    scene.add(solidGlobe)

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    // Camera & controls
    const getCameraDistance = () => {
      if (window.innerWidth < 480) return 8
      if (window.innerWidth < 768) return 9
      if (window.innerWidth < 1024) return 10
      return 10
    }
    camera.position.z = getCameraDistance()

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = window.innerWidth < 768 ? 0.3 : 0.5
    controls.enableZoom = false

    // Dynamic color transition
    const colors = [
      new Color(0x3a86ff),
      new Color(0x8338ec),
      new Color(0xff006e),
      new Color(0xfb5607),
      new Color(0xffbe0b),
    ]
    let colorIndex = 0
    let nextColorIndex = 1
    let colorT = 0
    const colorTransitionSpeed = 0.005

    const lerpColor = (a: Color, b: Color, t: number) => {
      const color = new Color()
      color.r = a.r + (b.r - a.r) * t
      color.g = a.g + (b.g - a.g) * t
      color.b = a.b + (b.b - a.b) * t
      return color
    }

    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      colorT += colorTransitionSpeed
      if (colorT >= 1) {
        colorT = 0
        colorIndex = nextColorIndex
        nextColorIndex = (nextColorIndex + 1) % colors.length
      }

      const currentColor = lerpColor(colors[colorIndex], colors[nextColorIndex], colorT)

      wireframeMaterial.color = currentColor
      solidMaterial.color = currentColor
      atmosphereMaterial.uniforms.glowColor.value = currentColor

      wireframeGlobe.rotation.y += 0.001
      solidGlobe.rotation.y += 0.001
      atmosphereMesh.rotation.y += 0.0005
      stars.rotation.y += 0.0001
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return

      const newGlobeSize = getGlobeSize()
      const newCameraDistance = getCameraDistance()

      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      cameraRef.current.position.z = newCameraDistance

      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      wireframeGlobe.geometry.dispose()
      wireframeGlobe.geometry = new THREE.SphereGeometry(newGlobeSize, 32, 32)

      solidGlobe.geometry.dispose()
      solidGlobe.geometry = new THREE.SphereGeometry(newGlobeSize - 0.1, 64, 64)

      atmosphereMesh.geometry.dispose()
      atmosphereMesh.geometry = new THREE.SphereGeometry(newGlobeSize + 0.2, 32, 32)

      controls.rotateSpeed = window.innerWidth < 768 ? 0.3 : 0.5
    }

    window.addEventListener("resize", handleResize)

    const hintTimer = setTimeout(() => {
      setShowHint(false)
    }, 3000)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      controls.dispose()
      clearTimeout(hintTimer)

      wireframeGeometry.dispose()
      wireframeMaterial.dispose()
      solidGeometry.dispose()
      solidMaterial.dispose()
      atmosphereGeometry.dispose()
      atmosphereMaterial.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0">
      {showHint}
    </div>
  )
}
