<template>
    <div class="card h-100 d-flex flex-column align-items-center justify-content-center p-4 text-center">
      <i :class="icon" class="display-4 text-gradient text-primary mb-3" />
      <h6 class="mb-2">{{ title }}</h6>
      <p class="text-muted mb-0">{{ description }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    icon: { type: String, default: 'ni ni-diamond' },
    title: String,
    description: String
  })
  </script>
  