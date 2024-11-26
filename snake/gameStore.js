import { defineStore } from 'pinia';
import axios from 'axios';

export const useGameStore = defineStore('game', {
  state: () => ({
    currentScore: 0,
    highScore: 0,
    currentTheme: 'default',
    themes: [],
    isGameOver: false,
    isPaused: false
  }),

  getters: {
    currentThemeColors() {
      const theme = this.themes.find(t => t.value === this.currentTheme);
      return theme?.colors || {
        snake: '#4ade80',
        food: '#f87171'
      };
    }
  },

  actions: {
    async fetchHighScore() {
      try {
        const response = await axios.get('/highscore');
        if (response.data && typeof response.data.highScore === 'number') {
          this.highScore = response.data.highScore;
        }
      } catch (error) {
        console.error('获取最高分失败:', error);
      }
    },
    async updateHighScore(score) {
      try {
        const response = await axios.post('/highscore', { score });
        if (response.data && response.data.success) {
          await this.fetchHighScore();
        } else {
          throw new Error('更新最高分失败');
        }
      } catch (error) {
        console.error('更新最高分失败:', error);
      }
    },
    async fetchThemes() {
      try {
        const response = await axios.get('/themes');
        if (response.data && Array.isArray(response.data.themes)) {
          this.themes = response.data.themes;
        }
      } catch (error) {
        console.error('获取主题列表失败:', error);
      }
    },
    setTheme(themeValue) {
      this.currentTheme = themeValue;
      document.documentElement.setAttribute('data-theme', themeValue);
    }
  }
});

