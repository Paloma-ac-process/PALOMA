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
            :src="equipmentHero"
            alt="Nos équipements"
            class="img-fluid rounded"
            loading="lazy"
          />
        </div>
        <h2 class="fw-bold mb-2 display-5">Nos équipements</h2>
        <p class="lead opacity-8 mb-0">
          Des outils & logiciels de pointe pour diagnostiquer, simuler et optimiser vos procédés.
        </p>
      </div>
    </header>
  
    <!-- GRID DES ÉQUIPEMENTS -->
    <section class="py-8 bg-light">
      <div class="container">
        <div class="row g-4">
          <div
            v-for="eq in eqs"
            :key="eq.title"
            class="col-12 col-md-6 col-lg-4 d-flex"
          >
            <DefaultInfoCard
              :icon="eq.icon"
              :title="eq.title"
              :description="eq.desc"
              class="h-100 about-card p-0 d-flex flex-column transition-scale"
            >
              <template #media>
                <div class="icon-circle mx-auto mb-3">
                  <i :class="eq.icon" aria-hidden="true" />
                </div>
              </template>
              <template #footer>
                <button class="btn btn-primary btn-sm mt-auto mx-auto" aria-label="En savoir plus sur {{ eq.title }}">
                  En savoir plus
                </button>
              </template>
            </DefaultInfoCard>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import DefaultInfoCard from '@/components/DefaultInfoCard.vue'
  import equipmentHero from '@/assets/home/equipment-hero.png'
  
  const eqs = [
    {
      icon: 'ni ni-sound-wave text-primary',
      title: "Centrale d'acquisition & thermocouples",
      desc: "Lecture / enregistrement en contact ou insertion dans l'épaisseur des matériaux."
    },
    {
      icon: 'ni ni-camera-compact text-primary',
      title: 'Caméras thermiques 1200 °C',
      desc: 'Cartographies thermiques internes & externes sans contact.'
    },
    {
      icon: 'ni ni-single-copy-04 text-primary',
      title: 'Analyseur élémentaire LIBS',
      desc: 'Spectrométrie sur site de la composition des matériaux.'
    },
    {
      icon: 'ni ni-compass-04 text-primary', 
      title: 'Laser Scanner 3D',
      desc: 'Cartographie 3D pour suivi des déformations et usures.'
    },
    {
      icon: 'ni ni-laptop text-primary',
      title: 'CAO / Design 2D-3D',
      desc: 'Conception de pièces et plans de montage sur mesure.'
    },
    {
      icon: 'ni ni-spaceship text-primary',
      title: 'Simulation thermomécanique',
      desc: 'Calculs éléments finis (QuickField™) 2D/3D : températures et contraintes.'
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
  
  /* Card tweaks */
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
  .about-card .card-body {
    padding: 1.5rem;
    flex-grow: 1;
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