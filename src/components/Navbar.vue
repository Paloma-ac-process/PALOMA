<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo.png' 

const links = [
  { to: '/',            label: 'Accueil' },
  { to: '/about',       label: 'Qui sommes-nous' },
  { to: '/equipements', label: 'Équipements' },
  { to: '/competences', label: 'Compétences' },
  { to: '/services',    label: 'Services' },
  { to: '/contact',     label: 'Contact' },
  { to: '/paloma-apps', label: 'Applications PALOMA' }
]
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
    <div class="container">
      <!-- on bind src via :src -->
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <img :src="logo" alt="A&C Process" height="34" />
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarContent" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-uppercase fw-semibold">
          <li v-for="link in links" :key="link.to" class="nav-item px-2">
            <router-link :to="link.to" class="nav-link">{{ link.label }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
