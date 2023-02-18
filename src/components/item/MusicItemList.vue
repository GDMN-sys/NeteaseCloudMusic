<template>
    <div class="musicitemlist">
        <MusicItemListTop :itemList="itemList" :subscribedCount="subscribedCount" />
        <SongList :itemList="itemList" />
    </div>
</template>

<script>
import MusicItemListTop from "./MusicItemListTop.vue";
import SongList from "./SongList.vue";
export default {
    name: "MusicItemList",
    components: { MusicItemListTop, SongList },
    props: ["itemList", "subscribedCount"],
};
</script>

<style lang="less" scoped>
.musicitemlist {
    margin-top: 0.3rem;
    margin-bottom: 1.4rem;
    background-color: #fff;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    width: 100%;
    height: auto;
}
</style>