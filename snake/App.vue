<template>
  <div class="app-container">
    <header class="game-header">
      <div class="logo-container">
        <div class="snake-logo">🐍</div>
        <h1>贪吃蛇大作战</h1>
      </div>
      <ThemeSelector />
    </header>
    
    <div class="main-content">
      <div class="left-panel">
        <PlayerProfile class="card profile-card" />
        <ScoreBoard class="card score-card" />
      </div>
      
      <div class="game-area card">
        <GameBoard />
      </div>
      
      <div class="right-panel">
        <GameRules class="card rules-card" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ThemeSelector from './components/ThemeSelector.vue'
import PlayerProfile from './components/PlayerProfile.vue'
import ScoreBoard from './components/ScoreBoard.vue'
import GameBoard from './components/GameBoard.vue'
import GameRules from './components/GameRules.vue'
</script>

<style>
.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  color: var(--text-color);
  background-color: var(--background-color);
}

.game-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.snake-logo {
  font-size: 3em;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.game-header h1 {
  font-size: 3em;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.main-content {
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  gap: 30px;
  min-height: 70vh;
}

.left-panel, .right-panel {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.profile-card {
  background: linear-gradient(135deg, var(--primary-color) 10%, var(--secondary-color) 90%);
}

.score-card {
  background: linear-gradient(135deg, var(--secondary-color) 10%, var(--primary-color) 90%);
}

.game-area {
  background: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
}

.rules-card {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}

@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 1fr;
  }
  
  .left-panel, .right-panel {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .card {
    flex: 1;
    min-width: 300px;
  }
}
</style>

