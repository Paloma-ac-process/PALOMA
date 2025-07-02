<template>
    <div class="card h-100 d-flex flex-column justify-content-center text-center p-4">
      <h6 class="mb-3">{{ title }}</h6>
      <p class="text-muted mb-4">{{ description }}</p>
      <RouterLink
        v-if="to"
        :to="to"
        class="btn btn-outline-primary btn-sm align-self-center"
      >
        En savoir plus
      </RouterLink>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    description: String,
    to: String
  })
  </script>
  