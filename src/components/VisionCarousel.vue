<template>
    <div class="vision-section container d-flex flex-column flex-lg-row align-items-center py-8 gap-5">
      <!-- Carrousel -->
      <div class="vision-carousel w-100 w-lg-50">
        <swiper
          :modules="[Autoplay, EffectCoverflow, Navigation]"
          effect="coverflow"
          :grabCursor="true"
          :centeredSlides="true"
          :slidesPerView="1.5"
          :coverflowEffect="{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          }"
          navigation
          loop
          :autoplay="{ delay: 3000 }"
          class="swiper-vision"
        >
          <swiper-slide v-for="(img, i) in images" :key="i">
            <img :src="img" class="vision-img" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/effect-coverflow'
  import 'swiper/css/navigation'
  
  const images = [
    new URL('@/assets/vision/img1.png', import.meta.url).href,
    new URL('@/assets/vision/img2.png', import.meta.url).href,
    new URL('@/assets/vision/img3.png', import.meta.url).href,
    new URL('@/assets/vision/img4.png', import.meta.url).href,
    new URL('@/assets/vision/img5.png', import.meta.url).href,
    new URL('@/assets/vision/img6.png', import.meta.url).href,
    new URL('@/assets/vision/img7.png', import.meta.url).href
  ]
  </script>
  
  <style scoped>
  .vision-carousel {
    width: 100%;
    max-width: 600px;
  }
  .swiper-vision {
    width: 100%;
    height: 400px;
  }
  .vision-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }
  </style>  