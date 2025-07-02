<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const logoModules = import.meta.glob('@/assets/logos/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default'
})
const logos = Object.values(logoModules)
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
