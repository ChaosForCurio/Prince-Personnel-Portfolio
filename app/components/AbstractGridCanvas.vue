<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
let animId = null
let time = 0
let resizeHandler = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')

  resizeHandler = () => {
    canvas.width = canvas.offsetWidth || 400
    canvas.height = canvas.offsetHeight || 400
  }
  window.addEventListener('resize', resizeHandler)
  resizeHandler()

  const draw = () => {
    time += 0.003
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const w = canvas.width
    const h = canvas.height
    if (!w || !h) {
      animId = requestAnimationFrame(draw)
      return
    }

    // Animated floating geometric lines
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'
    ctx.lineWidth = 1

    for (let i = 0; i < 12; i++) {
      const x1 = (Math.sin(time * 0.8 + i * 0.9) * 0.5 + 0.5) * w
      const y1 = (i / 12) * h
      const x2 = (Math.cos(time * 0.6 + i * 0.7) * 0.5 + 0.5) * w
      const y2 = ((i + 1) / 12) * h

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    // Animated grid points
    const cols = 8
    const rows = 10
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / (cols - 1)) * w
        const y = (r / (rows - 1)) * h
        const pulse = Math.sin(time * 2 + r * 0.5 + c * 0.3) * 0.5 + 0.5
        const radius = pulse * 2

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(186, 0, 43, ${pulse * 0.5})`
        ctx.fill()
      }
    }

    // Horizontal scan line
    const scanY = (Math.sin(time * 0.5) * 0.5 + 0.5) * h
    const grad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40)
    grad.addColorStop(0, 'rgba(186, 0, 43, 0)')
    grad.addColorStop(0.5, 'rgba(186, 0, 43, 0.1)')
    grad.addColorStop(1, 'rgba(186, 0, 43, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, scanY - 40, w, 80)

    animId = requestAnimationFrame(draw)
  }

  draw()
})

onUnmounted(() => {
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  if (animId) cancelAnimationFrame(animId)
})
</script>

<template>
  <canvas 
    ref="canvasRef" 
    style="position: absolute; inset: 0; width: 100%; height: 100%; display: block;"
  ></canvas>
</template>
