<template>
    <div class="card-body d-flex flex-column text-center p-4">
      <i :class="icon" class="display-4 text-gradient text-primary mb-3" />
      <h6 class="mb-2">{{ title }}</h6>
      <p class="text-muted mb-0">{{ description }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    icon: { type: String, default: 'ni ni-diamond' },
    title: { type: String, required: true },
    description: { type: String, required: true },
  })
  </script>
  