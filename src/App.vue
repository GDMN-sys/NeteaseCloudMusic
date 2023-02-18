<template>
    <div id="app">
        <router-view />
        <FotterMusic v-show="$store.state.isFotterShow" />
    </div>
</template>

<script>
import FotterMusic from "./components/item/FotterMusic.vue";
export default {
    name: "App",
    components: {
        FotterMusic,
    },
};
</script>
<style lang="less">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

a {
    color: #000;
}

.icon {
    width: 0.4rem;
    height: 0.4rem;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
