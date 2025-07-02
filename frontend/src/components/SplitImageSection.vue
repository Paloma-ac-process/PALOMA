<!-- src/components/SplitImageSection.vue -->
<template>
    <section class="py-8">
      <div class="container">
        <div class="row align-items-center g-5">
  
          <!-- image -->
          <div class="col-lg-5" :class="imgFirst ? 'order-lg-1' : 'order-lg-2'">
            <img :src="img" class="w-100 rounded-4 shadow-lg" :alt="alt" />
          </div>
  
          <!-- texte -->
          <div class="col-lg-7" :class="imgFirst ? 'order-lg-2' : 'order-lg-1'">
            <h2 class="mb-4 fw-bold">
              <slot name="title" />
            </h2>
            <p class="lead mb-0">
              <slot name="text" />
            </p>
          </div>
  
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  defineProps({
    img: { type: String, required: true },
    imgFirst: { type: Boolean, default: false },
    alt: { type: String, default: 'Image descriptive' }
  })
  </script>
  