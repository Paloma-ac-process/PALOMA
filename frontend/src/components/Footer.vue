<template>
    <footer class="footer py-5 bg-gradient-dark text-white">
      <div class="container">
        <div class="row">
  
          <!-- logo + tagline -->
          <div class="col-lg-4 mb-4 mb-lg-0">
            <router-link to="/" class="d-inline-flex align-items-center mb-2">
              <img :src="logo" alt="A&C Process" height="34" />
            </router-link>
            <p class="text-sm opacity-8 pe-lg-5">
              Ingénierie&nbsp;&amp;&nbsp;équipements process depuis&nbsp;1995.
            </p>
          </div>
  
          <!-- navigation -->
          <div class="col-6 col-lg-2 mb-4" v-for="(group, i) in nav" :key="i">
            <h6 class="text-uppercase text-xs fw-bold mb-3">{{ group.title }}</h6>
            <ul class="nav flex-column">
              <li v-for="link in group.links" :key="link.to" class="nav-item mb-2">
                <router-link
                  :to="link.to"
                  class="nav-link p-0 text-sm text-white opacity-8"
                >
                  {{ link.label }}
                </router-link>
              </li>
            </ul>
          </div>
  
          <!-- réseaux sociaux -->
          <div class="col-lg-4 text-lg-end" v-if="socials.length">
            <h6 class="text-uppercase text-xs fw-bold mb-3">Suivez-nous</h6>
            <a
              v-for="s in socials"
              :key="s.icon"
              :href="s.url"
              target="_blank"
              rel="noopener"
              class="btn btn-icon-only btn-outline-light btn-sm rounded-circle me-2"
            >
              <i :class="s.icon"></i>
            </a>
          </div>
        </div>
  
        <hr class="border-white opacity-3 mt-5" />
  
        <div class="row">
            <div class="col-12 text-center">
                <p class="text-sm mb-0 opacity-8">
                © {{ year }} — A&C&nbsp;Process. Tous droits réservés.
                </p>
                <router-link
                to="/mentions-legales"
                class="text-sm mt-2 d-block text-white opacity-8 text-decoration-underline"
                >
                Mentions légales
                </router-link>
            </div>
            </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  /* 1. On importe vraiment le fichier logo, ce qui lève toute ambiguïté. */
  import logo from '@/assets/logo.png'
  
  /* 2. Données du footer */
  const year = new Date().getFullYear()
  
  const nav = [
    {
      title: 'Société',
      links: [
        { to: '/about',       label: 'À propos' },
        { to: '/equipements', label: 'Équipements' },
        { to: '/services',    label: 'Services' },
      ],
    },
    {
      title: 'Ressources',
      links: [
        { to: '/competences', label: 'Compétences' },
        { to: '/contact',     label: 'Contact' },
      ],
    },
  ]
  
  const socials = [
    { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/company/ac-process' },
    { icon: 'fab fa-twitter',     url: 'https://twitter.com/ac_process' },
  ]
  </script>
  
  <style scoped>
  .footer a:hover {
    opacity: 1 !important;
  }
  </style>
  