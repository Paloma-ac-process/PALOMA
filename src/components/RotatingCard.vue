<template>
    <div class="rotating-card position-relative w-100 h-100"
         @mouseenter="hover = true"
         @mouseleave="hover = false"
         @click="hover = !hover">
      <div class="rotating-card-inner w-100 h-100" :class="{ flipped: hover }">
        <div class="rotating-card-face front">
          <slot name="front" />
        </div>
        <div class="rotating-card-face back">
          <slot name="back" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const hover = ref(false)
  </script>
  
  <style scoped>
  .rotating-card {
    perspective: 1200px;
  }
  .rotating-card-inner {
    transition: transform 0.7s;
    transform-style: preserve-3d;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .rotating-card-inner.flipped {
    transform: rotateY(180deg);
  }
  .rotating-card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 1rem;
  }
  .rotating-card-face.front {
    background: #fff;
    box-shadow: var(--bs-box-shadow);
  }
  .rotating-card-face.back {
    background: #fff;
    transform: rotateY(180deg);
    box-shadow: var(--bs-box-shadow-lg);
  }
  </style>
  