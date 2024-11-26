<template>
  <div class="game-rules">
    <h3>游戏规则</h3>
    <div class="rules-container">
      <div v-for="(rule, index) in rules" :key="index" class="rule-item">
        <div class="rule-number">{{ index + 1 }}</div>
        <div class="rule-content">{{ rule }}</div>
      </div>
    </div>
    <div class="controls-section">
      <h4>操作说明</h4>
      <div class="controls-grid">
        <div class="control-item">
          <div class="key">↑</div>
          <span>向上移动</span>
        </div>
        <div class="control-item">
          <div class="key">↓</div>
          <span>向下移动</span>
        </div>
        <div class="control-item">
          <div class="key">←</div>
          <span>向左移动</span>
        </div>
        <div class="control-item">
          <div class="key">→</div>
          <span>向右移动</span>
        </div>
        <div class="control-item">
          <div class="key">Space</div>
          <span>暂停游戏</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const rules = ref([
  "使用方向键控制蛇的移动",
  "吃到食物可以增加分数",
  "撞墙或撞到自己则游戏结束",
  "每吃到一个食物，蛇的长度增加一格",
  "分数越高，移动速度越快"
])

onMounted(async () => {
  try {
    const response = await axios.get('/rules')
    rules.value = response.data.rules
  } catch (error) {
    console.error('获取规则失败:', error)
  }
})
</script>

<style scoped>
.game-rules {
  padding: 20px;
}

.game-rules h3 {
  font-size: 1.8em;
  margin-bottom: 25px;
  text-align: center;
  background: linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.rules-container {
  margin-bottom: 30px;
}

.rule-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.rule-item:hover {
  transform: translateX(10px);
}

.rule-number {
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.rule-content {
  font-size: 0.95em;
  color: #2c3e50;
  line-height: 1.4;
}

.controls-section {
  margin-top: 30px;
}

.controls-section h4 {
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.control-item:hover {
  transform: translateY(-3px);
}

.key {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px;
  border-radius: 8px;
  font-size: 0.9em;
  font-weight: 600;
  min-width: 40px;
  text-align: center;
}

.control-item span {
  font-size: 0.9em;
  color: #2c3e50;
}
</style>

