import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoListStore = defineStore('todolist', () => {
  const addText = ref('')
  const pushText = () => addText.value;
  return { addText, pushText }
})

export const useFormulaStore = defineStore('formula', () => {
  const keyword = ref('')
  const search = () => keyword.value;
  return { keyword, search }
})
