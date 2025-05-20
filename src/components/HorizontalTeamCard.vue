<template>
    <div class="card card-profile overflow-hidden shadow-lg">
      <div class="row g-0">
        <!-- photo -->
        <div class="col-5">
          <img :src="img" class="w-100 h-100 object-fit-cover" />
        </div>
  
        <!-- texte -->
        <div
          class="col-7 d-flex flex-column justify-content-center text-start p-4"
        >
          <h5 class="mb-1">{{ name }}</h5>
          <p class="text-muted mb-2 text-xs fw-semibold">{{ position }}</p>
  
          <!-- réseaux sociaux optionnels -->
          <div v-if="socials?.length" class="mt-2">
            <a
              v-for="s in socials"
              :key="s.icon"
              :href="s.url"
              target="_blank"
              rel="noopener"
              class="btn btn-icon-only btn-sm btn-link text-primary me-1"
            >
              <i :class="s.icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  /* Props identiques à celles du kit */
  defineProps({
    img: { type: String, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    socials: {
      type: Array,
      default: () => [
        /* { icon: 'fab fa-linkedin', url: '#' } */
      ],
    },
  })
  </script>
  
  <style scoped>
  .card-profile {
    border-radius: 1rem;
  }
  </style>  