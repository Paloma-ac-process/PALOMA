<template>
  <div class="card shadow-sm h-100">
    <div class="card-body text-center">
      <!-- icône bleu primaire -->
      <i :class="[icon, 'text-primary', 'display-4', 'mb-3']"></i>

      <h5 class="fw-bold mb-2">{{ title }}</h5>
      <p class="text-muted mb-0">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon:        { type: String, default: 'ni ni-diamond' },
  title:       { type: String, required: true },
  description: { type: String, required: true },
})
</script>