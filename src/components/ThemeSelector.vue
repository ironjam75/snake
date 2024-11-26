<template>
  <div class="theme-selector card">
    <h3>选择主题</h3>
    <div class="theme-options">
      <div
        v-for="theme in gameStore.themes"
        :key="theme.value"
        :class="['theme-option', { active: gameStore.currentTheme === theme.value }]"
        @click="selectTheme(theme.value)"
      >
        <div class="theme-icon" :style="getThemeStyle(theme)">
          {{ getThemeEmoji(theme.value) }}
        </div>
        <span>{{ theme.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

onMounted(async () => {
  await gameStore.fetchThemes()
})

const selectTheme = (themeValue) => {
  gameStore.setTheme(themeValue)
}

const getThemeEmoji = (themeValue) => {
  const emojis = {
    'default': '🐍',
    'dark': '🌙',
    'neon': '✨'
  }
  return emojis[themeValue] || '🎮'
}

const getThemeStyle = (theme) => {
  return {
    background: `linear-gradient(135deg, ${theme.colors.snake} 0%, ${theme.colors.food} 100%)`,
    color: theme.value === 'dark' ? '#fff' : '#000'
  }
}
</script>

<style>
/* 定义主题变量 */
:root {
  --primary-color: #4ade80;
  --secondary-color: #f87171;
  --background-color: #ffffff;
  --text-color: #2c3e50;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --card-bg: #ffffff;
  --border-color: #e5e7eb;
}

:root[data-theme='dark'] {
  --primary-color: #0ea5e9;
  --secondary-color: #6366f1;
  --background-color: #111827;
  --text-color: #e5e7eb;
  --shadow-color: rgba(0, 0, 0, 0.5);
  --card-bg: #1f2937;
  --border-color: #374151;
  --dark-glow: 0 0 15px rgba(14, 165, 233, 0.15);
}

:root[data-theme='neon'] {
  --primary-color: #00ffff;
  --secondary-color: #ff00ff;
  --background-color: #000000;
  --text-color: #ffffff;
  --shadow-color: rgba(0, 255, 255, 0.3);
  --neon-glow: 0 0 10px rgba(0, 255, 255, 0.5),
               0 0 20px rgba(0, 255, 255, 0.3),
               0 0 30px rgba(0, 255, 255, 0.2),
               0 0 40px rgba(255, 0, 255, 0.1);
}

/* 暗黑主题特殊样式 */
[data-theme='dark'] body {
  background: linear-gradient(to bottom, #111827, #1f2937);
}

[data-theme='dark'] .card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  box-shadow: var(--dark-glow);
}

[data-theme='dark'] .theme-option {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
}

[data-theme='dark'] .theme-option:hover {
  border-color: var(--primary-color);
  box-shadow: var(--dark-glow);
}

[data-theme='dark'] .theme-option.active {
  background: linear-gradient(135deg, 
    rgba(14, 165, 233, 0.2) 0%, 
    rgba(99, 102, 241, 0.2) 100%
  );
  border-color: var(--primary-color);
  box-shadow: var(--dark-glow);
}

[data-theme='dark'] button {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

[data-theme='dark'] button:hover {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, 
    rgba(14, 165, 233, 0.1) 0%, 
    rgba(99, 102, 241, 0.1) 100%
  );
  box-shadow: var(--dark-glow);
}

[data-theme='dark'] input,
[data-theme='dark'] select,
[data-theme='dark'] textarea {
  background: var(--card-bg);
  border-color: var(--border-color);
  color: var(--text-color);
}

[data-theme='dark'] input:focus,
[data-theme='dark'] select:focus,
[data-theme='dark'] textarea:focus {
  border-color: var(--primary-color);
  box-shadow: var(--dark-glow);
}

[data-theme='dark'] .snake-logo {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
}

[data-theme='dark'] .game-board {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
}

[data-theme='dark'] .score-value,
[data-theme='dark'] .stat-value {
  color: var(--primary-color);
}

[data-theme='dark'] .level-badge {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}

[data-theme='dark'] .theme-icon {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

[data-theme='dark'] .theme-option.active .theme-icon {
  border-color: var(--primary-color);
  box-shadow: var(--dark-glow);
}

/* 添加一些微妙的动画效果 */
[data-theme='dark'] .card,
[data-theme='dark'] .theme-option,
[data-theme='dark'] button {
  transition: all 0.3s ease;
}

[data-theme='dark'] .theme-option:hover,
[data-theme='dark'] button:hover {
  transform: translateY(-2px);
}

/* 为标题添加渐变效果 */
[data-theme='dark'] h1,
[data-theme='dark'] h2,
[data-theme='dark'] h3 {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 霓虹主题特殊样式 */
[data-theme='neon'] .theme-option {
  border: 1px solid var(--primary-color);
  background: rgba(0, 0, 0, 0.8);
  box-shadow: var(--neon-glow);
}

[data-theme='neon'] .theme-option:hover {
  box-shadow: 0 0 15px var(--primary-color),
              0 0 30px var(--secondary-color);
}

[data-theme='neon'] .theme-icon {
  text-shadow: var(--neon-glow);
}

[data-theme='neon'] h1,
[data-theme='neon'] h2,
[data-theme='neon'] h3,
[data-theme='neon'] h4 {
  text-shadow: var(--neon-glow);
}

[data-theme='neon'] .card {
  border: 1px solid var(--primary-color);
  background: rgba(0, 0, 0, 0.8);
  box-shadow: var(--neon-glow);
}

[data-theme='neon'] button {
  border: 1px solid var(--primary-color);
  background: transparent;
  color: var(--primary-color);
  text-shadow: var(--neon-glow);
  box-shadow: var(--neon-glow);
}

[data-theme='neon'] button:hover {
  background: var(--primary-color);
  color: var(--background-color);
  box-shadow: 0 0 20px var(--primary-color),
              0 0 40px var(--secondary-color);
}
</style>

<style scoped>
.theme-selector {
  margin-bottom: 30px;
  background: linear-gradient(135deg, #E3FDF5 0%, #FFE6FA 100%);
}

.theme-selector h3 {
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 20px;
}

.theme-options {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.theme-option {
  cursor: pointer;
  padding: 15px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.theme-option:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.theme-option.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.theme-option.active span {
  color: white;
}

.theme-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  transition: all 0.3s ease;
}

[data-theme='neon'] .theme-icon {
  border: 1px solid var(--primary-color);
  animation: neonPulse 2s infinite;
}

@keyframes neonPulse {
  0% {
    box-shadow: 0 0 10px var(--primary-color),
                0 0 20px var(--primary-color),
                0 0 30px var(--primary-color);
  }
  50% {
    box-shadow: 0 0 15px var(--secondary-color),
                0 0 25px var(--secondary-color),
                0 0 35px var(--secondary-color);
  }
  100% {
    box-shadow: 0 0 10px var(--primary-color),
                0 0 20px var(--primary-color),
                0 0 30px var(--primary-color);
  }
}

.theme-option.active[data-theme='neon'] {
  border-color: var(--secondary-color);
  box-shadow: 0 0 20px var(--primary-color),
              0 0 40px var(--secondary-color);
}

.theme-option span {
  font-size: 1em;
  font-weight: 600;
  color: #2c3e50;
}
</style>

