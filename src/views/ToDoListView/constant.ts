export const EMPTY_DATA = { id: 0, time: 0, content: '', done: true, tips: [] };
export const DEFAULT_DATA = [
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
];
export const CN_RULE = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/;
