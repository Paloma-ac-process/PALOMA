<script setup>
import { RouterLink } from "vue-router"
import logo from '@/assets/logo.svg'

const links = [
  { to: "/",            label: "Accueil" },
  { to: "/about",       label: "Qui sommes-nous" },
  { to: "/equipements", label: "Équipements" },
  { to: "/competences", label: "Compétences" },
  { to: "/services",    label: "Services" },
  { to: "/contact",     label: "Contact" },
]
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
    <div class="container">
      <!-- logo -->
      <RouterLink to="/" class="navbar-brand d-flex align-items-center">
        <img :src="logo" alt="A&C Process" height="34" />
      </RouterLink>

      <!-- burger -->
      <button
        class="navbar-toggler shadow-none border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- links -->
      <div id="navbarContent" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto text-uppercase fw-semibold">
          <li v-for="l in links" :key="l.to" class="nav-item px-2">
            <RouterLink class="nav-link" :to="l.to">{{ l.label }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
