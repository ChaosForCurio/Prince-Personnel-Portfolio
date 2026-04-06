<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)

let gl
let program
let positionBuffer
let mouse = { x: 0, y: 0 }
let targetMouse = { x: 0, y: 0 }
let time = 0

// Shaders
const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;

  float grid(vec2 uv, float spacing) {
    vec2 grid = fract(uv / spacing);
    return step(grid.x, 0.02) + step(grid.y, 0.02);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    
    // Grid Disturbance
    float d = distance(uv, u_mouse);
    float disturbance = smoothstep(0.15, 0.0, d);
    
    // Pixelated effect
    vec2 pixUV = floor(gl_FragCoord.xy / 20.0) * 20.0 / u_resolution;
    float pixD = distance(pixUV, u_mouse);
    float pixDist = smoothstep(0.1, 0.0, pixD);
    
    vec3 color = vec3(0.0); // Transparent background base
    
    // Fine Grid
    color += vec3(0.06) * grid(gl_FragCoord.xy, 40.0);
    
    // Highlight cells near mouse
    color += vec3(0.8, 0.0, 0.1) * disturbance * 0.4; // Stronger Brand Red glow
    
    // Pixel bits
    if (pixDist > 0.5) {
      color += vec3(0.2) * sin(u_time * 5.0 + pixUV.x * 100.0);
    }

    // Set combined color with alpha based on grid/disturbance intensity
    float alpha = max(0.1, color.r + color.g + color.b);
    gl_FragColor = vec4(color, alpha);
  }
`

const initGL = () => {
  gl = canvasRef.value.getContext('webgl', { alpha: true, premultipliedAlpha: false })
  if (!gl) return

  const createShader = (type, source) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    return shader
  }

  const vs = createShader(gl.VERTEX_SHADER, vertexShaderSource)
  const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource)

  program = gl.createProgram()
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  gl.useProgram(program)

  positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

  const positionLocation = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
}

const render = () => {
  if (!gl) return
  
  // Smooth mouse move
  mouse.x += (targetMouse.x - mouse.x) * 0.1
  mouse.y += (targetMouse.y - mouse.y) * 0.1
  time += 0.01

  gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), gl.canvas.width, gl.canvas.height)
  gl.uniform2f(gl.getUniformLocation(program, 'u_mouse'), mouse.x, mouse.y)
  gl.uniform1f(gl.getUniformLocation(program, 'u_time'), time)

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  requestAnimationFrame(render)
}

const onMouseMove = (e) => {
  targetMouse.x = e.clientX / window.innerWidth
  targetMouse.y = 1.0 - (e.clientY / window.innerHeight)
}

const onResize = () => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth
    canvasRef.value.height = window.innerHeight
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  }
}

onMounted(() => {
  initGL()
  onResize()
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onResize)
  render()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <canvas 
    ref="canvasRef" 
    class="fixed inset-0 z-[-2] pointer-events-none"
  ></canvas>
</template>
