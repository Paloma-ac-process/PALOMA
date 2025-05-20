<template>
    <header class="page-header section-height-60 bg-gradient-dark">
      <div class="container py-7 text-center">
        <h2 class="text-white mb-0">Nos équipements</h2>
      </div>
    </header>
  
    <section class="py-8">
      <div class="container">
        <div class="row">
          <DefaultInfoCard
            v-for="eq in eqs"
            :key="eq.title"
            class="col-md-4 mb-4"
            :icon="eq.icon"
            :title="eq.title"
            :description="eq.desc"
          />
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import DefaultInfoCard from '@/components/DefaultInfoCard.vue'
  
  const eqs = [
    { icon:'ni ni-sound-wave text-gradient text-primary',
      title:'Centrale d’acquisition & thermocouples',
      desc:'Lecture / enregistrement en contact ou insertion dans l’épaisseur des matériaux.' },
    { icon:'ni ni-camera-compact text-gradient text-primary',
      title:'Caméras thermiques 1200 °C',
      desc:'Cartographies thermiques internes & externes sans contact.' },
    { icon:'ni ni-laptop text-gradient text-primary',
      title:'Analyseur élémentaire LIBS',
      desc:'Spectrométrie sur site de la composition des matériaux.' },
    { icon:'ni ni-ruler-pencil text-gradient text-primary',
      title:'Laser Scanner 3D',
      desc:'Cartographie 3D pour suivi des déformations et usures.' },
    { icon:'ni ni-single-copy-04 text-gradient text-primary',
      title:'CAO / Design 2D-3D',
      desc:'Conception de pièces et plans de montage sur mesure.' },
    { icon:'ni ni-planet text-gradient text-primary',
      title:'Simulation thermomécanique',
      desc:'Calculs éléments finis (QuickField™) 2D/3D : températures et contraintes.' },
  ]
  </script>
  