<script setup lang="ts">
import { typeListMap } from './constant';

defineProps(['dataMonth', 'dataMap', 'active', 'click'])

</script>

<template>
    <nav>
        <dl>
            <dt style="cursor: default;">秋风捎来了落叶</dt>
            <dd v-for="title in Object.keys(dataMonth)" :key="title" @click="click(['month', title])"
                :class="active[1] === title && 'active'">{{ title }}</dd>
        </dl>
        <dl v-for="types in Object.keys(dataMap) " :key="types">
            <dt @click="click(['type', types])">{{ typeListMap[types] }}</dt>
            <dd v-for="item in dataMap[types]" @click="click(['note', item.id])" :key="item.id"
                :class="active[1] === item.id && 'active'">{{
                item.title }}</dd>
        </dl>
    </nav>
</template>

<style scoped>
nav {
    width: 12rem;
    height: calc(100vh - 4rem);
    /* border-right: 1px solid #eee; */
    background-color: #eee;
    padding: 2rem 1rem;

    dl {
        /* background-color: gray; */
        margin: 1rem 0 4rem 0;
        padding-bottom: 1rem;
        border-bottom: 1px solid #4d6fb8;
        border: 1px solid transparent;
        border-radius: 1rem;
        /* border: 1px solid #fff; */

        &:hover {
            border: 1px solid #4d6fb866;
        }
    }

    dt {
        cursor: pointer;
        /* background-color: aqua; */
        color: #fff;

        background-color: #4d6fb8;
        padding-left: 0.8rem;
        margin-bottom: 1rem;
        font-weight: bold;
        font-size: 18px;
    }

    dd {
        font-size: 15px;
        padding-left: 0.8rem;
        border-left: 3px solid transparent;
        transition: border .2s;

        &:hover {
            cursor: pointer;
            color: #4d6fb8;
            border-left-color: #4d6fb8;
        }

        &.active {
            color: #4d6fb8;
            border-left-color: #4d6fb8;
        }
    }
}
</style>