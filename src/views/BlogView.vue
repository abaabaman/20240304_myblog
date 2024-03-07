<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
// import { axios } from '@/utils/request'
// import axios from 'axios'
import { MdPreview, MdCatalog } from 'md-editor-v3';
import { getNoteList } from '@/api/notelist.ts'
import 'md-editor-v3/lib/preview.css';


const id = 'preview-only';
const scrollElement = document.documentElement;
const active = ref('1');
const initData = ref([]);

getNoteList()
  .then(({ data }: { data: any }) => {
    initData.value = data;
    active.value = data[data.length - 1].id;
    // setTimeout(() => {
    // }, 3000);
  });


const text = ref(`# BOM
​	Brower Object Model游览器对象模型

### window对`)

const typeListMap: Record<string, string> = {
  js: 'js学习笔记',
  xr: 'xr学习笔记',
}


const data = computed(() => {
  const dataMap: Record<string, any[]> = {};
  initData.value.forEach((item) => {
    dataMap[item.type]
      ? dataMap[item.type] = [...dataMap[item.type], item]
      : dataMap[item.type] = [item];
  });
  return dataMap;
})

const activeData = computed(() => initData.value.find(({ id }) => id === active.value))
const clickNote = (id: string) => {
  active.value = id;
  text.value = activeData.value?.note || '';
  // location.pathname = id
  console.log(location);
};
</script>

<template>
  <div class="box">
    <div class="flex banner">
      <nav>
        <dl>
          <dt>秋风捎来了落叶</dt>
          <dd v-for="item in initData" @click="clickNote(item.id)" :key="item.id"
            :class="activeData?.id === item.id && 'active'">{{
            item.date }}</dd>
        </dl>
        <dl v-for="types in Object.keys(data)" :key="types">
          <dt>{{ typeListMap[types] }}</dt>
          <dd v-for="item in data[types]" @click="clickNote(item.id)" :key="item.id"
            :class="activeData?.id === item.id && 'active'">{{
            item.title }}</dd>
        </dl>
      </nav>
      <main>
        <h1>{{ activeData?.title }}<span>{{ activeData?.date }}</span></h1>
        <!-- <hr> -->
        <MdPreview :editorId="id" :modelValue="activeData?.note" class="markdown" />
        <MdCatalog :editorId="id" :scrollElement="scrollElement" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.box {
  background-image: linear-gradient(90deg, #eee 50%, #fff 50%);
}

.flex {
  display: flex;
}

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