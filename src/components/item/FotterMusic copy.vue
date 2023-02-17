<template>
    <div class="fottermusic">

        <div class="left" @click="goDetail">
            <!-- @click="showDetailPage()" -->
            <img :src="playSong[playSongIndex].al.picUrl" alt="">
            <div class="content">
                <p>{{ playSong[playSongIndex].name }}</p>
                <span>横划切换上下首</span>
            </div>

        </div>
        <div class="right">
            <svg v-if="isbtnShow" class="icon" aria-hidden="true" @click="play">
                <use xlink:href="#icon-bofang_o"></use>
            </svg>
            <svg v-else class="icon iconwidth" aria-hidden="true" @click="play">
                <use xlink:href="#icon-zanting_o"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-playlistMusic3"></use>
            </svg>
            <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playSong[playSongIndex].id}.mp3`">
            </audio>
        </div>

    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
    name: "FooterMusic",
    data() {
        return {
            timer: null,
        }
    },
    computed: {
        //<!--@ 解构vuex数据
        ...mapState([
            "playSong",
            "playSongIndex",
            "isbtnShow",
            "musicDetailShow",
            'currentTime',
            'duration'
        ]),
    },
    methods: {
        ...mapMutations(["changeBtnShow", "updateMusicDetailShow", "updateCurrentTime", 'updateDuration', 'updatePlaySongIndex']),
        play() {
            console.log("play1");
            // 如果播放是暂停就让其播放
            // 判断其暂停属性是否为true
            if (this.$refs.audio.paused) {
                // 调用播放函数
                this.$refs.audio.play();
                this.changeBtnShow(false);
                // 调用更新事件函数并传值给vuex updateCurrentTime函数
                this.updateTime();
            }
            else {
                // 调用暂停函数
                this.$refs.audio.pause();
                this.changeBtnShow(true);
                // 暂停时清除定时器
                clearInterval(this.timer)
                this.timer = null
            }

        },
        // 给进度条提供的拖动暂停和播放
        playPause() {
            this.$refs.audio.pause();
            clearInterval(this.timer)
            this.timer = null
            this.changeBtnShow(true);
        },
        played() {
            this.$refs.audio.play();
            this.changeBtnShow(false);

            // console.log(this.$refs.audio.seekable.start(0))
            // console.log(this.$refs.audio.seekable.end(0))
            // this.$refs.audio.fastSeek(this.currentTime)
            this.updateTime();
        },
        // 展示详情页
        showDetailPage() {
            this.updateMusicDetailShow();
        },
        //  跳转详情页
        goDetail() {
            this.$router.push("/musicdetail").catch((err) => console.log(err));
        },
        // 更新当前时间
        updateTime() {
            if (this.timer === null) {
                this.timer = setInterval(() => {
                    this.updateCurrentTime(this.$refs.audio.currentTime)
                }, 1000);
            }

        },
        addDuration() {
            this.updateDuration(this.$refs.audio.duration)
        },
    },
    mounted() {
        this.$bus.$on("play", this.play);
        this.$bus.$on("playPause", this.playPause);
        this.$bus.$on("played", this.played);

        this.$bus.$on("updateTime", this.updateTime);
        this.$bus.$on("addDuration", this.addDuration);
        this.addDuration()

        // 获取歌词
        this.$store.dispatch('GetMusicLyric', this.playSong[this.playSongIndex].id)

    },
    beforeDestroy() {
        this.$bus.$off("play");
        this.$bus.$off("playPause");
        this.$bus.$off("played");
        this.$bus.$off("updateTime");
        this.$bus.$off("addDuration");

    },
    updated() {
        // 获取歌词
        this.$store.dispatch('GetMusicLyric', this.playSong[this.playSongIndex].id)
        // 获取歌曲总时长
        this.addDuration()
    },

    watch: {
        playSongIndex() {
            // 下标发生改变 自动播放
            this.$refs.audio.autoplay = true;
            if (this.$refs.audio.paused) {
                clearInterval(this.timer)
                this.timer = null
                //如果是暂停就更改图标
                this.changeBtnShow(false);
            }
        },
        playSong() {
            this.$refs.audio.autoplay = true;
            clearInterval(this.timer)
            this.timer = null
            this.changeBtnShow(false);
        },
        currentTime(newValue) {
            if (newValue === this.duration) {
                // this.play()
                console.log("auto play music");
                if (this.playSong[this.playSongIndex] == this.playSong.length - 1) {
                    this.updatePlaySongIndex(0)
                } else {
                    this.updatePlaySongIndex(this.playSongIndex + 1)
                }
            }
        }

    },
};
</script>
<style lang="less" scoped>
.fottermusic {
    width: 100%;
    height: 1.4rem;
    background: #fff;
    border-top: 1px solid #999;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
        width: 65%;
        display: flex;
        margin-left: 0.2rem;

        img {
            width: 1rem;
            height: 100%;
            border-radius: 50%;
            // margin: 0.1rem;
        }

        .content {
            margin-left: 0.2rem;

            font-size: 0.32rem;

            span {
                color: #999;
                font-size: 0.26rem;
                display: block;
                margin-top: 10px;
            }
        }
    }

    .right {
        width: 35%;
        text-align: right;

        .icon {
            width: 0.6rem;
            height: 0.6rem;
            margin: 0 0.2rem;
        }
    }
}
</style>>