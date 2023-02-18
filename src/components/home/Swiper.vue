<template>
    <div class="swiper">
        <van-swipe :autoplay="3000">
            <van-swipe-item
                v-for="(image, index) in images "
                :key="index"
            >
                <img v-lazy="image" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import { getSwiper } from "@/request/api/home.js";
export default {
    name: "Swiper",
    data() {
        return {
            images: [],
        };
    },
    methods: {
        async getBanner() {
            let res = await getSwiper();
            // console.log(res.data.banners);
            res.data.banners.map((item) => {
                this.images.push(item.pic);
            });
        },
    },
    mounted() {
        this.getBanner();

        // axios
        //     .get("http://localhost:3000/banner?type=2")
        //     .then((res) => {
        //         res.data.banners.map((item) => {
        //             this.images.push(item.pic);
        //         });
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });
    },
};
</script>

<style lang="less" scoped>
.swiper {
    .van-swipe {
        width: 100%;
        .van-swipe__track {
            .van-swipe-item {
                padding: 0.2rem 0.2rem 0rem 0.2rem;
                img {
                    width: 100%;
                    height: 3rem;
                    border-radius: 0.3rem;
                }
            }
        }
    }
}
</style>>
