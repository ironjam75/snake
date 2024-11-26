<template>
  <div class="game-board-container">
    <div class="game-header">
      <div class="score">得分: {{ gameStore.currentScore }}</div>
      <button v-if="!isPlaying" @click="startGame" class="start-btn">开始游戏</button>
      <button v-else @click="pauseGame" class="pause-btn">
        {{ gameStore.isPaused ? '继续' : '暂停' }}
      </button>
    </div>

    <div 
      class="game-board" 
      ref="boardRef" 
      :class="{ paused: gameStore.isPaused }"
    >
      <div v-if="!isPlaying && !gameStore.isGameOver" class="game-overlay start">
        <div class="message">按开始游戏或空格键开始</div>
      </div>
      
      <div v-if="gameStore.isGameOver" class="game-overlay gameover">
        <div class="message">游戏结束</div>
        <div class="final-score">最终得分: {{ gameStore.currentScore }}</div>
        <button @click="startGame" class="restart-btn">重新开始</button>
      </div>

      <div v-if="gameStore.isPaused" class="game-overlay pause">
        <div class="message">游戏暂停</div>
      </div>

      <canvas ref="canvasRef" :width="boardSize" :height="boardSize"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
const boardRef = ref(null)
const canvasRef = ref(null)
const isPlaying = ref(false)

const boardSize = 400
const gridSize = 20
const initialSpeed = 150

let snake = []
let food = null
let direction = 'right'
let nextDirection = 'right'
let gameLoop = null
let speed = initialSpeed

// 初始化游戏
const initGame = () => {
  snake = [
    { x: 6, y: 10 },
    { x: 5, y: 10 },
    { x: 4, y: 10 }
  ]
  direction = 'right'
  nextDirection = 'right'
  speed = initialSpeed
  gameStore.currentScore = 0
  gameStore.isGameOver = false
  gameStore.isPaused = false
  generateFood()
}

// 生成食物
const generateFood = () => {
  const gridCount = boardSize / gridSize
  let attempts = 0
  const maxAttempts = 100 // 防止无限循环

  while (attempts < maxAttempts) {
    const x = Math.floor(Math.random() * gridCount)
    const y = Math.floor(Math.random() * gridCount)
    
    // 确保食物不会出现在蛇身上
    if (!snake.some(segment => segment.x === x && segment.y === y)) {
      food = { x, y }
      return
    }
    attempts++
  }

  // 如果找不到合适的位置，选择第一个非蛇身的位置
  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < gridCount; y++) {
      if (!snake.some(segment => segment.x === x && segment.y === y)) {
        food = { x, y }
        return
      }
    }
  }
}

// 开始游戏
const startGame = () => {
  initGame()
  isPlaying.value = true
  gameLoop = setInterval(gameStep, speed)
}

// 暂停游戏
const pauseGame = () => {
  gameStore.isPaused = !gameStore.isPaused
  if (gameStore.isPaused) {
    clearInterval(gameLoop)
  } else {
    gameLoop = setInterval(gameStep, speed)
  }
}

// 游戏主循环
const gameStep = () => {
  const gridCount = boardSize / gridSize
  direction = nextDirection
  
  // 计算新的蛇头位置
  const head = { ...snake[0] }
  switch (direction) {
    case 'up': head.y--; break
    case 'down': head.y++; break
    case 'left': head.x--; break
    case 'right': head.x++; break
  }
  
  // 检查碰撞
  if (
    head.x < 0 || head.x >= gridCount ||
    head.y < 0 || head.y >= gridCount ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    gameOver()
    return
  }
  
  // 移动蛇
  snake.unshift(head)
  
  // 检查是否吃到食物
  if (head.x === food.x && head.y === food.y) {
    gameStore.currentScore += 10
    if (gameStore.currentScore > gameStore.highScore) {
      gameStore.updateHighScore(gameStore.currentScore)
    }
    generateFood()
    // 加快速度
    if (speed > 50) {
      speed -= 5
      clearInterval(gameLoop)
      gameLoop = setInterval(gameStep, speed)
    }
  } else {
    snake.pop()
  }
  
  drawGame()
}

// 绘制游戏画面
const drawGame = () => {
  const ctx = canvasRef.value.getContext('2d')
  const colors = {
    classic: { snake: '#4CAF50', food: '#FF5722' },
    neon: { snake: '#FF1493', food: '#00FFFF' },
    retro: { snake: '#FFD700', food: '#FF4500' },
    dark: { snake: '#2c3e50', food: '#e74c3c' }
  }
  const theme = colors[gameStore.currentTheme] || colors.classic

  // 清空画布
  ctx.clearRect(0, 0, boardSize, boardSize)
  
  // 绘制网格背景
  ctx.fillStyle = '#f0f0f0'
  for (let i = 0; i < boardSize / gridSize; i++) {
    for (let j = 0; j < boardSize / gridSize; j++) {
      if ((i + j) % 2 === 0) {
        ctx.fillRect(i * gridSize, j * gridSize, gridSize, gridSize)
      }
    }
  }
  
  // 绘制蛇
  ctx.fillStyle = theme.snake
  snake.forEach((segment, index) => {
    const x = segment.x * gridSize
    const y = segment.y * gridSize
    if (index === 0) {
      // 蛇头
      ctx.beginPath()
      ctx.arc(x + gridSize/2, y + gridSize/2, gridSize/2, 0, Math.PI * 2)
      ctx.fill()
    } else {
      // 蛇身
      ctx.fillRect(x, y, gridSize - 1, gridSize - 1)
    }
  })
  
  // 绘制食物
  if (food) {
    ctx.fillStyle = theme.food
    ctx.beginPath()
    ctx.arc(
      food.x * gridSize + gridSize/2,
      food.y * gridSize + gridSize/2,
      gridSize/3,
      0,
      Math.PI * 2
    )
    ctx.fill()
  }
}

// 游戏结束
const gameOver = () => {
  clearInterval(gameLoop)
  gameStore.isGameOver = true
  isPlaying.value = false
}

// 键盘控制
const handleKeydown = (e) => {
  const key = e.key.toLowerCase()
  
  if (key === ' ') {
    if (!isPlaying.value) {
      startGame()
    } else {
      pauseGame()
    }
    e.preventDefault()
    return
  }
  
  if (gameStore.isPaused) return
  
  const directions = {
    arrowup: 'up',
    arrowdown: 'down',
    arrowleft: 'left',
    arrowright: 'right',
    w: 'up',
    s: 'down',
    a: 'left',
    d: 'right'
  }
  
  if (directions[key]) {
    const current = direction
    const next = directions[key]
    
    // 防止反向移动
    if (
      (current === 'up' && next === 'down') ||
      (current === 'down' && next === 'up') ||
      (current === 'left' && next === 'right') ||
      (current === 'right' && next === 'left')
    ) {
      return
    }
    
    nextDirection = next
    e.preventDefault()
  }
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  drawGame()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  clearInterval(gameLoop)
})
</script>

<style scoped>
.game-board-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.score {
  font-size: 1.5em;
  font-weight: 600;
  color: #2c3e50;
}

.game-board {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.game-board.paused canvas {
  opacity: 0.5;
}

.game-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 10;
}

.game-overlay .message {
  font-size: 2em;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.final-score {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.start-btn, .pause-btn, .restart-btn {
  padding: 12px 24px;
  font-size: 1.1em;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-btn {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
}

.pause-btn {
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
}

.restart-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

canvas {
  background: white;
  transition: opacity 0.3s ease;
}
</style>

