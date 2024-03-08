<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'

const nowHours = (function () {
    const h = new Date().getHours();
    if (h >= 6 && h < 10) return 'morning';
    if (h >= 10 && h < 14) return 'noon';
    if (h >= 14 && h < 18) return 'afternoon';
    if (h >= 18 || h < 6) return 'evening';
}());

const time = ref('6:33')
const day = ref('3月8日')

const getNowDay = () => new Date().toLocaleDateString().split('/').slice(1).join('月') + '日';
const getNowTime = () => {
    const timeText = new Date().toLocaleTimeString();
    if (timeText[0]) {
        return timeText.slice(1, 5);
    } else {
        return timeText.slice(0, 5);
    }
}

day.value = getNowDay();
time.value = getNowTime();
let timer = setInterval(() => {
    time.value = getNowTime();
}, 30000)

onBeforeUnmount(() => {
    clearInterval(timer);
})

</script>

<template>
    <div class="box" :class="nowHours">
        <div class="date">
            <p class="day">{{ day }}</p>
            <p>{{ time }}</p>
        </div>
        <div class="BX_AEComposition" AELayerName="DEMO_01">
            <div class="BX_Class4 BX_Ani4" id="BX_Layer4" AELayerName="4.SUN">
                <div class="BX_Sprite4"></div>
            </div>
            <div class="BX_Class3 BX_Ani3" id="BX_Layer3" AELayerName="3.SUN">
                <div class="BX_Sprite3"></div>
            </div>
            <div class="BX_Class2 BX_Ani2" id="BX_Layer2" AELayerName="2.SUN">
                <div class="BX_Sprite2"></div>
            </div>
            <div class="BX_Class1 BX_Ani1" id="BX_Layer1" AELayerName="1.SUN">
                <div class="BX_Sprite1"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.box {
    width: 100%;
    height: calc(100% - 60px);
    background-color: #000;

    &.morning {
        background-image: linear-gradient(to top, rgb(252, 252, 252), rgb(204, 255, 252), rgb(76, 185, 228) 80%, rgb(23, 138, 231));
    }

    &.noon {
        background-image: linear-gradient(to top, rgb(252, 252, 202), rgb(209, 185, 119) 30%, rgb(161, 93, 76), rgb(141, 40, 40));
    }

    &.afternoon {
        background-image: linear-gradient(to top, rgb(252, 252, 252), rgb(204, 255, 252), rgb(76, 185, 228) 80%, rgb(23, 138, 231));
    }

    &.evening {
        background-image: linear-gradient(to top, rgb(76, 120, 146), rgb(39, 80, 119), rgb(22, 38, 92), rgb(3, 7, 31));
    }
}

.date {
    position: absolute;
    /* width: 100%; */
    top: 320px;
    left: calc(50% - 180px);
    text-align: right;
    font-size: 72px;
    color: #fff;
    /* text-shadow: 1px -1px 3px rgb(0, 0, 0), 1px -1px 3px rgb(0, 0, 0), -1px 1px 3px #000, 1px 1px 3px #000; */
    font-family: 'Courier New', Courier, monospace;
    /* background-color: rgb(117, 93, 93); */

    & .day {
        font-size: 30px;
        margin-bottom: -12px;
        /* line-height: ; */
    }
}

/* Generated via BX-AE2CSS by BigXiXi */
.BX_AEComposition {
    margin: 0 auto;
    background: transparent;
    width: 200px;
    height: 200px;
    display: block;
    overflow: hidden;
    position: relative;
    top: 100px;
    left: 60px;
    transform: translate3D(0, 0, 0) scale(1, 1);
    transform: scale(2);
    transform-origin: 50% 0%;
    opacity: 0.6;
}

.BX_Class4 {
    left: -150.00px;
    top: -149.00px;
    width: 500px;
    height: 500px;
    transform-style: preserve-3d;
    transform: translate3D(0, 0, 0.00px) rotate(0.00deg) scale(0.40, 0.40);
    opacity: 1.00;
    transform-origin: 50.00% 50.00%;
    display: block;
    position: absolute;
}

.BX_BG4 {
    background: transparent;
}

.BX_Ani4 {
    /* animation: name duration timing-function delay iteration-count direction fill-mode; */
    animation: BX_AniKey4 1.76s steps(1) 0.00s infinite alternate none;
}

@keyframes BX_AniKey4 {
    /* 		This layer has no animations to export */
}

.BX_Sprite4 {
    background-image: url("@/../public/bg_Setting_sun/imgs/sprite4.png");
    width: 500px;
    height: 500px;
    animation: BX_SprAniKey4 1.76s steps(1) 0s infinite alternate none;
}

@keyframes BX_SprAniKey4 {
    0% {
        background-position: 0px 0px;
    }

    2.27% {
        background-position: -500px 0px;
    }

    4.55% {
        background-position: -1000px 0px;
    }

    6.82% {
        background-position: -1500px 0px;
    }

    9.09% {
        background-position: -2000px 0px;
    }

    11.36% {
        background-position: -2500px 0px;
    }

    13.64% {
        background-position: -3000px 0px;
    }

    15.91% {
        background-position: -3500px 0px;
    }

    18.18% {
        background-position: 0px -500px;
    }

    20.45% {
        background-position: -500px -500px;
    }

    22.73% {
        background-position: -1000px -500px;
    }

    25.00% {
        background-position: -1500px -500px;
    }

    27.27% {
        background-position: -2000px -500px;
    }

    29.55% {
        background-position: -2500px -500px;
    }

    31.82% {
        background-position: -3000px -500px;
    }

    34.09% {
        background-position: -3500px -500px;
    }

    36.36% {
        background-position: 0px -1000px;
    }

    38.64% {
        background-position: -500px -1000px;
    }

    40.91% {
        background-position: -1000px -1000px;
    }

    43.18% {
        background-position: -1500px -1000px;
    }

    45.45% {
        background-position: -2000px -1000px;
    }

    47.73% {
        background-position: -2500px -1000px;
    }

    50.00% {
        background-position: -3000px -1000px;
    }

    52.27% {
        background-position: -3500px -1000px;
    }

    54.55% {
        background-position: 0px -1500px;
    }

    56.82% {
        background-position: -500px -1500px;
    }

    59.09% {
        background-position: -1000px -1500px;
    }

    61.36% {
        background-position: -1500px -1500px;
    }

    63.64% {
        background-position: -2000px -1500px;
    }

    65.91% {
        background-position: -2500px -1500px;
    }

    68.18% {
        background-position: -3000px -1500px;
    }

    70.45% {
        background-position: -3500px -1500px;
    }

    72.73% {
        background-position: 0px -2000px;
    }

    75.00% {
        background-position: -500px -2000px;
    }

    77.27% {
        background-position: -1000px -2000px;
    }

    79.55% {
        background-position: -1500px -2000px;
    }

    81.82% {
        background-position: -2000px -2000px;
    }

    84.09% {
        background-position: -2500px -2000px;
    }

    86.36% {
        background-position: -3000px -2000px;
    }

    88.64% {
        background-position: -3500px -2000px;
    }

    90.91% {
        background-position: 0px -2500px;
    }

    93.18% {
        background-position: -500px -2500px;
    }

    95.45% {
        background-position: -1000px -2500px;
    }

    97.73% {
        background-position: -1500px -2500px;
    }

    100.00% {
        background-position: -2000px -2500px;
    }
}

.BX_Class3 {
    left: -150.00px;
    top: -149.00px;
    width: 500px;
    height: 500px;
    transform-style: preserve-3d;
    transform: translate3D(0, 0, 0.00px) rotate(0.00deg) scale(0.40, 0.40);
    opacity: 1.00;
    transform-origin: 50.00% 50.00%;
    display: block;
    position: absolute;
}

.BX_BG3 {
    background: transparent;
}

.BX_Ani3 {
    /* animation: name duration timing-function delay iteration-count direction fill-mode; */
    animation: BX_AniKey3 1.76s steps(1) 0.00s infinite alternate none;
}

@keyframes BX_AniKey3 {
    /* 		This layer has no animations to export */
}

.BX_Sprite3 {
    background-image: url("@/../public/bg_Setting_sun/imgs/sprite3.png");
    width: 500px;
    height: 500px;
    animation: BX_SprAniKey3 1.76s steps(1) 0s infinite alternate none;
}

@keyframes BX_SprAniKey3 {
    0% {
        background-position: 0px 0px;
    }

    2.27% {
        background-position: -500px 0px;
    }

    4.55% {
        background-position: -1000px 0px;
    }

    6.82% {
        background-position: -1500px 0px;
    }

    9.09% {
        background-position: -2000px 0px;
    }

    11.36% {
        background-position: -2500px 0px;
    }

    13.64% {
        background-position: -3000px 0px;
    }

    15.91% {
        background-position: -3500px 0px;
    }

    18.18% {
        background-position: 0px -500px;
    }

    20.45% {
        background-position: -500px -500px;
    }

    22.73% {
        background-position: -1000px -500px;
    }

    25.00% {
        background-position: -1500px -500px;
    }

    27.27% {
        background-position: -2000px -500px;
    }

    29.55% {
        background-position: -2500px -500px;
    }

    31.82% {
        background-position: -3000px -500px;
    }

    34.09% {
        background-position: -3500px -500px;
    }

    36.36% {
        background-position: 0px -1000px;
    }

    38.64% {
        background-position: -500px -1000px;
    }

    40.91% {
        background-position: -1000px -1000px;
    }

    43.18% {
        background-position: -1500px -1000px;
    }

    45.45% {
        background-position: -2000px -1000px;
    }

    47.73% {
        background-position: -2500px -1000px;
    }

    50.00% {
        background-position: -3000px -1000px;
    }

    52.27% {
        background-position: -3500px -1000px;
    }

    54.55% {
        background-position: 0px -1500px;
    }

    56.82% {
        background-position: -500px -1500px;
    }

    59.09% {
        background-position: -1000px -1500px;
    }

    61.36% {
        background-position: -1500px -1500px;
    }

    63.64% {
        background-position: -2000px -1500px;
    }

    65.91% {
        background-position: -2500px -1500px;
    }

    68.18% {
        background-position: -3000px -1500px;
    }

    70.45% {
        background-position: -3500px -1500px;
    }

    72.73% {
        background-position: 0px -2000px;
    }

    75.00% {
        background-position: -500px -2000px;
    }

    77.27% {
        background-position: -1000px -2000px;
    }

    79.55% {
        background-position: -1500px -2000px;
    }

    81.82% {
        background-position: -2000px -2000px;
    }

    84.09% {
        background-position: -2500px -2000px;
    }

    86.36% {
        background-position: -3000px -2000px;
    }

    88.64% {
        background-position: -3500px -2000px;
    }

    90.91% {
        background-position: 0px -2500px;
    }

    93.18% {
        background-position: -500px -2500px;
    }

    95.45% {
        background-position: -1000px -2500px;
    }

    97.73% {
        background-position: -1500px -2500px;
    }

    100.00% {
        background-position: -2000px -2500px;
    }
}

.BX_Class2 {
    left: -150.00px;
    top: -149.00px;
    width: 500px;
    height: 500px;
    transform-style: preserve-3d;
    transform: translate3D(0, 0, 0.00px) rotate(0.00deg) scale(0.40, 0.40);
    opacity: 1.00;
    transform-origin: 50.00% 50.00%;
    display: block;
    position: absolute;
}

.BX_BG2 {
    background: transparent;
}

.BX_Ani2 {
    /* animation: name duration timing-function delay iteration-count direction fill-mode; */
    animation: BX_AniKey2 1.76s steps(1) 0.00s infinite alternate none;
}

@keyframes BX_AniKey2 {
    /* 		This layer has no animations to export */
}

.BX_Sprite2 {
    background-image: url("@/../public/bg_Setting_sun/imgs/sprite2.png");
    width: 500px;
    height: 500px;
    animation: BX_SprAniKey2 1.76s steps(1) 0s infinite alternate none;
}

@keyframes BX_SprAniKey2 {
    0% {
        background-position: 0px 0px;
    }

    2.27% {
        background-position: -500px 0px;
    }

    4.55% {
        background-position: -1000px 0px;
    }

    6.82% {
        background-position: -1500px 0px;
    }

    9.09% {
        background-position: -2000px 0px;
    }

    11.36% {
        background-position: -2500px 0px;
    }

    13.64% {
        background-position: -3000px 0px;
    }

    15.91% {
        background-position: -3500px 0px;
    }

    18.18% {
        background-position: 0px -500px;
    }

    20.45% {
        background-position: -500px -500px;
    }

    22.73% {
        background-position: -1000px -500px;
    }

    25.00% {
        background-position: -1500px -500px;
    }

    27.27% {
        background-position: -2000px -500px;
    }

    29.55% {
        background-position: -2500px -500px;
    }

    31.82% {
        background-position: -3000px -500px;
    }

    34.09% {
        background-position: -3500px -500px;
    }

    36.36% {
        background-position: 0px -1000px;
    }

    38.64% {
        background-position: -500px -1000px;
    }

    40.91% {
        background-position: -1000px -1000px;
    }

    43.18% {
        background-position: -1500px -1000px;
    }

    45.45% {
        background-position: -2000px -1000px;
    }

    47.73% {
        background-position: -2500px -1000px;
    }

    50.00% {
        background-position: -3000px -1000px;
    }

    52.27% {
        background-position: -3500px -1000px;
    }

    54.55% {
        background-position: 0px -1500px;
    }

    56.82% {
        background-position: -500px -1500px;
    }

    59.09% {
        background-position: -1000px -1500px;
    }

    61.36% {
        background-position: -1500px -1500px;
    }

    63.64% {
        background-position: -2000px -1500px;
    }

    65.91% {
        background-position: -2500px -1500px;
    }

    68.18% {
        background-position: -3000px -1500px;
    }

    70.45% {
        background-position: -3500px -1500px;
    }

    72.73% {
        background-position: 0px -2000px;
    }

    75.00% {
        background-position: -500px -2000px;
    }

    77.27% {
        background-position: -1000px -2000px;
    }

    79.55% {
        background-position: -1500px -2000px;
    }

    81.82% {
        background-position: -2000px -2000px;
    }

    84.09% {
        background-position: -2500px -2000px;
    }

    86.36% {
        background-position: -3000px -2000px;
    }

    88.64% {
        background-position: -3500px -2000px;
    }

    90.91% {
        background-position: 0px -2500px;
    }

    93.18% {
        background-position: -500px -2500px;
    }

    95.45% {
        background-position: -1000px -2500px;
    }

    97.73% {
        background-position: -1500px -2500px;
    }

    100.00% {
        background-position: -2000px -2500px;
    }
}

.BX_Class1 {
    left: -150.00px;
    top: -149.00px;
    width: 500px;
    height: 500px;
    transform-style: preserve-3d;
    transform: translate3D(0, 0, 0.00px) rotate(0.00deg) scale(0.40, 0.40);
    opacity: 1.00;
    transform-origin: 50.00% 50.00%;
    display: block;
    position: absolute;
}

.BX_BG1 {
    background: transparent;
}

.BX_Ani1 {
    /* animation: name duration timing-function delay iteration-count direction fill-mode; */
    animation: BX_AniKey1 1.76s steps(1) 0.00s infinite alternate none;
}

@keyframes BX_AniKey1 {
    /* 		This layer has no animations to export */
}

.BX_Sprite1 {
    background-image: url("@/../public/bg_Setting_sun/imgs/sprite1.png");
    width: 500px;
    height: 500px;
    animation: BX_SprAniKey1 1.76s steps(1) 0s infinite alternate none;
}

@keyframes BX_SprAniKey1 {
    0% {
        background-position: 0px 0px;
    }

    2.27% {
        background-position: -500px 0px;
    }

    4.55% {
        background-position: -1000px 0px;
    }

    6.82% {
        background-position: -1500px 0px;
    }

    9.09% {
        background-position: -2000px 0px;
    }

    11.36% {
        background-position: -2500px 0px;
    }

    13.64% {
        background-position: -3000px 0px;
    }

    15.91% {
        background-position: -3500px 0px;
    }

    18.18% {
        background-position: 0px -500px;
    }

    20.45% {
        background-position: -500px -500px;
    }

    22.73% {
        background-position: -1000px -500px;
    }

    25.00% {
        background-position: -1500px -500px;
    }

    27.27% {
        background-position: -2000px -500px;
    }

    29.55% {
        background-position: -2500px -500px;
    }

    31.82% {
        background-position: -3000px -500px;
    }

    34.09% {
        background-position: -3500px -500px;
    }

    36.36% {
        background-position: 0px -1000px;
    }

    38.64% {
        background-position: -500px -1000px;
    }

    40.91% {
        background-position: -1000px -1000px;
    }

    43.18% {
        background-position: -1500px -1000px;
    }

    45.45% {
        background-position: -2000px -1000px;
    }

    47.73% {
        background-position: -2500px -1000px;
    }

    50.00% {
        background-position: -3000px -1000px;
    }

    52.27% {
        background-position: -3500px -1000px;
    }

    54.55% {
        background-position: 0px -1500px;
    }

    56.82% {
        background-position: -500px -1500px;
    }

    59.09% {
        background-position: -1000px -1500px;
    }

    61.36% {
        background-position: -1500px -1500px;
    }

    63.64% {
        background-position: -2000px -1500px;
    }

    65.91% {
        background-position: -2500px -1500px;
    }

    68.18% {
        background-position: -3000px -1500px;
    }

    70.45% {
        background-position: -3500px -1500px;
    }

    72.73% {
        background-position: 0px -2000px;
    }

    75.00% {
        background-position: -500px -2000px;
    }

    77.27% {
        background-position: -1000px -2000px;
    }

    79.55% {
        background-position: -1500px -2000px;
    }

    81.82% {
        background-position: -2000px -2000px;
    }

    84.09% {
        background-position: -2500px -2000px;
    }

    86.36% {
        background-position: -3000px -2000px;
    }

    88.64% {
        background-position: -3500px -2000px;
    }

    90.91% {
        background-position: 0px -2500px;
    }

    93.18% {
        background-position: -500px -2500px;
    }

    95.45% {
        background-position: -1000px -2500px;
    }

    97.73% {
        background-position: -1500px -2500px;
    }

    100.00% {
        background-position: -2000px -2500px;
    }
}
</style>