<script setup>
import contactHero from '@/assets/home/contact-hero.png'
</script>

<template>
    <!-- HERO -->
    <header class="page-header section-height-60 bg-gradient-dark position-relative overflow-hidden">
      <svg class="wave-bottom" viewBox="0 0 1920 100" preserveAspectRatio="none">
        <path d="M0,100 L1920,0 L1920,100 Z" fill="#f8f9fa" />
      </svg>
      <div class="container text-center text-white d-flex flex-column align-items-center justify-content-center h-100 position-relative">
        <div class="hero-image-wrapper mb-4">
          <img
            :src="contactHero"
            alt="Contact"
            class="img-fluid rounded"
            loading="lazy"
          />
        </div>
        <h2 class="fw-bold mb-2 display-5">Contact</h2>
        <p class="lead opacity-8 mb-0">
            Prêts à démarrer une nouvelle aventure ? Contactez nous, Nous serons ravis de répondre à vos questions !
        </p>
      </div>
    </header>
  
<!-- SECTION CONTACT -->
<section class="d-flex align-items-center justify-content-center py-8 bg-light" style="min-height: 80vh;">
  <div class="container">
    <div class="row justify-content-center">
      <!-- Infos de contact -->
      <div class="col-md-6 col-lg-5">
        <div class="about-card p-4 text-start d-flex flex-column align-items-start justify-content-center">
          <h5 class="fw-bold mb-3 text-center w-100">A&C Process</h5>

          <p class="mb-2 w-100">
            <i class="ni ni-circle-08 text-primary me-2"></i>
            <strong>Contact :</strong> Alexandre Perrot, Directeur Général
          </p>

          <p class="mb-2 w-100">
            <i class="ni ni-email-83 text-primary me-2"></i>
            <strong>Email :</strong>
            <a href="mailto:alexandre.perrot@ac-process.com" class="text-decoration-none text-dark">
              alexandre.perrot@ac-process.com
            </a>
          </p>

          <p class="mb-2 w-100">
            <i class="ni ni-mobile-button text-primary me-2"></i>
            <strong>Téléphone :</strong>
            <a href="tel:+33624489589" class="text-decoration-none text-dark">+33 (6) 24 48 95 89</a>
          </p>

          <p class="mb-2 w-100">
            <i class="ni ni-watch-time text-primary me-2"></i>
            <strong>Horaires :</strong> Lun–Ven : 9h - 17h
          </p>

          <p class="mb-0 w-100">
            <i class="ni ni-world text-primary me-2"></i>
            <strong>LinkedIn :</strong>
            <a
              href="https://www.linkedin.com/company/ac-process"
              target="_blank"
              rel="noopener noreferrer"
              class="text-decoration-none text-dark"
            >
              Voir la page entreprise
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
  
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
  
  /* Card styling */
  .about-card {
    border-radius: 1rem;
    background: #fff;
    box-shadow: 0 .5rem 1.2rem rgba(0, 0, 0, .05);
    border: none;
  }
  </style>
  