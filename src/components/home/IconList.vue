<template>
    <div class="iconlist">
        <div class="iconitem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tuijian"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="iconitem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhibo"></use>
            </svg>
            <span>私人FM</span>
        </div>
        <div class="iconitem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-songlist-01"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="iconitem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>
<script>
export default {};
</script>

<style scoped lang="less">
.iconlist {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 0.2rem;

    .iconitem {
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon {
            width: 0.8rem;
            height: 0.8rem;
            margin-bottom: 0.3rem;
        }
    }
}
</style>