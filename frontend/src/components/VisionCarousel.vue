<template>
    <div class="vision-section container d-flex flex-column flex-lg-row align-items-center py-8 gap-5">
      <!-- Carrousel -->
      <div class="vision-carousel w-100 w-lg-50">
        <Swiper
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
          <SwiperSlide v-for="(img, i) in images" :key="i">
            <img :src="img" class="vision-img" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/effect-coverflow'
  import 'swiper/css/navigation'
  
  import img1 from '../assets/vision/img1.png'
  import img2 from '../assets/vision/img2.png'
  import img3 from '../assets/vision/img3.png'
  import img4 from '../assets/vision/img4.png'
  import img5 from '../assets/vision/img5.png'
  import img6 from '../assets/vision/img6.png'
  import img7 from '../assets/vision/img7.png'
  
  const images = [img1, img2, img3, img4, img5, img6, img7]
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