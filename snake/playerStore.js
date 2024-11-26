import { defineStore } from 'pinia';
import axios from 'axios';

export const usePlayerStore = defineStore('player', {
  state: () => ({
    name: 'Default Player',
    avatar: '👤',
    gamesPlayed: 0,
    totalScore: 0,
    theme: 'default'
  }),
  actions: {
    async fetchPlayerData() {
      try {
        const response = await axios.get('/player');
        if (response.data) {
          this.name = response.data.name;
          this.gamesPlayed = response.data.gamesPlayed;
          this.totalScore = response.data.totalScore;
        }
      } catch (error) {
        console.error('获取玩家数据失败:', error);
      }
    },
    async updatePlayerData({ name, avatar }) {
      try {
        const response = await axios.post('/player', {
          name,
          avatar
        });

        if (response.data.success && response.data.player) {
          this.name = response.data.player.username;
          this.avatar = response.data.player.avatar;
          this.theme = response.data.player.theme;
          await this.fetchPlayerData(); // 刷新其他数据
        } else {
          throw new Error(response.data.error || '更新失败');
        }
      } catch (error) {
        console.error('更新玩家数据失败:', error);
        throw error; // 向上传递错误以便UI处理
      }
    }
  }
});

