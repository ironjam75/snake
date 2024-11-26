<template>
  <div class="score-board">
    <h3>分数榜</h3>
    <div class="score-container">
      <div class="score-item current">
        <div class="score-label">当前分数</div>
        <div class="score-value">{{ gameStore.currentScore }}</div>
      </div>
      <div class="score-item high">
        <div class="score-label">最高分数</div>
        <div class="score-value">{{ gameStore.highScore }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

onMounted(async () => {
  await gameStore.fetchHighScore()
})
</script>

<style scoped>
.score-board {
  padding: 20px;
}

.score-board h3 {
  font-size: 1.8em;
  margin-bottom: 25px;
  text-align: center;
  background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.score-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.score-item {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.score-item:hover {
  transform: translateY(-5px);
}

.score-item.current {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
}

.score-item.high {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.score-label {
  font-size: 0.9em;
  font-weight: 600;
  margin-bottom: 10px;
  color: #2c3e50;
}

.score-value {
  font-size: 2em;
  font-weight: 700;
  color: #1a365d;
}

.score-history {
  margin-top: 30px;
}

.score-history h4 {
  font-size: 1.2em;
  margin-bottom: 15px;
  color: #2c3e50;
}

.history-chart {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  height: 200px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>

