<template>
    <div class="musicitemtop">
        <!--@ 背景 -->
        <img :src="this.creator.backgroundUrl" alt="" class="bgimg">
        <!-- @上方图标 -->
        <div class="itemtop">
            <div class="itemtopleft">
                <svg @click="$router.go(-1);" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <span> 歌单</span>
            </div>
            <div class="itemtopright">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao2"></use>
                </svg>
            </div>
        </div>

        <!-- @中间部分 -->
        <div class="itemmiddle">
            <div class="itemmiddleleft">
                <img :src="this.playlist.coverImgUrl" alt="">
                <div class="playcount">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-play"></use>
                    </svg>
                    <span>
                        {{ changeCount(playlist.playCount) }}
                    </span>
                </div>
            </div>
            <div class="itemmiddleright">
                <div class="title">
                    {{ playlist.name }}
                </div>
                <div class="author">
                    <img :src="creator.avatarUrl" alt="">
                    <span>{{ creator.nickname }}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-arrow-right"></use>
                    </svg>
                </div>
                <div class="description">
                    {{ playlist.description }}
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-arrow-right"></use>
                    </svg>
                </div>
            </div>
        </div>
        <!-- @图标部分 -->
        <div class="itemicon">
            <div class="itemiconitem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiaoxi"></use>
                </svg>
                <span>40</span>
            </div>
            <div class="itemiconitem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <span>50</span>
            </div>
            <div class="itemiconitem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <span>下载</span>
            </div>
            <div class="itemiconitem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-duoxuanxuanzhong-copy"></use>
                </svg>
                <span>多选</span>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "MusicItemTop",
    props: ["playlist", 'creator'],
    data() {
        return {};
    },
    mounted() { },
    methods: {
        changeCount(num) {
            if (num > 100000000) {
                return (num / 100000000).toFixed(1) + "亿";
            } else if (num > 10000) {
                return (num / 10000).toFixed(1) + "万";
            }
        },
    },
};
</script>

<style lang="less" scoped>
.musicitemtop {
    .bgimg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 6rem;
        z-index: -1;
        filter: blur(20px);
    }

    .itemtop {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.2rem 0.2rem;
        position: fixed;
        z-index: 3;
        // backdrop-filter: brightness(0.5);
        background-color: rgb(175, 196, 215);

        border-bottom: 1px solid #999;
        width: 100%;
        height: 1rem;

        .icon {
            width: 0.5rem;
            height: 0.5rem;
            fill: #fff;
        }

        .itemtopleft {
            span {
                margin-left: 0.4rem;
                // font-weight: 600;
                font-size: 0.5rem;
                color: #fff;
            }
        }

        .itemtopright {
            .icon {
                margin-left: 0.4rem;
            }
        }
    }

    .itemmiddle {
        padding: 1.16rem 0.1rem 0.3rem 0.1rem;
        display: flex;
        width: 100%;

        // height: auto;
        .itemmiddleleft {
            width: 35%;
            height: 100%;
            position: relative;

            img {
                width: 100%;
                height: 100%;
                display: block;
                border-radius: 0.2rem;
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

        .itemmiddleright {
            width: 65%;
            padding: 0 0.2rem;
            color: rgb(200, 196, 196);

            .title {
                color: #fff;
                display: -webkit-box;
                overflow: hidden;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .author {
                width: 100%;
                height: 0.5rem;
                margin: 0.1rem 0;
                display: flex;
                vertical-align: bottom;

                img {
                    width: 0.5rem;
                    height: 0.5rem;
                    display: block;
                    border-radius: 50%;
                }

                span {
                    margin: 0 0.1rem;
                }
            }

            .description {
                font-size: 0.26rem;
                display: -webkit-box;
                overflow: hidden;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;

                .icon {
                    width: 0.26rem;
                    height: 0.26rem;
                }
            }
        }
    }

    .itemicon {
        display: flex;
        justify-content: space-around;
        color: #fff;

        .itemiconitem {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .icon {
                width: 0.5rem;
                height: 0.5rem;
            }
        }
    }
}
</style>>
