<template>
    <div class="top">
        <div class="topleft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <span class="text">播放全部</span>
            <span class="count">(共{{ itemList.length }}首)</span>
        </div>
        <div class="topright">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiahao"></use>
            </svg>
            <span>收藏</span>
            <span>({{ subScribedCount(subscribedCount) }})</span>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        subScribedCount(num) {
            if (num > 10000) {
                return (num / 10000).toFixed(1) + "万";
            } else if (num == "") {
                return 0;
            } else {
                return num;
            }
        },
    },
    props: ["itemList", "subscribedCount"],
};
</script>

<style lang="less" scoped>
.top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 0.3rem;
    width: 100%;
    height: 1rem;

    .topleft {
        display: flex;
        align-items: center;
        justify-content: center;

        .icon {
            width: 0.5rem;
            height: 0.5rem;
            margin-right: 0.2rem;
        }

        .count {
            margin-left: 0.2rem;
            color: #999;
        }
    }

    .topright {
        border-radius: 0.4rem;
        background-color: #ff0100;
        padding: 0.14rem;
        color: white;
    }
}
</style>