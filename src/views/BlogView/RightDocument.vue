<script setup lang="ts">
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import IconC from '@/components/IconC.vue';


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
        <div class="box">
            <div class="btn">
                <IconC value="&#xe66a;" color="var(--light-color) " />
            </div>
            <MdCatalog :editorId="id" :scrollElement="scrollElement" class="index" />
        </div>
    </main>
</template>

<style scoped>
main {
    flex: 1;
    background-color: #fff;
    padding-top: 1rem;
    position: relative;

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

    .box {
        position: fixed;
        right: -160px;
        top: 100px;
        z-index: 10;
        transition: right .3s;

        &:hover {
            right: 0;
        }
    }

    .btn {
        cursor: pointer;
        position: absolute;
        bottom: 50%;
        left: -48px;
        width: 50px;
        height: 50px;
        line-height: 46px;
        text-align: right;
        border-radius: 25px 0 0 25px;
        border: 2px solid var(--light-color);
        border-right-color: transparent;
    }

    .index {
        width: 160px;
        padding: 50px 0 50px 20px;
        background-image: linear-gradient(0deg, #0000, #fff 25%, #fff 75%, #0000);
    }

    .index::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        height: 100%;
        border-radius: 3px;
        background-image: linear-gradient(0deg, #0000 30%, var(--light9-color) 30%, var(--light-color) 50%, var(--light9-color) 70%, #0000 70%);
    }
}
</style>