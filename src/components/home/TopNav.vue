<template>
    <div class="topNav">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
        </svg>
        <div class="topNavContent">
            <router-link to="/user">我的</router-link>
            <span class='active'>发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
        <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
            <use xlink:href="#icon-sousuo"></use>
        </svg>

    </div>
</template>

<script>
export default {
    name: "TopNav",
};
</script>

<style lang="less" scoped>
.active {
    font-weight: 700;
}

.topNav {
    width: 100%;
    padding: 0.2rem;
    height: 1rem;
    display: flex;
    justify-content: space-between;

    .topNavContent {
        width: 65%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .icon {
        width: 0.6rem;
        height: 0.6rem;
    }
}
</style>>

