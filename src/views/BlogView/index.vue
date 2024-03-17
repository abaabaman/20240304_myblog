<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue'
import RightDocument from './RightDocument.vue'
import LeftNav from './LeftNav.vue'
import RightMenu from './RightMenu.vue'
import { getNoteList } from '@/api/notelist'
import { typeListMap } from './constant'

type actType = ['month' | 'type' | 'note', string]
const initData = ref<any[]>([])
const active = ref<actType>(['month', '2021年10月'])
const loading = ref<boolean>(true)

getNoteList().then(({ data }: { data: any[] }) => {
  loading.value = false
  initData.value = data
  active.value = ['note', data[data.length - 1].id]
})

const dataMap = computed(() => {
  const obj: Record<string, any[]> = {}
  initData.value.forEach((item) => {
    obj[item.type] ? (obj[item.type] = [...obj[item.type], item]) : (obj[item.type] = [item])
  })
  return obj
})

const dataMonth = computed(() => {
  const obj: Record<string, any[]> = {}
  initData.value.forEach((item) => {
    const time = new Date(item.date)
    const month = time.getMonth() + 1
    const monthText = month < 10 ? '0' + month : '' + month;
    const timeC = `${time.getFullYear()}.${monthText}`.replace(/\./, "年") + '月';
    obj[timeC] ? (obj[timeC] = [...obj[timeC], item]) : (obj[timeC] = [item])
  })
  return obj
})

const click = (act: actType) => {
  console.log(act)
  active.value = act
}

onUpdated(() => {
  // console.log(dataMap.value)
})

// const activeData = computed(() => initData.value.find(({ id }) => id === active.value))
// const clickNote = (id: string) => active.value = id;
</script>

<template>

  <div v-if="loading">
    <div class="banner">loading...</div>
  </div>
  <div class="box" v-else>
    <div class="flex banner">
      <left-nav :dataMonth="dataMonth" :dataMap="dataMap" :active="active" :click="click"></left-nav>
      <!-- {{ active }} -->
      <right-menu :list="dataMonth[active[1]]" :title="active[1]" :click="click" v-if="active[0] === 'month'">
      </right-menu>
      <right-menu :list="dataMap[active[1]]" :title="typeListMap[active[1]]" :click="click" v-if="active[0] === 'type'">
      </right-menu>
      <right-document :data="initData.find(({ id }) => id === active[1])" v-if="active[0] === 'note'"></right-document>
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
</style>
