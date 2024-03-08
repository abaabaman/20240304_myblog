<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
const iframeRef = ref(null);

onMounted(() => {
    iframeRef.value?.focus();
})

</script>

<template>
    <main>
        <iframe src="/public/web_plane_war 21.08.10/play.html" class="game" frameborder="0" ref="iframeRef"></iframe>
    </main>
</template>

<style scoped>
.game {
    display: block;
    width: 600px;
    height: 800px;
    margin: 42px auto;
    padding-top: 120px;
    transform: scale(1.1);
}

main::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    /* background-image: url('/public/web_plane_war 21.08.10/img/background.png'); */
    opacity: 0.4;
    background-color: #000;
}

main::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    background-image: url('/public/web_plane_war 21.08.10/img/background.png');
}
</style>
