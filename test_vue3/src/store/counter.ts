import { defineStore } from 'pinia';
  
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
  actions: {
    increment() {
      console.log('我是actions里的 加法运算');
      this.count++;
    },
    decrement() {
      console.log('我是actions里的 减法运算');
      this.count--;
    },
  },
});