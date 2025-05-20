<script setup>
/* composants existants du kit */
import DefaultInfoCard    from '@/components/DefaultInfoCard.vue'
import MaterialButton     from '@/components/MaterialButton.vue'

/* deux mini-composants utilitaires */
import LogoCarousel       from '@/components/LogoCarousel.vue'     
import SplitImageSection  from '@/components/SplitImageSection.vue'

/* assets */
import hero         from '@/assets/hero.png'
import visionImg    from '@/assets/home/vision.jpg'
import knowhowImg   from '@/assets/home/knowhow.jpg'
</script>

<template>
  <!-- HERO --------------------------------------------------------------------- -->
  <header class="page-header min-vh-85 d-flex align-items-center"
          :style="{ backgroundImage: `url(${hero})` }">
    <div class="container text-center">
      <h1 class="display-2 fw-bold text-white mb-3 lh-sm">
        A&C Process<br class="d-none d-lg-block" />Our efficiency to serve yours
      </h1>
      <p class="lead text-white opacity-9 mb-4">
        Ingénierie &amp; équipements process depuis 1995
      </p>
      <MaterialButton color="primary" size="lg" to="/contact">
        Contactez-nous
      </MaterialButton>
    </div>

    <!-- vague décorative -->
    <svg class="wave bottom-0" viewBox="0 0 1920 100" preserveAspectRatio="none">
      <path d="M0,0 C600,100 1320,0 1920,80 L1920,100 L0,100 Z" />
    </svg>
  </header>

  <!-- VALEURS CLÉS ------------------------------------------------------------- -->
  <section class="py-8">
    <div class="container">
      <div class="row g-4">
        <DefaultInfoCard class="col-md-4"
          icon="ni ni-arrows-2-minimal text-primary"
          title="Flexibilité"
          description="Solutions sur-mesure et réactivité pour chaque ligne de production." />

        <DefaultInfoCard class="col-md-4"
          icon="ni ni-shield-check text-primary"
          title="Éthique"
          description="Transparence, sécurité, respect strict des normes." />

        <DefaultInfoCard class="col-md-4"
          icon="ni ni-bulb-61 text-primary"
          title="Savoir-faire"
          description="30 ans d’expertise process pour booster vos performances." />
      </div>
    </div>
  </section>

  <!-- À PROPOS / NOTRE VISION --------------------------------------------------- -->
  <SplitImageSection :img="visionImg" img-first>
    <template #title>Notre vision</template>
    <template #text>
      Appliquée dans chacune des actions que nous réalisons, notre vision est
      de considérer les aspects réfractaires comme un&nbsp;élément d’un ensemble
      global.<br /><br />
      <strong>Objectif :</strong> optimiser vos performances, vos coûts
      énergétiques et la durabilité de vos installations.
    </template>
  </SplitImageSection>

  <!-- CAROUSEL CLIENTS --------------------------------------------------------- -->
  <section class="py-8 bg-light">
    <div class="container">
      <h2 class="text-center mb-5">Ils nous font confiance</h2>
      <LogoCarousel />
    </div>
  </section>

  <!-- SAVOIR-FAIRE ------------------------------------------------------------- -->
  <SplitImageSection :img="knowhowImg">
    <template #title>Notre savoir-faire</template>
    <template #text>
      Nos expériences croisées dans l’énergie et les matériaux nous permettent
      de répondre à&nbsp;vos besoins :<br /><br />
      &mdash; <strong>Génie des procédés</strong>, science des matériaux et tenue
      en&nbsp;service.<br />
      &mdash; Méthodes avancées de <strong>défectologie</strong>, mesures sur
      site et simulation numérique.<br />
    </template>
  </SplitImageSection>

  <!-- CTA FINAL ---------------------------------------------------------------- -->
  <section class="py-8 bg-gradient-primary text-white text-center">
    <div class="container">
      <h2 class="mb-4 fw-bold">Vous avez un projet ?</h2>
      <p class="lead opacity-9 mb-5">Parlons-en dès aujourd’hui !</p>
      <MaterialButton color="light" size="lg" to="/contact">
        Demander un devis
      </MaterialButton>
    </div>
  </section>
</template>

<style scoped>
.page-header {background-size:cover;background-position:center;position:relative;}
.wave        {position:absolute;width:100%;height:80px;fill:#fff;}
</style>
