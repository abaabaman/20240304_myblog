<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'

const active = ref(1);
const initData = [
  { id: 1, type: 'js', date: "20.11.22", title: 'DOM&BOM', conetent: 'ddddddd' },
  { id: 2, type: 'js', date: "20.11.12", title: '数据类型', conetent: 'ddddddd' },
  { id: 3, type: 'xr', date: "20.11.12", title: 'Unity基本概述', conetent: 'ddddddd' },
  { id: 4, type: 'xr', date: "20.11.12", title: 'api', conetent: 'ddddddd' },
]

const typeListMap: Record<string, string> = {
  js: 'js学习笔记',
  xr: 'xr学习笔记',
}

const data = computed(() => {
  const dataMap: Record<string, any[]> = {};
  initData.forEach((item) => {
    dataMap[item.type]
      ? dataMap[item.type] = [...dataMap[item.type], item]
      : dataMap[item.type] = [item];
  });
  return dataMap;
})

const activeData = computed(() => initData.find(({ id }) => id === active.value))

axios({
  method: 'get',
  url: '@/../vue_myblog/interface/noteList_get.php',
  // url: 'http://localhost/20240224_vite_ajax/interface/reg.php',
  responseType: 'json'
})
  .then(e => console.log(e.data))

const clickNote = (id: number) => active.value = id;

</script>

<template>
  <div class="flex banner">
    <nav>
      <!-- <dl>
      <dt>秋风捎来了落叶</dt>
      <dd>日期</dd>
      <dd>日期</dd>
      <dd>日期</dd>
    </dl> -->
      <!-- <dl>
        <dt>js学习笔记</dt>
        <dd>日期</dd>
        <dd>日期</dd>
        <dd>日期</dd>
      </dl>
      <dl>
        <dt>xr学习笔记</dt>
        <dd>日期</dd>
        <dd>日期</dd>
        <dd>日期</dd>
      </dl> -->
      <dl v-for="types in Object.keys(data)" :key="types">
        <dt>{{ typeListMap[types] }}</dt>
        <dd v-for="item in data[types]" @click="clickNote(item.id)" :key="item.id">{{ item.title }}</dd>
      </dl>
    </nav>
    <main>
      <h1>{{ activeData?.title }}<span>{{ activeData?.date }}</span></h1>
      <hr>
      <pre>{{ activeData?.conetent }}</pre>
    </main>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}

nav {
  width: 12rem;
  height: calc(100vh - 4rem);
  background-color: #ccc;
  padding: 0 1rem;

  dl {
    background-color: gray;
    margin-top: 1rem;
    margin-bottom: 5rem;
  }

  dt {
    background-color: aqua;
  }
}

main {
  background-color: bisque;
  flex: 1;
  padding: 3rem;

  h1 span {
    display: inline-block;
    margin-left: 12px;
    font-size: 18px;
    color: #666;
  }

  pre {
    background-color: coral;
  }
}
</style>