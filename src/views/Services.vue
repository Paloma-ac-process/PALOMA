<!-- src/views/Services.vue -->
<script setup>
import RotatingCard       from '@/components/RotatingCard.vue'
import RotatingCardFront  from '@/components/RotatingCardFront.vue'
import RotatingCardBack   from '@/components/RotatingCardBack.vue'
</script>

<template>
  <section class="py-8">
    <div class="container">
      <h2 class="text-center mb-6 fw-bold">Nos services</h2>

      <div class="row g-4">
        <!-- 1 ▸ Expertise & Défectologie -------------------------------- -->
        <div class="col-md-4">
          <RotatingCard>
            <template #front>
              <RotatingCardFront
                icon="ni ni-zoom-split text-primary"
                title="Expertise & Défectologie"
                description="Diagnostic multi-échelles et analyses de dégradation." />
            </template>

            <template #back>
              <RotatingCardBack
                title="Analyses poussées"
                description="Thermographie, LIBS, imagerie, simulation numérique." />
            </template>
          </RotatingCard>
        </div>

        <!-- 2 ▸ Ingénierie & Conception --------------------------------- -->
        <div class="col-md-4">
          <RotatingCard>
            <template #front>
              <RotatingCardFront
                icon="ni ni-ruler-pencil text-primary"
                title="Ingénierie & Conception"
                description="Optimisation matériaux &amp; design par simulation." />
            </template>

            <template #back>
              <RotatingCardBack
                title="Design réfractaire"
                description="Modélisation thermo-mécanique, CAO, prototypage." />
            </template>
          </RotatingCard>
        </div>

        <!-- 3 ▸ Gestion de projet & Assistance technique ---------------- -->
        <div class="col-md-4">
          <RotatingCard>
            <template #front>
              <RotatingCardFront
                icon="ni ni-briefcase-24 text-primary"
                title="Gestion de projet &amp; Assistance technique"
                description="De l’appel d’offre au suivi de mise en œuvre." />
            </template>

            <template #back>
              <RotatingCardBack
                title="Pilotage global"
                description="Planning, maîtrise d’œuvre, supervision chantier." />
            </template>
          </RotatingCard>
        </div>
      </div>
    </div>
  </section>
</template>
