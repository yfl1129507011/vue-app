<template>
    <div class="swiper-container" id="carouselSwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in carouselList" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'

export default {
    name: "Carousel",
    props: ["carouselList"],
    watch: {
        carouselList: {
            immediate: true, // 立即监听一次（不管数据有没有变化）
            handler(newVal, oldVal) {
                this.$nextTick(()=>{
                    new Swiper('#carouselSwiper', {
                        loop: true, // 循环模式选项
    
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
    
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }
                    })
                })
            }
        }
    }
}
</script>

<style>
</style>