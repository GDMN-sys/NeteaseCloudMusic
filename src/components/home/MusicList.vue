<template>
    <div class="musiclist">
        <div class="listtop">
            <span class="text">发现好歌单</span>
            <span class="more">查看更多</span>
        </div>
        <div class="content">
            <van-swipe :loop="false" :width="150" :show-indicators="false">
                <van-swipe-item v-for=" item in musiclist" :key="item.id">
                    <router-link :to="{ path: '/musicitem', query: { id: item.id } }">
                        <img :src="item.picUrl" alt="">
                        <span class="text">
                            {{ item.name }}
                        </span>
                        <div class="playcount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-play"></use>
                            </svg>
                            <span>
                                {{ changeCount(item.playCount) }}
                            </span>
                        </div>
                    </router-link>
                </van-swipe-item>

            </van-swipe>
        </div>
    </div>
</template>

<script>
import { getMusicList } from "@/request/api/home.js";
export default {
    data() {
        return {
            musiclist: [],
        };
    },
    computed: {},
    methods: {
        async GetMusicList() {
            let res = await getMusicList(10);
            // console.log(res.data.result);
            this.musiclist = res.data.result;
        },
        // 处理播放量
        changeCount(num) {
            if (num > 100000000) {
                return (num / 100000000).toFixed(1) + "亿";
            } else if (num > 10000) {
                return (num / 10000).toFixed(1) + "万";
            }
        },
    },
    mounted() {
        this.GetMusicList();
    },
};
</script>

<style lang="less" scoped>
.musiclist {
    margin-top: 0.4rem;

    .listtop {
        display: flex;
        justify-content: space-between;
        padding: 0.2rem;

        .text {
            font-weight: 700;
        }

        .more {
            font-size: small;
            border: 1px solid #ccc;
            border-radius: 60px;
            padding: 0.1rem;
        }
    }

    .content {
        width: 100%;

        // height: 1rem;
        .van-swipe {
            width: 100%;

            .van-swipe__track {
                .van-swipe-item {
                    padding: 0 0.1rem;

                    img {
                        width: 100%;
                        border-radius: 0.3rem;
                        position: relative;
                    }

                    .text {
                        word-break: break-all;
                        display: -webkit-box;
                        overflow: hidden;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }

                    .playcount {
                        position: absolute;
                        top: 0;
                        right: 0.2rem;
                        color: #fff;
                        font-size: small;

                        .icon {
                            fill: #fff;
                            vertical-align: bottom;
                        }
                    }
                }
            }
        }
    }
}
</style>