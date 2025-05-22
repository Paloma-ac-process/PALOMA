<script setup>
import { onMounted } from 'vue'
import DefaultInfoCard     from '@/components/DefaultInfoCard.vue'
import MaterialButton      from '@/components/MaterialButton.vue'
import LogoCarousel        from '@/components/LogoCarousel.vue'
import SplitImageSection   from '@/components/SplitImageSection.vue'
import TestimonialCarousel from '@/components/TestimonialCarousel.vue'
import VisionCarousel      from '@/components/VisionCarousel.vue'
import { Motion }          from '@motionone/vue'

import hero            from '@/assets/hero.png'
import vision          from '@/assets/home/vision.png'
import palomaImg       from '@/assets/home/paloma.png'
import savoirfaireImg  from '@/assets/home/savoirfaire.png'

import AOS from 'aos'
import 'aos/dist/aos.css'
onMounted(() => AOS.init({ once: true, duration: 700 }))

const cards = [
  {
    icon: 'ni ni-ruler-pencil text-primary',
    title: 'Flexibilité',
    description: 'Solutions sur-mesure et réactivité pour chaque ligne.'
  },
  {
    icon: 'ni ni-check-bold text-primary',
    title: 'Éthique',
    description: 'Transparence, sécurité, respect strict des normes.'
  },
  {
    icon: 'ni ni-bulb-61 text-primary',
    title: 'Savoir-faire',
    description: '30 ans d’expertise process pour booster vos performances.'
  }
]
</script>

<template>
  <!-- HERO -->
  <header
    class="page-header min-vh-85 d-flex align-items-center"
    :style="{ backgroundImage: `url(${hero})` }"
  >
    <div class="container text-center">
      <h1 class="display-2 fw-bold text-white mb-3 lh-sm" data-aos="fade-down">
        A&C Process<br class="d-none d-lg-block" />
        Our efficiency to serve yours
      </h1>
      <p
        class="lead text-white opacity-9 mb-4"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        Ingénierie&nbsp;&amp;&nbsp;équipements process depuis 1995
      </p>
      <MaterialButton
        to="/contact"
        color="primary"
        size="lg"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        Contactez-nous
      </MaterialButton>
    </div>
    <svg class="wave bottom-0" viewBox="0 0 1920 100" preserveAspectRatio="none">
      <path d="M0,0 C600,100 1320,0 1920,80 L1920,100 L0,100 Z"/>
    </svg>
  </header>

  <!-- VALEURS CLÉS -->
  <section class="py-6 bg-light">
    <div class="container">
      <div class="row g-4">
        <Motion
          v-for="(card, i) in cards"
          :key="card.title"
          tag="div"
          class="col-md-4"
          :initial="{ opacity: 0, y: 40 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: .6, delay: i * .1 }"
          viewport="{ once: true }"
        >
          <DefaultInfoCard v-bind="card" />
        </Motion>
      </div>
    </div>
  </section>

  <!-- NOTRE VISION -->
  <section class="py-6 bg-light">
    <div class="container">
      <div class="d-flex flex-column flex-lg-row align-items-center gap-4">
        <div class="w-100 w-lg-50">
          <VisionCarousel />
        </div>
        <div class="w-100 w-lg-50 px-2 px-lg-4">
          <h2 class="fw-bold text-primary mb-3">Notre vision</h2>
          <p class="mb-3 text-muted">
            Appliquée dans chacune des actions que nous réalisons, peu importe le domaine d’activité du client.
          </p>
          <p class="mb-0 text-muted">
            Notre vision est de considérer les aspects réfractaires de la filière comme un élément d’un ensemble, qui n’a d’intérêt que dans un contexte global.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- NOTRE SAVOIR-FAIRE -->
  <section class="py-6 bg-light" data-aos="fade-left">
    <div class="container">
      <div class="d-flex flex-column flex-lg-row align-items-center gap-4">
        <div class="w-100 w-lg-50">
          <img
            :src="savoirfaireImg"
            alt="Illustration savoir-faire"
            class="img-fluid rounded shadow"
          />
        </div>
        <div class="w-100 w-lg-50 px-2 px-lg-4">
          <h2 class="fw-bold text-primary mb-3">Notre savoir-faire</h2>
          <p class="text-muted mb-3">
            Nos expériences croisées dans tous les secteurs de l’industrie de l’énergie et des matériaux, nous permettent de répondre à l’intégralité de vos besoins.
          </p>
          <p class="text-muted mb-3">
            Notre grande finesse d’analyse et compréhension s’appuie sur :
          </p>
          <ul class="text-muted">
            <li class="mb-2">des compétences en génie des procédés, science des matériaux et leur tenue en service.</li>
            <li>des méthodes perfectionnées en analyse de systèmes complexes, défectologie et mesures sur site.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- SPLIT PALOMA -->
<SplitImageSection
  :img="palomaImg"
  img-first
  alt="Interface PALOMA"
  data-aos="fade-right"
>
  <template #title>Projet&nbsp;PALOMA</template>

  <template #text>
    PALOMA virtualise notre expertise matériaux / process pour offrir<br/>
    <strong>une plateforme d’assistance intelligente</strong> :
    <ul class="mt-3">
      <li>Optimisation énergétique et de durabilité des fours HT.</li>
      <li>Recommandations personnalisées grâce à&nbsp;l’IA.</li>
      <li>Tableaux de bord temps-réel &amp; simulation intégrée.</li>
    </ul>
    <p class="mb-4">
      Porté par une équipe dédiée (nos 2 apprentis ingénieurs Théo et Mark + nos experts),
      PALOMA vise à <em>réduire l’empreinte carbone</em> des industries haute température.
    </p>

    <!-- BOUTON « Découvrir les applications » -->
    <div class="mt-4">
      <MaterialButton
        :to="{ name: 'PalomaApps' }"
        color="primary"
        size="lg"
      >
        Découvrir les applications&nbsp;➜
      </MaterialButton>
    </div>
  </template>
</SplitImageSection>

  <!-- TÉMOIGNAGES -->
  <section class="py-6 bg-white" data-aos="zoom-in">
    <div class="container">
      <TestimonialCarousel />
    </div>
  </section>

  <!-- PARTENAIRES -->
  <section class="py-6 bg-light">
    <div class="container" data-aos="fade-up">
      <h2 class="text-center fw-bold text-primary mb-3">Ils nous font confiance</h2>
      <LogoCarousel />
    </div>
  </section>

  <!-- CTA FINAL -->
  <section class="py-6 bg-gradient-primary text-white text-center">
    <div class="container" data-aos="zoom-in">
      <h2 class="mb-3 fw-bold">Vous avez un projet&nbsp;?</h2>
      <p class="lead opacity-9 mb-4">Parlons-en dès aujourd’hui&nbsp;!</p>
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
  background-attachment: fixed;
  animation: heroZoom 14s ease-in-out infinite alternate;
}
@keyframes heroZoom {
  0% { background-size: 105%; }
  100% { background-size: 112%; }
}
.wave {
  position: absolute;
  width: 100%;
  height: 60px;
  fill: #f8f9fa;
  z-index: 1;
}
</style>
