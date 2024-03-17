<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const props = defineProps(['list', 'title', 'click']);

console.log(props.list);

</script>

<template>
  <main>
    <h1>{{ props.title }}</h1>
    <ul class="box">
      <li class="card" v-for="li in props.list" :key="li.id" @click="click(['note', li.id])">
        <p class="title">{{ li.title }}<span></span></p>
        <p class="tag">{{ li.type }}</p>
        <p class="date">{{ li.date }}</p>
        <p class="note">{{ li.note.slice(0, 60).replace(/#|>/g, '') + '......' }}</p>
      </li>
    </ul>
  </main>
</template>

<style scoped>
main {
  flex: 1;
  background-color: #fff;
  padding-top: 1rem;
}

h1 {
  display: inline-block;
  font-weight: bold;
  font-size: 36px;
  padding-right: 45px;
  margin-left: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid #555;
}

.box {
  /* background-color: red; */
  margin-left: 20px;
  padding: 0;
}

.card {
  position: relative;
  list-style: none;
  border: 1px solid #ccc9;
  padding: 20px;
  padding-top: 10px;
  width: calc(100% - 60px);
  margin-bottom: 20px;
  transition: box-shadow .1s;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 8px -5px #555 inset;
  }

  .title {
    display: inline-block;
    font-size: 26px;
  }

  .tag {
    display: inline-block;
    padding: 0px 12px;
    margin-left: 8px;
    line-height: 8px;
    vertical-align: middle;
    color: #666;
    border-bottom: 6px solid #e5e4ec;
  }

  .date {
    position: absolute;
    right: 10px;
    top: 4px;
    color: #ccc;
  }

  .note {
    width: calc(100% - 20px);
    margin-top: 6px;
    padding-left: 12px;
    /* width: calc(100% - 32px); */
    line-height: 30px;
    border-left: 4px solid var(--light-color);
  }
}
</style>