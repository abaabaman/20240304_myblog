<script setup lang="ts">
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';


const props = defineProps({
    data: Object,
});
const id = 'preview-only';
const scrollElement = document.documentElement;

</script>

<template>
    <main>
        <h1>{{ props.data?.title }}<span>{{ props.data?.date }}</span></h1>
        <MdPreview :editorId="id" :modelValue="props.data?.note" class="markdown" />
        <MdCatalog :editorId="id" :scrollElement="scrollElement" />
    </main>
</template>

<style scoped>
main {
    flex: 1;
    background-color: #fff;
    padding-top: 1rem;

    h1 {
        margin-left: 20px;
        font-size: 36px;
        font-weight: bold;
    }

    h1 span {
        display: inline-block;
        margin-left: 12px;
        font-size: 14px;
        color: #999;
    }

    .markdown {
        background-color: #fff;
        max-width: 1000px;
        width: calc(100vw - 20vw) !important;
    }
}
</style>