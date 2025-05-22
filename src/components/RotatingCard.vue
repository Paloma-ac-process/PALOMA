<!-- RotatingCard.vue -->
<template>
    <div class="rotating-card">
      <div class="rotating-card-inner">
        <div class="rotating-card-front">
          <slot name="front" />
        </div>
        <div class="rotating-card-back">
          <slot name="back" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  .rotating-card {
    perspective: 1000px;
    width: 100%;
  }
  .rotating-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  .rotating-card:hover .rotating-card-inner {
    transform: rotateY(180deg);
  }
  .rotating-card-front,
  .rotating-card-back {
    position: absolute;
    width: 100%;
    backface-visibility: hidden;
  }
  .rotating-card-front {
    z-index: 2;
  }
  .rotating-card-back {
    transform: rotateY(180deg);
  }
  </style>
  