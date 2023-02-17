<template>
    <div>
        <audio ref="audioPlayer" @timeupdate="updateCurrentTime"
            :src="`https://music.163.com/song/media/outer/url?id=${playSong[playSongIndex].id}.mp3`"></audio>
        <input type="range" :max="duration" v-model="currentTime" @input="seek">
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState([
            "playSong",
            "playSongIndex",
            'duration'

        ]),
        currentTime: {
            get() {
                return this.$store.state.currentTime;
            },
            set(value) {
                this.$store.commit('updateCurrentTime', Number(value))
            }
        },
    },
    methods: {
        updateCurrentTime() {
            this.$store.commit('updateCurrentTime', this.$refs.audioPlayer.currentTime);
        },
        seek() {
            this.$refs.audioPlayer.currentTime = this.currentTime;
        }
    }
};
</script>