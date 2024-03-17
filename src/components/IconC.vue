<script setup lang="ts">

defineProps(['value', 'color'])


</script>
<template>
    <i class="iconfont" :style="{ color }">{{ value }}</i>
</template>
<style scoped>
.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    margin-right: 8px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
</style>