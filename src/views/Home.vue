<script setup>
/* composants du kit ------------------------------------------------- */
import DefaultInfoCard   from '@/components/DefaultInfoCard.vue'
import MaterialButton    from '@/components/MaterialButton.vue'
import LogoCarousel      from '@/components/LogoCarousel.vue'
import SplitImageSection from '@/components/SplitImageSection.vue'

/* assets ------------------------------------------------------------ */
import hero      from '@/assets/hero.png'
import vision    from '@/assets/home/vision.png'
import knowhow   from '@/assets/home/knowhow.png'
import palomaImg from '@/assets/home/paloma.png'
</script>

<template>
  <!-- HERO ---------------------------------------------------------- -->
  <header class="page-header min-vh-85 d-flex align-items-center"
          :style="{ backgroundImage: `url(${hero})` }">
    <div class="container text-center">
      <h1 class="display-2 fw-bold text-white mb-3 lh-sm">
        A&C Process<br class="d-none d-lg-block" />Our efficiency to serve yours
      </h1>
      <p class="lead text-white opacity-9 mb-4">
        Ingénierie&nbsp;&amp;&nbsp;équipements process depuis&nbsp;1995
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

  <!-- VALEURS CLÉS --------------------------------------------------- -->
  <section class="py-8">
    <div class="container">
      <div class="row g-4">
        <DefaultInfoCard class="col-md-4"
          icon="ni ni-ruler-pencil text-primary"
          title="Flexibilité"
          description="Solutions sur-mesure et réactivité pour chaque ligne de production." />

        <DefaultInfoCard class="col-md-4"
          icon="ni ni-check-bold text-primary"
          title="Éthique"
          description="Transparence, sécurité, respect strict des normes." />

        <DefaultInfoCard class="col-md-4"
          icon="ni ni-bulb-61 text-primary"
          title="Savoir-faire"
          description="30 ans d’expertise process pour booster vos performances." />
      </div>
    </div>
  </section>

  <!-- NOTRE VISION --------------------------------------------------- -->
  <SplitImageSection :img="vision" img-first alt="Four industriel en coupe">
    <template #title>Notre vision</template>
    <template #text>
      Considérer le réfractaire comme un maillon d’un&nbsp;ensemble global pour
      optimiser vos performances, vos&nbsp;coûts&nbsp;énergétiques et la
      durabilité de vos installations.
    </template>
  </SplitImageSection>

  <!-- SAVOIR-FAIRE --------------------------------------------------- -->
  <SplitImageSection :img="knowhow">
    <template #title>Notre savoir-faire</template>
    <template #text>
      <ul class="list-unstyled mb-0">
        <li>&mdash;&nbsp;Génie des procédés et science des matériaux à&nbsp;haut-T.</li>
        <li>&mdash;&nbsp;Modélisation thermo-mécanique &amp; simulation numérique.</li>
        <li>&mdash;&nbsp;Mesures in-situ, défectologie et métrologie de campagne.</li>
      </ul>
    </template>
  </SplitImageSection>

  <!-- PROJET PALOMA -------------------------------------------------- -->
  <SplitImageSection :img="palomaImg" img-first alt="Interface du projet PALOMA">
    <template #title>Projet&nbsp;PALOMA</template>
    <template #text>
      PALOMA virtualise notre expertise matériaux&nbsp;/ process pour offrir<br />
      <strong>une plateforme d’assistance intelligente</strong> :
      <ul class="mt-3">
        <li>&bull;&nbsp;Optimisation énergétique et de durabilité des fours&nbsp;HT.</li>
        <li>&bull;&nbsp;Recommandations personnalisées grâce à&nbsp;l’IA.</li>
        <li>&bull;&nbsp;Tableaux de bord temps-réel &amp;&nbsp;simulation intégrée.</li>
      </ul>
      <p class="mb-0">
        Porté par une équipe dédiée (2&nbsp;alternants ingénieurs Informatique du CESI Nancy + nos experts),
        PALOMA incarne notre ambition : <em>réduire l’empreinte carbone des
        industries à haute température</em>.
      </p>
    </template>
  </SplitImageSection>

  <!-- CAROUSEL CLIENTS ---------------------------------------------- -->
  <section class="py-8 bg-light">
    <div class="container">
      <h2 class="text-center mb-5">Ils nous font confiance</h2>
      <LogoCarousel />
    </div>
  </section>

  <!-- CTA FINAL ------------------------------------------------------ -->
  <section class="py-8 bg-gradient-primary text-white text-center">
    <div class="container">
      <h2 class="mb-4 fw-bold">Vous avez un projet&nbsp;?</h2>
      <p class="lead opacity-9 mb-5">Parlons-en dès aujourd’hui&nbsp;!</p>
      <MaterialButton color="light" size="lg" to="/contact">
        Demander un devis
      </MaterialButton>
    </div>
  </section>
</template>

<style scoped>
.page-header {
  background-size: cover;
  background-position: center;
  position: relative;
}
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  fill: #fff;
}
</style>