<script setup lang="ts">
import AddFormula from './AddFormula.vue'
import { MdPreview, MdCatalog } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { getFormula } from '@/api/formula'
import { ref, computed, onUpdated, reactive, watch } from 'vue'
import { useFormulaStore } from '@/stores/headerSearch';

const formulaStore = useFormulaStore();

const id = 'preview-only'
const active = ref('10000');
const data = ref<any[]>([]);
const codeBlock = ref('helloworld')
const fiterTags = ref(JSON.parse(localStorage.getItem('formula_tags') || null) || ['js'])
const search = ref('')
const drawerVisible = ref(false);
const isAdmin = location.search.includes('user=admin');
// ?user=admin


getFormula().then(({ data: res }: any) => {
  codeBlock.value = '```js\r' + res[0].example + '\r ```';
  data.value = res;
});

const parse = (tags) => JSON.parse(tags);
const clickCard = (ev, i, code) => {
  if (ev.target.nodeName === 'SPAN') return;
  codeBlock.value = '```js\r' + code + '\r```';
  active.value = i;
};

// const searchDel = () => search.value = '';
const tagDel = (tag: string) => fiterTags.value = fiterTags.value.filter(e => e !== tag);
const tagAdd = (tag: string) => fiterTags.value = [...new Set([...fiterTags.value, tag])];
const tagClear = () => fiterTags.value = [];

const fiterData = computed(() => data.value
  .filter(({ tags }) => {
    const cardTag = parse(tags);
    const bool = fiterTags.value.every(tag => cardTag.includes(tag))
    return bool;
  })
  .filter(({ cn_title, en_title }) => {
    return en_title.includes(search.value) || cn_title.includes(search.value)
  }))

const openVariety = () => drawerVisible.value = true;
const closeVariety = () => drawerVisible.value = false;

onUpdated(() => {
  // console.log(data.value[1]);
})

watch(fiterTags, () => localStorage.setItem('formula_tags', JSON.stringify(fiterTags.value)))

formulaStore.$onAction((store) => {
  store.after(content => {
    search.value = content;
    // formulaStore.$patch({ keyword: '' });
  });
});

</script>

<template>
  <div class="search" v-if="fiterTags.length">
    <p class="tags">
      <span v-for="tag in fiterTags" :key="tag" @click="tagDel(tag)">{{ tag }}</span>
    </p>
    <p class="clear"><span @click="tagClear">×</span></p>
  </div>
  <div class="box banner">
    <div class="card" v-if="isAdmin"><el-button style="width: 100%;" @click="openVariety">添加</el-button></div>
    <div class="card" v-for="formula in fiterData" :key="formula.id"
      @click="(ev) => clickCard(ev, formula.id, formula.example)">
      <h3>{{ formula.en_title }}</h3>
      <div class="sub">
        <h4>{{ formula.cn_title }}</h4>
        <p class="tags"><span v-for="tag in parse(formula.tags)" :key="tag" @click="tagAdd(tag)">{{ tag
            }}</span></p>
      </div>
      <hr />
      <p class="intro">{{ formula.intro }}</p>
      <div class="more" :class="active === formula.id && 'active'">
        <div v-for="(variety, index) in parse(formula.variety)" :key="index">
          <div class="sub">
            <strong>argument</strong>
            <p class="tags"><span v-for="tag in variety.argument" :key="tag">{{ tag
                }}</span></p>
          </div>
          <div class="sub">
            <strong>return</strong>
            <p><span>{{ variety.return }}</span></p>
          </div>
          <div class="sub">
            <strong>注</strong>
            <p><span>{{ variety.remark }}</span></p>
          </div>
        </div>
        <MdPreview :editorId="id" :modelValue="codeBlock" class="markdown page-formula" />
      </div>
    </div>
  </div>
  <add-formula :drawerVisible="drawerVisible" :closeVariety="closeVariety"></add-formula>
</template>

<style scoped>
.box {
  /* display: flex; */
  flex-wrap: wrap;
  /* background-color: #eee; */
  padding: 10px 10px;
  column-count: 1;
}

.card {
  /* column-count: 3; */
  -webkit-column-break-inside: avoid;
  counter-reset: unset;
  padding: 10px;
  margin-bottom: 10px;
  /* margin: 10px 0; */
  border: 2px solid #ccc;
  border-radius: 8px;

  &:hover {
    border-color: var(--main-color);
  }

  &.active {
    border-color: var(--light-color);
  }

  h3 {
    /* display: inline-block; */
    margin-right: 10px;
    font-style: 26px;
    font-weight: 800;
  }

  div.sub {
    display: flex;
    margin-bottom: 5px;

    h4 {
      display: inline-block;
      font-weight: 200;
      margin-right: 10px;
    }
  }

  .more {
    display: none;
    margin-top: 10px;

    .markdown {
      margin: -10px 0;
    }

    &.active {
      display: block;
    }
  }

  strong {
    font-weight: bold;
    margin-right: 10px;
  }
}

.search {
  margin: 15px 10px;
  margin-bottom: 5px;
  padding-bottom: 8px;
  border-bottom: 2px solid #ccc;
  display: flex;
  justify-content: space-between;

  .clear {
    display: flex;
    line-height: 16px;
    cursor: pointer;

    &:hover {
      color: rgb(202, 104, 104);
    }
  }

  .keyword {
    background-color: var(--light6-color);
  }
}

p.tags {
  flex: 1;
  display: flex;
  align-items: center;

  span {
    cursor: pointer;
    display: inline-block;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    padding: 0 12px;
    margin-right: 4px;
    border-radius: 4px;
    background-color: #ccc;

    &:hover {
      background-color: #ddd;
    }
  }
}

@media (min-width: 768px) {
  .box {
    column-count: 2;
  }
}

@media (min-width: 992px) {
  .box {
    column-count: 3;
  }
}
</style>
