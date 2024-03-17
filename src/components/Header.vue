<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTodoListStore, useFormulaStore } from '@/stores/headerSearch'
// import router from '@/router'
import { useRouter } from 'vue-router'

const todoListStore = useTodoListStore()
const formulaStore = useFormulaStore()

const router = useRouter()
const isShowTodo = ref(false)
const isShowFormula = ref(false)

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  // 好像也没什么好操作的
  // console.log(key, keyPath)
}

const addTodo = ({ code }: { code: string }) => {
  if (!todoListStore.addText) return
  if (['Enter', 'NumpadEnter'].includes(code)) todoListStore.pushText()
}

const addFormula = ({ code }: { code: string }) => {
  if (!formulaStore.keyword) return
  if (['Enter', 'NumpadEnter'].includes(code)) formulaStore.search();
}

watch(
  () => router.currentRoute.value.href,
  () => {
    isShowTodo.value = router.currentRoute.value?.href.includes('todoList');
    isShowFormula.value = router.currentRoute.value?.href.includes('formula');

  }
)
</script>

<template>
  <header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
      @select="handleSelect">
      <div class="banner">
        <el-menu-item index="0" @click="$router.push('/')">
          <img style="width: 40px; margin-right: 12px" src="@/common/images/logo.png" alt="Element logo" />
          <h1>包包的小窝</h1>
        </el-menu-item>
        <div class="flex-grow">
          <input type="text" class="todo" placeholder="添加ToDo" v-model="todoListStore.addText" @keydown="addTodo"
            v-if="isShowTodo" key="ddd" />
          <input type="text" class="todo" placeholder="搜索" v-model="formulaStore.keyword" @keydown="addFormula"
            v-if="isShowFormula" key="fff" />
        </div>
        <el-menu-item index="1" @click="$router.push('/blog')">主页</el-menu-item>
        <el-menu-item index="2" @click="$router.push('/formula')">配方</el-menu-item>
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
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.24),
    0 1px 3px rgba(0, 0, 0, 0.35) inset;
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
</style>@/stores/headerSearch
