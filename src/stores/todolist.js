import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoListStore = defineStore('counter', () => {
  const addText = ref('')
  const pushText = () => addText.value
  return { addText, pushText }
})
