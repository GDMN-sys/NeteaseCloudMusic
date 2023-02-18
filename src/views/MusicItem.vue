<template>
    <div class="musicitem">

        <MusicItemTop :playlist="playlist" :creator="creator"></MusicItemTop>
        <MusicItemList :itemList="itemList" :subscribedCount="playlist.subscribedCount" />
    </div>

</template>

<script>
import { getMusicItem, getMusicItemList } from "@/request/api/home.js";
import MusicItemTop from "@/components/item/MusicItemTop.vue";
import MusicItemList from "@/components/item/MusicItemList.vue";
export default {
    components: { MusicItemTop, MusicItemList },
    data() {
        return {
            playlist: {}, //歌单详情页数据
            itemList: [], //歌曲列表数据
            creator: {},
        };
    },
    methods: {
        async GetMusicItem() {
            let res = await getMusicItem(this.$route.query.id);
            this.playlist = res.data.playlist;
            this.creator = res.data.playlist.creator;
            // console.log(this.playlist);
            // 防止刷新数据丢失
            sessionStorage.setItem("playlist", JSON.stringify(this.playlist));
            let result = await getMusicItemList(this.$route.query.id);
            this.itemList = result.data.songs;
            sessionStorage.setItem("itemList", JSON.stringify(this.itemList));

            // console.log(result.data.songs);
        },
    },
    mounted() {
        this.GetMusicItem()

        setTimeout(() => {
            console.log("itemList", this.itemList);
            console.log("playlist", this.playlist);
            // console.log(this.creator);
        }, 1000);
    },
};
</script>

<style>

</style>