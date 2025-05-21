<script setup>
/*
* Vue Material Kit 2 — A&C Process
*/
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Navbar />

  <!-- contenu des vues -->
  <RouterView />

  <Footer />
</template>
