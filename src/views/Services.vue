<script setup>
import RotatingCard        from '@/components/RotatingCard.vue'
import RotatingCardFront   from '@/components/RotatingCardFront.vue'
import RotatingCardBack    from '@/components/RotatingCardBack.vue'
</script>

<template>
  <section class="py-8">
    <div class="container">
      <div class="row g-4">
        <div class="col-md-4">
          <RotatingCard>
            <template #front>
              <RotatingCardFront
                icon="ni ni-settings"
                title="Expertise & Défectologie"
                description="Diagnostic et analyses multi-échelles." />
            </template>
            <template #back>
              <RotatingCardBack
                title="Analyses poussées"
                description="Thermographie, LIBS, simulation numérique." />
            </template>
          </RotatingCard>
        </div>

        <!-- répète pour les deux autres services -->
      </div>
    </div>
  </section>
</template>
