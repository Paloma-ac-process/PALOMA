<template>
    <!-- HERO -->
    <header class="page-header section-height-60 bg-gradient-dark position-relative overflow-hidden">
      <svg class="wave-bottom" viewBox="0 0 1920 100" preserveAspectRatio="none">
        <path d="M0,100 L1920,0 L1920,100 Z" fill="#f8f9fa" />
      </svg>
      <div class="container text-center text-white d-flex flex-column align-items-center justify-content-center h-100 position-relative">
        <!-- Image Hero -->
        <div class="hero-image-wrapper mb-4">
          <img
            :src="servicesHero"
            alt="Nos services"
            class="img-fluid rounded"
            loading="lazy"
          />
        </div>
        <h2 class="fw-bold mb-2 display-5">Nos services</h2>
        <p class="lead opacity-8 mb-0">
          Des solutions personnalisées pour valoriser vos procédés et projets.
        </p>
      </div>
    </header>
  
    <!-- GRID DES SERVICES -->
    <section class="py-8 bg-light">
      <div class="container">
        <div class="row g-4">
          <div
            v-for="service in services"
            :key="service.title"
            class="col-12 col-md-6 col-lg-4 d-flex"
          >
            <div class="about-card p-4 d-flex flex-column text-center transition-scale w-100">
              <div class="icon-circle mx-auto mb-3">
                <i :class="service.icon" aria-hidden="true" />
              </div>
              <h5 class="fw-bold mb-2">{{ service.title }}</h5>
              <p class="text-muted mb-3">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import servicesHero from '@/assets/home/services-hero.png'
  
  type Service = {
    icon: string
    title: string
    description: string
  }
  
  const services: Service[] = [
    {
      icon: 'ni ni-compass-04 text-primary',
      title: 'Expertise & Défectologie',
      description: 'Diagnostic multi-échelles et analyses de dégradation.'
    },
    {
      icon: 'ni ni-ruler-pencil text-primary',
      title: 'Ingénierie & Conception',
      description: 'Optimisation matériaux & design par simulation.'
    },
    {
      icon: 'ni ni-briefcase-24 text-primary',
      title: 'Gestion de projet & Assistance technique',
      description: "De l'appel d'offre au suivi de mise en œuvre."
    }
  ]
  </script>
  
  <style scoped>
  .page-header {
    background-image: linear-gradient(135deg, #1f2a3c, #121924);
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  }
  .wave-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 1;
  }
  .section-height-60 {
    min-height: 60vh;
  }
  .hero-image-wrapper {
    max-width: 300px;
    overflow: hidden;
    border-radius: 0.5rem;
    box-shadow: 0 .3rem .6rem rgba(0,0,0,0.2);
  }
  
  /* Card styles */
  .about-card {
    border-radius: 1rem;
    overflow: hidden;
    border: none;
    box-shadow: 0 .5rem 1.2rem rgba(0, 0, 0, .1);
    background: #fff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .about-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 .7rem 1.8rem rgba(0, 0, 0, .15);
  }
  .icon-circle {
    width: 80px;
    height: 80px;
    background: #e9ecef;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }
  .icon-circle i {
    line-height: 1;
  }
  .transition-scale {
    transition: transform 0.2s ease;
  }
  .transition-scale:hover {
    transform: scale(1.02);
  }
  .btn {
    border-radius: 2rem;
    padding: 0.5rem 1.2rem;
  }
  </style>
  