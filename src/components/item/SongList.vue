<template>
    <div class="songlist">
        <div class="itemlist" v-for="(item, index) in itemList" :key="index">
            <div class="item">
                <!-- @点击歌曲播放并将歌曲列表传递在vuex中的playSongs -->
                <div class="itemleft" @click="playMusic(index)">

                    <span class="num">{{ index+ 1 }}</span>
                    <div class="content">
                        <span class="text">{{ item.name }}</span>
                        <div class="author">
                            <span v-for="(item1, index1) in item.ar" :key="index1">
                                {{ item1.name }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="itemright">
                    <svg v-show="item.mv != 0" class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-24gl-playlistMusic3"></use>
                    </svg>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
    name: "SongList",
    props: ["itemList"],
    methods: {
        // subScribedCount(num) {
        //     if (num > 10000) {
        //         return (num / 10000).toFixed(1) + "万";
        //     } else if (num == "") {
        //         return 0;
        //     } else {
        //         return num;
        //     }
        // },
        playMusic(index) {
            //<!-- @将歌曲列表传递给vuex中的updatePlaySong 函数-->
            this.updatePlaySong(this.itemList);
            this.updatePlaySongIndex(index);
            this.$bus.$emit("updateTime");
            // this.$bus.$emit("addDuration", ((item) => item()));

        },

        ...mapMutations(["updatePlaySong", "updatePlaySongIndex"]),
    },
    mounted() {


    },

}
</script>
<style lang="less" scoped>
.item {
    display: flex;
    justify-content: space-between;
    padding: 0 0.2rem;
    margin: 0.2rem 0;
    width: 100%;
    height: 0.8rem;

    .itemleft {
        width: 65%;
        display: flex;
        justify-content: start;
        align-items: center;

        .num {
            margin-right: 0.2rem;
            width: 20px;
            text-align: center;
        }

        .content {
            width: 100%;
            font-size: 0.28rem;
            display: flex;
            flex-direction: column;

            .text {
                margin-bottom: 5px;
                display: -webkit-box;
                overflow: hidden;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }

            .author {
                display: flex;
                align-items: baseline;
                display: -webkit-box;
                overflow: hidden;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                font-size: 0.22rem;
                color: #999;

                span {
                    margin-right: 0.1rem;
                }
            }
        }
    }

    .itemright {
        width: 35%;
        display: flex;
        justify-content: end;
        align-items: center;
        line-height: 0.8rem;

        .icon {
            width: 0.5rem;
            height: 0.5rem;
            margin-left: 0.4rem;
        }
    }
}
</style>