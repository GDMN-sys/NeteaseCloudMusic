<template>
    <div class="detail">
        <div class="detailtop">
            <div class="detailtopleft">
                <svg @click="$router.go(-1);" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <div class="content">
                    <marquee class="text" direction="left" behavior="scroll" width="50%" scrollamount="2"
                        scrolldelay="30" onmouseover=this.stop() onmouseout=this.start()>
                        {{ playSong[playSongIndex].name }}
                    </marquee>
                    <div class="author">
                        <span v-for="(item, index) in playSong[playSongIndex].ar " :key="index">
                            {{ item.name }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="detailtopright">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>

            </div>
        </div>
        <div class="detailmiddle" @click="isLyricShow = !isLyricShow">
            <div class="imgcontainer" v-if="isLyricShow">
                <img src="@/assets/needle.png" alt="" class="needle" :class="{ active: !isbtnShow }">
                <div class="imgposition">
                    <img src="@/assets/cipan.png" alt="" class="cipan">
                    <img :src="this.playSong[playSongIndex].al.picUrl" alt="" class="imgs"
                        :class="[isbtnShow ? 'rotatepause' : 'runing']">
                    <!-- :style="{ animationPlayState: isbtnShow ? 'paused' : runing }" -->
                </div>
            </div>
            <MusicLyric :goPlay="goPlay" v-else>
                <template v-slot:noLyric>
                    <span>暂无歌词……</span>
                </template>
                <template v-slot:Lyric>
                    <!-- <span>暂无歌词……</span> -->
                </template>
            </MusicLyric>

        </div>
        <div class="detailbottom">
            <div class="iconcontainer">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-02"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="download">
                    <use xlink:href="#icon-download"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-heijiaochangpian"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiaoxi"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xunhuan"></use>
                </svg>
            </div>
            <!-- 进度条 -->
            <div class="progress-bar">
                <span>{{ modifycurrentTime }}</span>
                <input type="range" min="0" :max="duration" step="0.05" v-model="currentTime" ref="range"
                    @touchmove="moveBy()" @touchend="moveEnd" @input="moveBy">
                <span>{{ modifyduration }}</span>
            </div>

            <!-- :value="currentTime" @input="changect" -->
            <div class="iconcontainer">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xunhuan"></use>
                </svg>
                <!-- 上一首 -->
                <svg class="
                        icon" aria-hidden="true">
                    <use xlink:href="#icon-shangyishoushangyige" @click="goPlay(-1)"></use>
                </svg>
                <svg v-if="isbtnShow" class="icon scaledicon" aria-hidden="true" @click="getplay()">
                    <use xlink:href="#icon-bofang_o"></use>
                </svg>
                <svg v-else @click="getplay()" class="icon scaledicon" aria-hidden="true">
                    <use xlink:href="#icon-zanting_o"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click.prevent="goPlay(1)">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-24gl-playlistMusic3"></use>
                </svg>
            </div>
        </div>
        <!--@ 背景 -->
        <img :src="this.playSong[playSongIndex].al.picUrl" alt="" class="bgimg">
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import MusicLyric from "@/components/item/MusicLyric.vue";

export default {
    name: "MusicDetail",
    components: { MusicLyric },
    data() {
        return {
            isLyricShow: true,

        }
    },
    computed: {
        ...mapState(["playSong", "playSongIndex", "isbtnShow", 'lyricList', 'duration',]),
        // 绑定model设置读写属性
        currentTime: {
            get() {
                return this.$store.state.currentTime;
            },
            set(value) {
                this.$store.commit('updateCurrentTime', Number(value))
            }
        },
        modifycurrentTime() {

            return this.modfiyTime(this.currentTime)
        },
        modifyduration() {
            return this.modfiyTime(this.duration)
        },
    },


    methods: {
        ...mapMutations(['updatePlaySongIndex', 'updateCurrentTime']),
        getplay() {
            // 出发事件总线绑定的函数;
            this.$bus.$emit("play");

        },

        goPlay(num) {
            console.log(num);
            let index = this.playSongIndex + num;
            // 当处在第一首时切换到最后一首
            if (index < 0) {
                index = this.playSong.length - 1;
            } else if (index == this.playSong.length) {
                index = 0
            }
            this.updatePlaySongIndex(index);
            // 歌曲切换时也要更新歌曲总时间
            this.$bus.$emit('addDuration')

        },
        moveBy() {
            this.$bus.$emit('playPause')
            // 改变当前播放时间
            try {
                console.log("de", this.currentTime);
                this.$bus.$emit('audioplayTime', this.currentTime)
            } catch (error) {
                console.log(error);
            }

        },
        moveEnd() {
            this.$bus.$emit('played', this.$refs.range.value)
        },
        // 修改时间
        modfiyTime(time) {
            let min = parseInt(time / 60)
            let miao = parseInt(time % 60)
            // 小于10补0
            if (min < 10) {
                min = '0' + min
            } if (miao < 10) {
                miao = '0' + miao
            }
            if (isNaN(min) || isNaN(miao)) {
                min = '00'
                miao = '00'
            }
            return min + ':' + miao
        },
        download() {

        }
    },
    mounted() {
        this.$bus.$emit('addDuration')
    },
    updated() {
        this.$bus.$emit('updateTime')
    },
    beforeUpdate() {
        // this.$bus.$off('addDuration')
        this.$bus.$off('updateTime')


    },
};
</script>
<style lang="less" scoped>
.bgimg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(20px);
}

.detail {
    width: 100%;
    height: 100%;
    // height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    /* <!--@顶部样式*/
    .detailtop {
        display: flex;
        justify-content: space-around;
        padding: 0.2rem 0.2rem 0;
        width: 100%;
        height: 1.1rem;
        // position: fixed;
        z-index: 4;
        // backdrop-filter: brightness(0.5);
        background-color: rgb(175, 196, 215);


        .icon {
            width: 0.6rem;
            height: 0.6rem;
        }

        .detailtopleft {
            width: 65%;
            height: 100%;
            display: flex;
            // justify-content: space-around;
            // align-items: center;
            color: white;
            fill: white;

            .icon {
                width: 14%;
            }

            .content {
                height: 100%;
                width: 100%;
                margin-left: 0.2rem;

                .author {
                    font-size: 12px;
                    color: #999;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }
        }

        .detailtopright {
            display: flex;
            justify-content: end;
            width: 35%;
        }
    }

    /* <!--@中间样式*/
    .detailmiddle {
        width: 100%;
        height: 8.9rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        // position: relative;
        // top: 1.1rem;
        // margin-top: 1.1rem;

        .imgcontainer {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;

            .needle {
                width: 1.8rem;
                height: 3rem;
                position: absolute;
                left: 3.4rem;
                transform-origin: 0 0;
                transform: rotate(-30deg);
                transition: all 2s;
                z-index: 2;
            }

            .active {
                transform-origin: 0 0;
                transform: rotate(0deg);
            }



            .imgposition {
                width: 4.8rem;
                height: 4.8rem;
                position: relative;
                top: 2rem;

                .cipan {
                    position: absolute;
                    z-index: 1;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }

                .imgs {
                    width: 3rem;
                    height: 3rem;
                    position: absolute;
                    top: 45px;
                    left: 45px;
                    border-radius: 50%;
                    z-index: 0;
                    animation: rotateimg 10s linear infinite;
                }

                // 动画开始
                .rotaterun {
                    animation-play-state: running;
                }

                // 动画暂停
                .rotatepause {
                    animation-play-state: paused;
                }

                // 动画
                @keyframes rotateimg {
                    0% {
                        transform: rotate(0deg);
                    }

                    100% {
                        transform: rotate(360deg);
                    }
                }
            }



        }
    }

    /* <!--@底部样式*/
    .detailbottom {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        bottom: 0.2rem;

        .iconcontainer {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            height: 40px;


            .icon {
                width: 0.5rem;
                height: 0.5rem;
            }

            .scaledicon {
                width: 1rem;
                height: 1rem;
            }


        }

        input[type="range"] {
            width: 90%;
            height: 3px;
            margin: 0.7rem 0;
        }

        .progress-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 90%;
            font-size: 0.22rem;
        }
    }
}
</style>