<template>
  <div v-if="props.isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>编辑个人资料</h3>
        <button class="close-btn" @click="closeModal">×</button>
      </div>

      <form @submit.prevent="handleSubmit" class="edit-form">
        <div class="form-group">
          <label for="playerName">玩家名称</label>
          <input
            id="playerName"
            v-model="formData.name"
            type="text"
            placeholder="请输入玩家名称"
            maxlength="20"
            required
          >
        </div>

        <div class="avatar-section">
          <label>选择头像</label>
          <div class="avatar-options">
            <div
              v-for="emoji in avatarEmojis"
              :key="emoji"
              :class="['avatar-option', { active: formData.avatar === emoji }]"
              @click="formData.avatar = emoji"
            >
              {{ emoji }}
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="closeModal">取消</button>
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? '保存中...' : '保存更改' }}
          </button>
        </div>
      </form>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { usePlayerStore } from '../stores/playerStore'

// eslint-disable-next-line no-undef
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
    default: false
  }
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['close'])

const playerStore = usePlayerStore()
const avatarEmojis = ['👤', '🦊', '🐱', '🐼', '🐨', '🐯', '🦁', '🐸']
const isSubmitting = ref(false)
const errorMessage = ref('')

const formData = reactive({
  name: playerStore.name,
  avatar: playerStore.avatar
})

// 监听 isVisible 变化，重置表单数据
watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    formData.name = playerStore.name
    formData.avatar = playerStore.avatar
    errorMessage.value = ''
  }
})

const closeModal = () => {
  emit('close')
}

const handleSubmit = async () => {
  if (!formData.name.trim()) {
    errorMessage.value = '玩家名称不能为空'
    return
  }

  try {
    isSubmitting.value = true
    errorMessage.value = ''
    
    await playerStore.updatePlayerData({
      name: formData.name.trim(),
      avatar: formData.avatar
    })
    
    closeModal()
  } catch (error) {
    errorMessage.value = error.message || '更新失败，请重试'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: modal-in 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5em;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5em;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  transform: rotate(90deg);
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.9em;
  color: #666;
  font-weight: 500;
}

.form-group input {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1em;
  transition: all 0.3s ease;
}

.form-group input:focus {
  border-color: #667eea;
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.avatar-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.avatar-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.avatar-option {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8em;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.avatar-option:hover {
  transform: scale(1.1);
  background: #e9ecef;
}

.avatar-option.active {
  border-color: #667eea;
  background: #e3f2fd;
  transform: scale(1.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

.cancel-btn, .submit-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #f8f9fa;
  color: #666;
  border: none;
}

.cancel-btn:hover {
  background: #e9ecef;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-message {
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
  background-color: #fee2e2;
  color: #dc2626;
  font-size: 0.9em;
  text-align: center;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style> 