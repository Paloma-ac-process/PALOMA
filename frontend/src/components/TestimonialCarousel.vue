<template>
    <div class="testimonial-carousel">
      <h2 class="text-center fw-bold text-primary mb-3">Ils témoignent</h2>
      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        navigation
        pagination
        autoplay
        loop
        class="testimonial-swiper"
      >
        <SwiperSlide v-for="(t, i) in testimonials" :key="i" class="text-center p-4">
          <p class="fs-4 fst-italic">"{{ t.text }}"</p>
          <img :src="t.logo" alt="logo" class="logo mb-3" />
          <h5 class="fw-bold">{{ t.name }}</h5>
          <p class="text-muted">{{ t.role }}</p>
        </SwiperSlide>
      </Swiper>
    </div>
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Navigation, Pagination, Autoplay } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/navigation'
  import 'swiper/css/pagination'
  
  import junger from '../assets/testimonials/junger.jpg'
  import riotinto from '../assets/testimonials/riotinto.png'
  import hydro from '../assets/testimonials/hydro.png'
  
  const testimonials = [
    {
      text: "Pleinement satisfait de la qualité de l'intervention d'A&C Process, notamment en ce qui concerne la démarche d'analyse des dégradations et de leur origine...",
      name: "Christophe Boudéreaux",
      role: "Directeur Général - Junger & Gräter",
      logo: junger
    },
    {
      text: "Nous avons apprécié l'expertise et la réactivité de A&C Process pour nous soutenir dans nos développements technologiques.",
      name: "Arnaud Bourgier",
      role: "Manager Produit - Rio Tinto Aluminium",
      logo: riotinto
    },
    {
      text: "Très satisfaits du partenariat avec A&C Process. Leur grande expérience et capacités de simulation ont permis de progresser...",
      name: "Ludovic Dardinier",
      role: "Directeur Général - Hydro Aluminium Clervaux",
      logo: hydro
    }
  ]
  </script>
  
  <style scoped>
  .testimonial-carousel {
    background: #f8f9fa;
    padding: 4rem 1rem;
    border-radius: 2rem;
  }
  .logo {
    height: 64px;
    object-fit: contain;
    margin: 0 auto;
  }
  .testimonial-swiper {
    max-width: 800px;
    margin: 0 auto;
  }
  </style>  