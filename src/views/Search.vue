<template>
    <div class="search">
        <div class="top">
            <svg @click="$router.go(-1);" class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <input type="text" placeholder="陈奕迅" v-model="searchKey" @keydown.enter="enterKey" />
        </div>
        <div class="middle">
            <span>历史</span>
            <ul class="clearfix">
                <li v-for="(item, index) in keyWordList" :key="index" @click="searchHistory(item)">
                    {{ item }}
                </li>
            </ul>
            <div>
                <svg class="icon" aria-hidden="true" @click="delHistory">
                    <use xlink:href="#icon-shanchu"></use>
                </svg>
            </div>

        </div>
        <div class="bottom">
            <SongList :item-list="searchMusic" />
        </div>
        <div class="moresongs" v-if="isMoreSongText" @click="GetMoreMusic()">
            <div class="text">加载更多&lt&lt</div>
            <van-loading v-show="isLodingShow" type="spinner" size="24px" />
        </div>
    </div>
</template>

<script>
import { getSearchMusic, getMoreMusic } from '@/request/api/home.js';
import SongList from '@/components/item/SongList.vue';
export default {
    name: 'Search',
    components: {
        SongList
    },
    data() {
        return {
            keyWordList: [],
            searchKey: '',
            searchMusic: [],
            isMoreSongText: false,
            // 上拉Loding显示
            isLodingShow: false,
        }
    },
    methods: {
        enterKey() {
            // 不为空
            if (this.searchKey.trim()) {
                this.keyWordList.unshift(this.searchKey)
                // 数组去重
                this.keyWordList = [...new Set(this.keyWordList)]
                localStorage.setItem('keyWordList', JSON.stringify(this.keyWordList))
                // 调用请求函数
                this.GetSearchMusic()
                if (this.keyWordList.length - 1 >= 8) {
                    this.keyWordList.pop()
                }
            }
            this.searchKey = ''
        },
        delHistory() {
            this.keyWordList.pop()
        },
        // 请求搜索歌曲函数
        async GetSearchMusic() {
            let result = await getSearchMusic(this.searchKey)
            this.searchMusic = result.data.result.songs
            console.log(result.data.result);
            if (result) {
                this.isMoreSongText = true
                // this.GetMoreMusic(e)
            }
        },
        async searchHistory(e) {
            this.searchKey = e
            let result = await getSearchMusic(e)
            this.searchMusic = result.data.result.songs
            if (result) {
                this.isMoreSongText = true
                // this.GetMoreMusic(e)
            }


        },
        async GetMoreMusic() {
            let count = 1
            let result = await getMoreMusic(this.searchKey, count)
            console.log(result.data.result.songs);
            let moresongs = result.data.result.songs
            this.searchMusic.splice(30, 0, ...moresongs)
            if (count > 3) {
                count = 3
            }
            count = count + 1
            console.log(count);

        }
    },
    mounted() {
        this.keyWordList = JSON.parse(localStorage.getItem('keyWordList')) || []
    }

}
</script>
<style lang="less" scoped>
.clearfix::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.search {
    .top {
        display: flex;
        // justify-content: start;
        align-items: center;
        width: 100%;
        height: 1rem;
        padding: 0.2rem;

        .icon {
            width: 0.6rem;
            height: 0.6rem;
            // width: 20%;
        }

        input {
            width: 80%;
            margin-left: 0.4rem;
            border: none;
            border-bottom: .02rem solid #999;
            padding: 0.1rem;
        }
    }

    .middle {
        display: flex;
        justify-content: space-between;
        height: .6rem;
        width: 100%;
        margin-bottom: 1.4rem;

        span {
            display: block;
            font-size: large;
            padding: 0 .2rem;
            text-align: center;
            line-height: 0.6rem;
            width: 66px;

        }

        ul {
            width: 100%;


            li {
                min-width: 1.1rem;
                height: 30px;
                border-radius: 30px;
                background-color: #da2424;
                color: #fff;
                font-size: 0.27rem;
                padding: 0.1rem;
                margin-right: .1rem;
                display: flex;
                text-align: center;
                justify-content: center;
                align-items: center;
                float: left;
                margin-bottom: .1rem;
            }
        }
    }

    .moresongs {
        margin: .1rem 0;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
}
</style>