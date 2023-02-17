import Vue from 'vue'
import Vuex from 'vuex'
import { getMusicLyric, getLogin } from '@/request/api/home.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 播放歌曲列表
    playSong: [{
      al: {
        id: 91237927,
        name: "罗生门（Follow）",
        pic: 109951165076380460,
        picUrl: "https://p1.music.126.net/yN1ke1xYMJ718FiHaDWtYQ==/109951165076380471.jpg",
      },
      // 作者
      ar: [
        {
          id: 33259235,
          name: "梨冻紧",
        },
        {
          id: 13112601,
          name: "Wiz_H张子豪"
        }
      ],
      // 歌曲id name
      id: 1456890009,
      name: "罗生门（Follow）",

    }],
    // 默认播放下标
    playSongIndex: 0,
    // 播放按钮显示
    isbtnShow: true,
    // 歌曲详情展示
    musicDetailShow: false,
    // 歌词列表
    lyricList: {},

    // 当前音乐播放时间
    currentTime: 0,
    // 歌曲总时长
    duration: 0,
    // 判断是否登录
    isLogin: false,
    // 判断底部组件是否显示
    isFotterShow: true,
  },
  getters: {
    changeCurrentTime(state) {
      return function (num) {
        // console.log("num" + num);
        state.currentTime = num;
        // console.log( "  state.currentTime", state.currentTime)
      }

    }
  },
  mutations: {
    // 改变按钮显示
    changeBtnShow: function (state, value) {
      state.isbtnShow = value
    },
    updatePlaySong(state, value) {
      state.playSong = value;
      // console.log(state);
    },
    updatePlaySongIndex(state, value) {
      state.playSongIndex = value
    },
    updateMusicDetailShow(state) {
      state.musicDetailShow = !state.musicDetailShow
    },
    updataMusicLyric(state, value) {
      state.lyricList = value;
    },
    updateFooterShow(state, value) {
      state.isfooterShow = value;
    },
    updateCurrentTime(state, value) {
      // console.log(state.currentTime, 'aaa' + value);
      state.currentTime = value;
    },
    updateDuration(state, value) {
      state.duration = value;
    }
  },
  actions: {
    // 获取歌词数据
    async GetMusicLyric(context, value) {
      let result = await getMusicLyric(value)
      // console.log('lyric:', result.data.lrc);
      // 获取歌词提交给mutations 中的函数修改state的值
      context.commit('updataMusicLyric', result.data.lrc)
    },
    // 获取登录验证码
    async GetPhoneLogin(context, value) {
      let result = await getLogin(value)
      console.log("@@", result);
      return result

    }

  },
  modules: {
  }
})
