<template>
    <div class="home">
        <TopNav />
        <Swiper />
        <IconList />
        <MusicList />
    </div>
</template>

<script>
import TopNav from "@/components/home/TopNav";
import Swiper from "@/components/home/Swiper";
import IconList from "@/components/home/IconList";
import MusicList from "@/components/home/MusicList";
export default {
    name: "Home",
    components: { TopNav, Swiper, IconList, MusicList },
};
</script>
