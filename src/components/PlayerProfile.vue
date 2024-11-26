<template>
  <div class="player-profile">
    <div class="profile-header">
      <div class="avatar-container">
        <div class="avatar">{{ playerStore.avatar }}</div>
        <div class="level-badge">Lv.{{ calculateLevel() }}</div>
      </div>
      <h3>{{ playerStore.name }}</h3>
    </div>

    <div class="stats-container">
      <div class="stat-item">
        <div class="stat-icon">🎮</div>
        <div class="stat-info">
          <div class="stat-label">游戏场次</div>
          <div class="stat-value">{{ playerStore.gamesPlayed }}</div>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">🏆</div>
        <div class="stat-info">
          <div class="stat-label">总分数</div>
          <div class="stat-value">{{ playerStore.totalScore }}</div>
        </div>
      </div>
    </div>

    <div class="profile-actions">
      <button class="edit-profile" @click="showEditModal">
        编辑资料
      </button>
    </div>

    <EditProfileModal 
      :is-visible="isEditModalVisible"
      @close="hideEditModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePlayerStore } from '../stores/playerStore'
import EditProfileModal from './EditProfileModal.vue'

const playerStore = usePlayerStore()
const isEditModalVisible = ref(false)

onMounted(async () => {
  await playerStore.fetchPlayerData()
})

const calculateLevel = () => {
  return Math.floor(playerStore.totalScore / 1000) + 1
}

const showEditModal = () => {
  isEditModalVisible.value = true
}

const hideEditModal = () => {
  isEditModalVisible.value = false
}
</script>

<style scoped>
.player-profile {
  padding: 20px;
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 15px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
}

.level-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.profile-header h3 {
  font-size: 1.5em;
  color: #2c3e50;
  margin: 0;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 25px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-3px);
}

.stat-icon {
  font-size: 1.8em;
  background: linear-gradient(135deg, #E3FDF5 0%, #FFE6FA 100%);
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 0.8em;
  color: #666;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 1.2em;
  font-weight: 600;
  color: #2c3e50;
}

.profile-actions {
  text-align: center;
}

.edit-profile {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-profile:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}
</style>

