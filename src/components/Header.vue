<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

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
                <div class="flex-grow" />
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

<!-- <template>
    <header>
        <div class="banner ">
            <div class="left">
                <img alt="Vue logo" class="logo" src="@/common/images/logo.svg" width="35" height="35" />
                <h1>这是我的标题</h1>
            </div>
            <nav class="right">
                <RouterLink to="/">博客</RouterLink>
                <RouterLink to="/note">笔记</RouterLink>

                <a class="more">
                    <span>更多...</span>
                    <div class="sub_menu">
                        <div>
                            <RouterLink to="/todolist">待办</RouterLink>
                        </div>
                        <div>
                            <RouterLink to="/game">小游戏</RouterLink>
                        </div>
                        <div>
                            <RouterLink to="/empty">更多的更多...</RouterLink>
                        </div>
                    </div>
                </a>
            </nav>
        </div>
    </header>
</template> -->

<style scoped>
.flex-grow {
    flex-grow: 1;
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
