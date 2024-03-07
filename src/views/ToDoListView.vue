<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive, onBeforeMount, onUpdated } from 'vue'
import { getTodoList, setTodoList } from '@/api/todolist.js'

const EMPTY_DATA = { id: 0, time: 0, content: '', done: true, tips: [] }
const DEFAULT_DATA = [
    {
        id: 1709566560442, time: "3.6 15时", content: '跑步10公里', done: false, tips: [
            { id: 1709566560449, time: "3.6 15时", content: '跑步1公里', done: true },
            { id: 1709566560452, time: "3.6 15时", content: '歇一下', done: false },
            { id: 1709566560453, time: "3.6 15时", content: '喝口水', done: false },
            { id: 1709566560455, time: "3.6 15时", content: '跑步1公里', done: false },
        ]
    },
    { id: 1709566560443, time: "3.6 15时", content: '俯卧撑100个', done: true, tips: [] },
    { id: 1709566560445, time: "3.6 15时", content: '深蹲100个', done: true, tips: [] },
    { id: 1709566560446, time: "3.6 15时", content: '仰卧起坐100个', done: true, tips: [] },
]
// const INIT_DATA = JSON.parse(localStorage.getItem('todolist') || null) || DEFAULT_DATA;
const INIT_DATA = DEFAULT_DATA;
const CN_RULE = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/;

const initData = ref(INIT_DATA);
const addText = ref(null);
const tipText = ref(null);
const nameText = ref('');
const tipsId = ref(1709566560442);
const tipsVisible = ref(false);
const updataVisible = ref(false);
const updataIsSave = ref(false);
const todoList = computed(() => initData.value.filter(({ done }) => !done));
const doneList = computed(() => initData.value.filter(({ done }) => done));
const activeData = computed(() => initData.value.find(({ id }) => id === tipsId.value) || EMPTY_DATA);
const activeTipsIsMax = computed(() => activeData.value.tips.length >= 4);

const add = ({ code }: { code: string }, selector: 'todo' | 'tips' = 'todo') => {
    const id = Date.now();
    const time = `${new Date().getMonth() + 1}.${new Date().getDate()} ${new Date().toLocaleTimeString().replace(/:.*/, '')}时`;
    const done = false;

    if (['Enter', 'NumpadEnter'].includes(code)) {
        switch (selector) {
            case 'todo': {
                console.log('todo');
                if (!addText.value) return;
                const content = addText.value;
                initData.value.push({ content, time, id, done, tips: [] });
                addText.value = null;
                break;
            };
            case 'tips': {
                if (!tipText.value) return;
                const content = tipText.value;
                activeData.value.tips.push({ content, time, id, done });
                tipText.value = null;
                break;
            };
            default: return;
        }
    }
}

const del = (id: number) => initData.value = initData.value.filter(e => e.id !== id);
const clear = () => initData.value = [];
const tipOpen = (id: number, target) => {
    if (['INPUT', 'A'].includes(target.nodeName)) return;
    tipsVisible.value = true;
    tipsId.value = id;
};
const close = (ev: Event) => {
    const classList: string = ev.target?.classList?.value || '';
    const isClose = ['off', 'popCount', 'main'].some(e => classList.includes(e));
    if (!isClose) return;

    tipsVisible.value = false;
    updataVisible.value = false;
    tipsId.value = 0;
    tipText.value = null;
};
const tipToggle = (id: number) => {
    const tips = activeData.value.tips;
    tips.forEach((tip) => { if (tip.id === id) tip.done = !tip.done })
};
const tipDel = (id: number) => activeData.value.tips = activeData.value.tips.filter(e => e.id !== id);

const updataOpen = (who) => {
    updataIsSave.value = who === 'save';
    updataVisible.value = true;
}

const updataHandle = () => {
    const name = nameText.value.match(CN_RULE)?.[0];
    if (!name) return;
    if (updataIsSave.value) {
        const list = JSON.stringify(initData.value)
        console.log(name);
        console.log();
        console.log('save');
        setTodoList({ name, list });
    } else {
        console.log(name);
        console.log('read');
        getTodoList({ name });
    }
}

watch(initData, () => {
    window.localStorage.setItem('todolist', JSON.stringify(initData.value))
}, { deep: true });

onUpdated(() => {
    // const 
})

</script>

<template>
    <main @click="close" class="main">
        <!-- <header>
            <section>
                <label for="title">TodoList</label>
                <input type="text" id="title" name="title" placeholder="添加ToDo" @keydown="add" v-model="addText" />
            </section>
        </header> -->
        <section>
            <h2>正在进行 <span id="todocount">{{ todoList.length }}</span></h2>
            <ol id="todolist" class="demo-box">
                <li v-for="item in todoList" :key="item.id" @click="({ target }) => tipOpen(item.id, target)">
                    <input type="checkbox" v-model="item.done" />
                    <p style="margin-right: 15px;">{{ item.content }}</p>
                    <div class="progress" :class="tip.done && 'done'" v-for="tip in item.tips" :key="tip.id" />
                    <!-- <div class="progress" /> -->
                    <em>{{ item.time }}</em>
                    <a @click="del(item.id)">-</a>
                </li>
            </ol>
            <h2>已经完成 <span id="donecount">{{ doneList.length }}</span></h2>
            <ul id="donelist">
                <li v-for="item in doneList" :key="item.id">
                    <input type="checkbox" v-model="item.done" />
                    <p>{{ item.content }}</p>
                    <em>{{ item.time }}</em>
                    <a @click="del(item.id)">-</a>
                </li>
            </ul>
        </section>
        <footer>
            More Operations &copy;
            <el-popconfirm title="全部清空" confirm-button-text="清空" cancel-button-text="取消" @confirm="clear">
                <template #reference>
                    <a>clear</a>
                </template>
            </el-popconfirm>
            &nbsp;
            <div class="update_box">
                <a @click="updataOpen('save')">save</a>&nbsp;
                <a @click="updataOpen('read')">read</a>&nbsp;
                <div class="updata_model" :class="[opacity = updataVisible || 'hide', updataIsSave || 'save']">
                    <input type="text" placeholder="昵称(中文)" v-model="nameText">
                    <button @click="updataHandle">{{ updataIsSave ? 'save' : 'read' }}</button>
                </div>
            </div>
            2024 todolist.cn
        </footer>

        <div class="popCount nodie" v-if="tipsVisible">
            <div class="pop">
                <dl class="steps">
                    <dt>
                        <input type="text" v-model="activeData.content">
                    </dt>
                    <dd v-for="tip in activeData.tips" :class="tip.done && 'check'" :key="tip.id">
                        <p @click="tipToggle(tip.id)"></p>
                        {{ tip.content }}
                        <a @click="tipDel(tip.id)">-</a>
                    </dd>
                </dl>
                <!-- <div class="scroll">
                    <div class="bar"></div>
                </div> -->
                <input type="text" class="txt" :placeholder="activeTipsIsMax ? '不可添加' : '添加小贴士'"
                    @keydown="(ev) => add(ev, 'tips')" v-model="tipText" />
                <input type="button" class="add" :class="activeTipsIsMax && 'readonly'" value="添加"
                    @click="add({ code: activeTipsIsMax || 'Enter' }, 'tips')" />
                <input type="button" class="off" value="关闭" />
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    background-color: #CDCDCD;
    height: calc(100% - 60px);

    /* header {
        height: 50px;
        background: #333;
        background: rgba(47, 47, 47, 0.98);
    } */

    section {
        margin: 0 auto;
    }
}


/* label {
    float: left;
    width: 100px;
    line-height: 50px;
    color: #DDD;
    font-size: 24px;
    cursor: pointer;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

header input {
    float: right;
    width: 60%;
    height: 24px;
    margin-top: 12px;
    text-indent: 10px;
    border-radius: 5px;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.24), 0 1px 6px rgba(0, 0, 0, 0.45) inset;
    border: none
} */

input:focus {
    outline-width: 0
}

h2 {
    position: relative;
    font-weight: bold;
    padding: 20px 0;
}

span#todocount,
span#donecount {
    user-select: none;
    position: absolute;
    top: 22px;
    right: 5px;
    display: inline-block;
    padding: 0 5px;
    height: 20px;
    border-radius: 20px;
    background: #E6E6FA;
    line-height: 22px;
    text-align: center;
    color: #666;
    font-size: 14px;
}

ol,
ul {
    padding: 0;
    list-style: none;
    user-select: none;
}

li>input {
    position: absolute;
    top: 5px;
    left: 12px;
    width: 22px;
    height: 22px;
    cursor: pointer;
}

p {
    margin: 0;
    display: inline-block;
}

li>p input {
    top: 3px;
    left: 40px;
    width: 70%;
    height: 20px;
    line-height: 14px;
    text-indent: 5px;
    font-size: 14px;
}

li>p,
li>em {
    pointer-events: none;
}

li {
    height: 32px;
    line-height: 32px;
    background: #fff;
    position: relative;
    margin-bottom: 10px;
    padding: 0 45px;
    border-radius: 3px;
    border-left: 5px solid var(--main-color);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07);
}

ol li {
    cursor: pointer;
}

ul li {
    border-left: 5px solid #999;
    opacity: 0.5;
}

li>a {
    position: absolute;
    top: 2px;
    right: 5px;
    display: inline-block;
    width: 28px;
    height: 28px;
    border-radius: 14px;
    border: 6px double #FFF;
    background: #CCC;
    line-height: 14px;
    text-align: center;
    color: #FFF;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
}

li:hover .progress {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 4px;
    border: 1px solid var(--main-color);
    background-color: #fff;

    &.done {
        background-color: var(--light-color);
    }
}



li em {
    position: absolute;
    top: 2px;
    right: 40px;
    display: inline-block;
    /* direction: rtl; */
    font-style: normal;
    color: #eee;
    height: 24px;
    line-height: 26px;
    font-weight: bold;
    text-align: center;
    font-size: 14px;
}

#todolist li:hover {
    background-color: var(--light-color);
}

#donelist li:hover {
    opacity: .7;
    background-color: #d3efff;
}

li:hover em {
    color: #333;
}

footer {
    margin-top: 60px;
    color: #666;
    font-size: 14px;
    text-align: center;
}

footer a {
    color: #666;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        color: #999;
    }
}

.update_box {
    position: relative;
    display: inline-block;
}


.updata_model {
    display: inline-block;
    position: absolute;
    width: 160px;
    top: 32px;
    left: -14px;
    padding: 8px;
    padding-top: 7px;
    border-radius: 4px;
    transition: opacity .2s;
    /* border: 2px solid var(--main-color); */
    /* background-color: var(--main-color); */
    background-color: #fff;

    &::after {
        position: absolute;
        display: block;
        content: '';
        top: -4px;
        left: 20px;
        transform: rotate(45deg);
        width: 10px;
        height: 10px;
        /* border: 2px solid var(--main-color); */
        border-right: none;
        border-bottom: none;
        background-color: #fff;
        /* background-color: var(--light-color); */
    }

    &.save {
        left: 22px;
    }

    &.hide {
        opacity: 0;
    }

    input {
        width: 80px;
        margin-right: 12px;
        border-radius: 2px;
        border: 1px solid var(--main-color);
        outline: none;

        &::placeholder {
            color: #bbb;
        }
    }

    button {
        cursor: pointer;
        border: none;
        outline: none;
        height: 20px;
        padding: 0 8px;
        border-radius: 2px;
        background-color: var(--main-color);
        color: #fff;

        &:hover {
            background-color: var(--light-color);
        }
    }
}

.die {
    display: none;
}

.nodie {
    display: block;
}

.popCount {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
    z-index: 50;
    cursor: initial;
}

.pop {
    width: 450px;
    height: 360px;
    background-color: white;
    border-top: 24px solid var(--main-color);
    border-radius: 15px;
    position: fixed;
    left: calc(50% - 225px);
    bottom: 50%;
    z-index: 55;
    cursor: initial;
}

/* .pop div.scroll {
    position: absolute;
    width: 14px;
    height: 200px;
    border-radius: 6px;
    top: 15px;
    right: 10px;
    background-color: rgb(245, 245, 245);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1) inset;
}

.pop div.scroll>div.bar {
    position: absolute;
    width: 12px;
    height: 50px;
    top: 0px;
    right: 0;
    border-radius: 5px;
    border: 1px solid #40c4c9;
    background-color: #fff;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
} */

/* .pop div.scroll>div.bar:hover {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
}

.pop div.scroll>div.bar:active {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
} */

.pop input {
    float: left;
}

.add,
.off {
    position: absolute;
    bottom: 20px;
    /* top: 200px; */
    width: 90px;
    height: 45px;
    border-radius: 10px;
    border: transparent;
    cursor: pointer;
}

.add {
    left: 50%;
    background-color: #76babd;
    color: white;

    &.readonly {
        background-color: #e0e0e0;
        color: rgb(129, 129, 129);
        cursor: unset;
    }
}

.add:active {
    background-color: var(--main-color);
}

.off {
    left: 74%;
    background-color: #e0e0e0;
    color: rgb(129, 129, 129);
}

.off:active {
    background-color: #cccccc;
}

.txt {
    border: 3px solid #ccc;
    border-radius: 5px;
    line-height: 36px;
    width: 155px;
    padding-left: 10px;
    text-align: left;
    position: absolute;
    left: 6%;
    bottom: 20px;
    color: #666;
    font-size: 16px;
}

.popCount dl {
    /* max-height: 200px; */
    overflow: hidden;
}

.popCount .ddBox {
    padding-bottom: 15px;
}

.popCount dl.steps {
    margin: 0 0 15px 0;

}

.popCount dl:nth-child(2) {
    pointer-events: none;
    position: absolute;
    bottom: 80px;
    width: 100%;
    margin: 0;
    height: 50px;
    z-index: 10;
    background-image: linear-gradient(to top, white, rgba(255, 0, 0, 0));
    /* background-image: linear-gradient(to top,rgb(180, 55, 55) ,rgba(255, 0, 0, 0)); */
}

.popCount dt {
    color: #555;
    border-bottom: 2px solid var(--main-color);
    height: 34px;
    margin: 10px 25px 15px;
    padding-left: 8px;

    & input {
        width: 150px;
        line-height: 30px;
        font-size: 20px;
        border: none;
    }
}

.popCount dd {
    color: #555;
    height: 36px;
    line-height: 36px;
    margin: 0 25px 15px 25px;
    padding: 0 10px 0 8px;
    box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    background-color: white;
    vertical-align: middle;
}

.popCount dd input {
    margin-top: 11px;
    margin-right: 10px;
}

.popCount dd.check {
    color: #999;
    background-color: #eee;
    /* background-color: red; */
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1) inset;
}

.popCount dd a {
    user-select: none;
    position: relative;
    cursor: pointer;
    right: -10px;
    border-radius: 0 5px 5px 0;
    box-shadow: 3px 0 2px 0 inset rgba(0, 0, 0, 0.1);
    width: 35px;
    padding-left: 10px;
    float: right;
    border: none;
    color: #fff;
    font-size: 30px;
    text-decoration: none;
    background-color: #ddd;
}

.popCount dd.check>a {
    box-shadow: none
}

.popCount dd>p {
    width: 12px;
    height: 12px;
    margin: 0 5px;
    border: 1px solid #999;
    cursor: pointer;
}

.popCount dd.check>p {
    background-color: #ddd;
    border-color: rgb(231, 230, 230);
    box-shadow: 3px 3px 2px 0 inset rgba(0, 0, 0, 0.1);
}


@media screen and (max-device-width: 620px) {
    section {
        width: 96%;
        padding: 0 2%;
    }
}

@media screen and (min-width: 620px) {
    section {
        width: 600px;
        padding: 0 10px;
    }
}
</style>