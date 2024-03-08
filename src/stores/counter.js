import { defineStore } from 'pinia';
import { ref, computed } from 'vue'

// export const useCounterStore = defineStore('counter', {
//   state: () => {
//     return { count: 0 }
//   },
//   actions: {
//     increment() {
//       this.count++
//     },
//   },
// });

export const useCounterStore = defineStore('counter', () => {

  const count = ref(0)
  console.log(count.value);
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  console.log(count.value);

  return { count, doubleCount, increment }
})