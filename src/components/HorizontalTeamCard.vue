<template>
    <div class="card horizontal-team-card h-100 border-0 shadow-sm">
      <!-- Image à gauche -->
      <div class="row g-0 h-100 align-items-center">
        <div class="col-auto">
          <img
            :src="img"
            :alt="name"
            class="team-img rounded-start"
          />
        </div>
        <div class="col p-4 d-flex flex-column justify-content-center">
          <h5 class="mb-1">{{ name }}</h5>
          <p class="text-muted mb-3">{{ position }}</p>
          <!-- slot actions (icônes mail / linkedin) -->
          <div class="mt-auto">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    img:      { type: String, required: true },
    name:     { type: String, required: true },
    position: { type: String, required: true }
  })
  </script>
  
  <style scoped>
  .horizontal-team-card {
    border-radius: 1rem;
    overflow: hidden;
  }
  
  .team-img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    display: block;
  }
  </style>
  