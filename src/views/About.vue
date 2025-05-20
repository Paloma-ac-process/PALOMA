<script setup>
import DefaultInfoCard     from '@/components/DefaultInfoCard.vue'
import HorizontalTeamCard  from '@/components/HorizontalTeamCard.vue'

import christophe from '@/assets/christophe.png'  
import alexandre  from '@/assets/alexandre.png'
</script>

<template>
  <!-- Bandeau titre -->
  <header class="page-header section-height-60 bg-gradient-primary">
    <div class="container py-7 text-center">
      <h2 class="text-white mb-0">Qui sommes-nous&nbsp;?</h2>
    </div>
  </header>

  <!-- Histoire / vision / valeurs -->
  <section class="py-8">
    <div class="container">
      <div class="row">
        <DefaultInfoCard class="col-md-4 mb-4"
          icon="ni ni-istanbul text-gradient text-primary"
          title="Notre histoire"
          description="Créée en 2018, A&C Process met 20 ans d’expertise matériaux & procédés au service de vos installations." />

        <DefaultInfoCard class="col-md-4 mb-4"
          icon="ni ni-world-2 text-gradient text-primary"
          title="Notre vision"
          description="Considérer le réfractaire comme un maillon d’un système global pour une optimisation complète du procédé." />

        <DefaultInfoCard class="col-md-4 mb-4"
          icon="ni ni-diamond text-gradient text-primary"
          title="Nos valeurs"
          description="Indépendance totale, objectivité et exigence technique : l’éthique avant tout." />
      </div>
    </div>
  </section>

  <!-- Équipe -->
  <section class="py-8 bg-gray-100">
    <div class="container text-center">
      <h3 class="mb-6">Notre équipe</h3>
      <div class="row">
        <HorizontalTeamCard class="col-md-6 mb-4"
          :img="christophe"
          name="Christophe PERROT"
          position="Expert matériaux" />

        <HorizontalTeamCard class="col-md-6 mb-4"
          :img="alexandre"
          name="Alexandre PERROT"
          position="Optimisation process" />
      </div>
    </div>
  </section>
</template>
