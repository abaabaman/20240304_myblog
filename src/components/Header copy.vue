<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
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
</template>

<style scoped>
header {
    position: absolute;
    width: 100%;
    height: 4rem;
    top: 0;
    background-color: orange;
    z-index: 10;

    .banner {
        display: flex;
        justify-content: space-between;
        height: 100%;
    }

    .left {
        display: flex;
        height: 100%;
        align-items: center;

        .logo {
            display: block;
            margin: 0 1rem;
        }
    }

    .right {
        display: flex;
        align-items: center;

        nav {
            font-size: 12px;
            margin-right: 5rem;
        }

        a {
            display: block;
            height: 100%;
            padding: 1rem 3rem 0;
            border: 2px solid red;
        }


        .more {
            cursor: pointer;
            position: relative;
            background-color: aqua;
            list-style: none;
        }

        .more:hover .sub_menu {
            display: block;
        }

        .sub_menu {
            display: none;
            text-align: center;
            position: absolute;
            width: 140px;
            top: 60px;
            right: -2px;

            a {
                padding: 16px 0;
            }
        }


    }
}

@media (min-width: 1024px) {}
</style>
