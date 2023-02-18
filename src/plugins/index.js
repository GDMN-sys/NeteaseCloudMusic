import Vue from 'vue';

import { Lazyload, Swipe, SwipeItem, Popup, Loading, Form, Field, CellGroup, Button } from 'vant';
// 把引入的vant组件放入一个数组中循环使用
let commentArr = [Lazyload, Swipe, SwipeItem, Popup, Loading, Form, Field, CellGroup, Button]
export default function useVant() {
    commentArr.forEach((item) => {
        return Vue.use(item)
    })
}