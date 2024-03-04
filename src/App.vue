<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
// import { ElButton } from 'element-plus'
// export default {
//   components: { ElButton },
// }
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  position: absolute;
  width: 100%;
  top: 4rem;
}





@media (min-width: 1024px) {}
</style>
