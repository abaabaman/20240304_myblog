<script setup lang="ts">
import { ref, watch, onUpdated } from 'vue';
import { useTodoListStore } from '@/stores/todolist';
// import router from '@/router'
import { useRouter } from 'vue-router';

const todoListStore = useTodoListStore();
const router = useRouter();
const isShowTodo = ref(false);

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    // 好像也没什么好操作的
    // console.log(key, keyPath)
}

const add = ({ code }: { code: string }) => {
    if (['Enter', 'NumpadEnter'].includes(code)) todoListStore.pushText();
};

watch(() => router.currentRoute.value.href, () => isShowTodo.value = router.currentRoute.value.href.includes('todoList'));

</script>

<template>
    <header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
            @select="handleSelect">
            <div class="banner">
                <el-menu-item index="0" @click="$router.push('/')">
                    <img style="width: 40px;margin-right: 12px" src="@/common/images/logo.png" alt="Element logo" />
                    <h1>包包的博客</h1>
                </el-menu-item>
                <div class="flex-grow">
                    <input type="text" class="todo" placeholder="添加ToDo" v-model="todoListStore.addText" @keydown="add"
                        v-if="isShowTodo" />
                </div>
                <el-menu-item index="1" @click="$router.push('/blog')">博客</el-menu-item>
                <el-menu-item index="2" @click="$router.push('/note')">笔记</el-menu-item>
                <el-sub-menu index="3">
                    <template #title>更多...</template>
                    <el-menu-item index="3-1" @click="$router.push('/todoList')">待办</el-menu-item>
                    <el-menu-item index="3-2" @click="$router.push('/game')">小游戏</el-menu-item>
                    <el-menu-item index="3-3" @click="$router.push('/empty')">更多的更多...</el-menu-item>
                </el-sub-menu>
            </div>
        </el-menu>
    </header>
</template>

<style scoped>
.flex-grow {
    flex-grow: 1;
    display: flex;
    justify-content: center;
}

.todo {
    width: 240px;
    height: 36px;
    font-size: 16px;
    margin-top: 12px;
    text-indent: 10px;
    border-radius: 5px;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.24), 0 1px 3px rgba(0, 0, 0, 0.35) inset;
    border: 2px solid transparent;

    &:hover {
        border: 2px solid var(--light-color);
    }

    &:focus {
        border: 2px solid var(--main-color);
        /* background-color: red; */
        outline: none;
    }
}

header {
    /* position: absolute;
    height: 4rem;
    top: 0;
    background-color: orange;
    z-index: 10; */

    .banner {
        display: flex;
        justify-content: space-between;
        height: 100%;
        width: 100%;
    }
}

@media (min-width: 1024px) {}
</style>
