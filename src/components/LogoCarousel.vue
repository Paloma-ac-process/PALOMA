<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const names = [
  'arkema.jpg',  'ascometal.png', 'cerfav.png',   'holimaker.png',
  'hydro.png',   'lafarge.svg',   'recytech.jpg', 'riotinto.png',
  'seqens.png',  'solvay.png',    'suez.png'
]

const logos = names.map(
  file => new URL(`../assets/logos/${file}`, import.meta.url).href
)
</script>

<template>
  <Swiper
    :slides-per-view="5"
    :loop="true"
    :autoplay="{ delay: 3000 }"
    navigation
    pagination
    :breakpoints="{
      0:   { slidesPerView: 2 },
      576: { slidesPerView: 3 },
      992: { slidesPerView: 5 }
    }"
    class="shadow rounded-4 p-4 bg-white"
  >
    <SwiperSlide
      v-for="src in logos"
      :key="src"
      class="d-flex align-items-center justify-content-center"
    >
      <img :src="src" alt="" style="max-width:160px;max-height:80px" />
    </SwiperSlide>
  </Swiper>
</template>
