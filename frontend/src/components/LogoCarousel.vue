<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Logos principaux
import arkema from '../assets/logos/arkema.jpg'
import ascometal from '../assets/logos/ascometal.png'
import cerfav from '../assets/logos/cerfav.png'
import holimaker from '../assets/logos/holimaker.png'
import hydro from '../assets/logos/hydro.png'
import lafarge from '../assets/logos/lafarge.svg'
import recytech from '../assets/logos/recytech.jpg'
import riotinto from '../assets/logos/riotinto.png'
import seqens from '../assets/logos/seqens.png'
import solvay from '../assets/logos/solvay.png'
import suez from '../assets/logos/suez.png'

// Testimonials
import hydroTest from '../assets/testimonials/hydro.png'
import junger from '../assets/testimonials/junger.jpg'
import riotintoTest from '../assets/testimonials/riotinto.png'

// Vision
import img1 from '../assets/vision/img1.png'
import img2 from '../assets/vision/img2.png'
import img3 from '../assets/vision/img3.png'
import img4 from '../assets/vision/img4.png'
import img5 from '../assets/vision/img5.png'
import img6 from '../assets/vision/img6.png'
import img7 from '../assets/vision/img7.png'

const logos = [
  arkema, ascometal, cerfav, holimaker, hydro, lafarge, recytech, riotinto, seqens, solvay, suez,
  hydroTest, junger, riotintoTest,
  img1, img2, img3, img4, img5, img6, img7
]

console.log('Logos chargés dans le carrousel :', logos)
</script>

<template>
  <div class="logo-swiper p-4 rounded-4 bg-white shadow">
    <Swiper
      :modules="[Navigation, Pagination, Autoplay]"
      :slides-per-view="5"
      :space-between="40"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      navigation
      pagination
      :breakpoints="{
        0: { slidesPerView: 2, spaceBetween: 20 },
        576: { slidesPerView: 3, spaceBetween: 30 },
        992: { slidesPerView: 5, spaceBetween: 40 }
      }"
    >
      <SwiperSlide
        v-for="src in logos"
        :key="src"
        class="d-flex align-items-center justify-content-center"
      >
        <img :src="src" class="img-fluid" style="max-height:80px; max-width:160px" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.logo-swiper :deep(.swiper-button-next),
.logo-swiper :deep(.swiper-button-prev) {
  color: var(--bs-primary);
  width: 32px;
  height: 32px;
  z-index: 10;
}

.logo-swiper :deep(.swiper-pagination-bullet-active) {
  background: var(--bs-primary);
}
</style>
