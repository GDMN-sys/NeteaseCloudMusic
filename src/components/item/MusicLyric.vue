<template>
    <div class="musiclyric">
        <slot name="noLyric" v-if="item"></slot>
        <slot name="Lyric">
            <div class="textcontainer" ref="musiclyric">
                <p v-for="(item, index) in lyric" :key="index"
                    :class="{ active: (currentTime * 1000 >= item.time && currentTime * 1000 < item.next) }">
                    <!-- 当歌曲时间大于等于或者小于歌词时间  就给他添加样式显示 -->
                    {{ item.lrc }}
                </p>
            </div>
        </slot>

    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: "MusicLyric",
    data() {
        return {

        };
    },
    computed: {
        ...mapState(['lyricList', 'currentTime', 'playSong', 'duration', 'playSongIndex']),
        lyric() {
            let arr = []
            if (this.lyricList.lyric != '') {
                // split分割歌词使其变成一个数组 每行对应时间和歌词
                arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    // splice包头不包尾
                    let min = item.slice(1, 3);
                    let sec = item.slice(4, 6);
                    let mill = item.slice(7, 10);
                    let lrc = item.slice(11, item.length);
                    if (isNaN(Number(mill))) {
                        mill = item.slice(7, 9);
                        lrc = item.slice(10, item.length);
                    }
                    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)

                    // console.log(min, sec, mill, lrc);
                    return { min, sec, mill, lrc, time }
                })
                // 过滤掉歌词为空的
                arr = arr.filter((item) => item.lrc != '')
                // <!--@遍历数组获取下一句歌词时间并添加属性
                arr.forEach((item, index) => {
                    // 如果下标为最后一项  //并且下一项不是NaN
                    if (index == arr.length - 1 || isNaN(arr[index + 1].time)) {
                        // 给每一项都添加一个属性next 且是最后一项时赋值为 数值大最后一项有样式
                        item.next = 1000000;
                    } else {
                        // 不是最后一项就把下一句歌词的事件赋值给next
                        item.next = arr[index + 1].time
                    }
                });
            }
            console.log(arr);
            return arr
        },
    },
    props: ['goPlay'],
    mounted() {
        this.$bus.$emit('addDuration')

    },
    updated() {

    },
    watch: {
        currentTime(newValue) {
            let p = document.querySelector('p.active')
            // console.log([p][0].offsetTop);
            if (p && p.offsetTop > 180) {
                this.$refs.musiclyric.scrollTop = p.offsetTop - 180
            }

            console.log(this.duration);
            // console.log(newValue);
            if (newValue == this.duration) {
                this.goPlay(1)
                this.$bus.$emit('play')
            }
        }
    }
}
</script>
<style lang="less" scoped>
.musiclyric {
    width: 100%;
    height: 7.9rem;
    margin: 27px 0 0 0;

    .textcontainer {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        scroll-snap-type: y mandatory;
        position: relative;
        scroll-behavior: smooth;


        p {
            text-align: center;
            color: #f1f1f1;
            height: .6rem;
            line-height: .6rem;
            scroll-snap-align: start;
            scroll-snap-stop: always;
        }

        .active {
            color: red;
            font-size: 0.4rem;
            word-break: keep-all;

        }
    }

    .textcontainer::-webkit-scrollbar {
        width: 0;
    }
}
</style>