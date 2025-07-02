<template>
    <!-- HERO -->
    <header class="bg-light py-5 text-center">
      <div class="container">
        <h1 class="fw-bold display-5 mb-3">Qui sommes-nous ?</h1>
        <p class="lead">
          Depuis 2018, A&C Process met 20 ans d’expertise matériaux & procédés au
          service de la performance et de la durabilité de vos installations
          industrielles.
        </p>
      </div>
    </header>
  
    <!-- NOTRE HISTOIRE -->
    <section class="about-history position-relative text-white">
      <div class="container d-flex flex-column flex-lg-row align-items-center py-8">
        <div class="w-100 w-lg-50 pe-lg-5">
          <h2 class="text-primary mb-4">Notre histoire</h2>
          <p>
            Née de la passion de deux ingénieurs pour la science des matériaux,
            A & C Process intervient sur plus de 200 sites (fours, aciéries,
            centrales thermiques) afin d’optimiser leur efficacité énergétique
            et de prolonger leur durée de vie.
          </p>
          <p>
            <strong>Plus de 20 ans d’expérience</strong> en sidérurgie et R & D
            nous ont permis de bâtir une expertise unique, alliant
            modélisation thermo-mécanique, simulation numérique et diagnostics
            in-situ.
          </p>
        </div>
        <div class="w-100 w-lg-50 mt-4 mt-lg-0">
          <img
            :src="historyImg"
            alt="Four historique"
            class="img-fluid rounded shadow-lg"
          />
        </div>
      </div>
    </section>
  
    <!-- VISION & VALEURS -->
    <section class="py-8 bg-gray-100">
      <div class="container">
        <div class="row gx-5 gy-5">
          <!-- Vision -->
          <div class="col-md-6">
            <div class="card about-card h-100">
              <div class="card-header text-center bg-white border-0">
                <h3 class="text-primary mb-0">Notre vision</h3>
              </div>
              <img :src="visionImg" alt="Vision" class="card-img-top" />
              <div class="card-body">
                <p class="mb-0">
                  Poser le réfractaire comme un maillon essentiel d’un système
                  global pour une optimisation énergétique et une réduction
                  maximale de l’empreinte carbone.
                </p>
              </div>
            </div>
          </div>
          <!-- Valeurs -->
          <div class="col-md-6">
            <div class="card about-card h-100">
              <div class="card-header text-center bg-white border-0">
                <h3 class="text-primary mb-0">Nos valeurs</h3>
              </div>
              <img :src="valuesImg" alt="Valeurs" class="card-img-top" />
              <div class="card-body">
                <ul class="mb-0">
                  <li>Indépendance totale & objectivité</li>
                  <li>Transparence & sécurité avant tout</li>
                  <li>Exigence technique & innovation continue</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <!-- NOTRE ÉQUIPE -->
    <section class="py-8">
      <div class="container text-center">
        <h2 class="fw-bold mb-6">Notre équipe</h2>
        <div class="row gx-4 gy-5 justify-content-center">
          <div
            v-for="member in team"
            :key="member.name"
            class="col-sm-8 col-md-6 col-lg-4"
          >
            <HorizontalTeamCard
              :img="member.img"
              :name="member.name"
              :position="member.position"
              class="h-100 text-center horizontal-team-card"
            >
              <template #actions>
                <a
                  :href="`mailto:${member.email}`"
                  class="btn btn-icon btn-primary me-2"
                  title="Envoyer un e-mail"
                >
                  <i class="ni ni-email-83"></i>
                </a>
                <a
                  :href="member.linkedin"
                  target="_blank"
                  rel="noopener"
                  class="btn btn-icon btn-primary"
                  title="LinkedIn"
                >
                  <i class="fab fa-linkedin"></i>
                </a>
              </template>
            </HorizontalTeamCard>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import '@fortawesome/fontawesome-free/css/all.css'
  import DefaultInfoCard     from '@/components/DefaultInfoCard.vue'
  import HorizontalTeamCard  from '@/components/HorizontalTeamCard.vue'
  import MaterialButton      from '@/components/MaterialButton.vue'
  
  import historyImg from '@/assets/home/history.png'
  import visionImg  from '@/assets/home/vision.png'
  import valuesImg  from '@/assets/home/values.png'
  import christophe from '@/assets/christophe.png'
  import alexandre  from '@/assets/alexandre.png'
  
  const team = [
    {
      img: christophe,
      name: 'Christophe PERROT',
      position: 'Expert matériaux',
      email: 'christophe.perrot@ac-process.com',
      linkedin: 'https://www.linkedin.com/in/christophe-perrot-14915737/'
    },
    {
      img: alexandre,
      name: 'Alexandre PERROT',
      position: 'Optimisation process',
      email: 'alexandre.perrot@ac-process.com',
      linkedin: 'https://www.linkedin.com/in/alexandre-perrot-94b3949a/'
    }
  ]
  </script>
  
  <style scoped>
  /* HERO */
  header.bg-light {
    background-color: #f8f9fa;
  }
  
  /* HISTOIRE */
  .about-history {
    background: #2f3438;
  }
  .about-history-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L1200 80L1200 0Z' fill='%23fff'/%3E%3C/svg%3E")
      no-repeat bottom;
    background-size: cover;
  }
  
  /* SECTION GRIS */
  .bg-gray-100 {
    background-color: #f8f9fa;
  }
  
  /* CARTES VISION / VALEURS */
  .about-card {
    border-radius: 1rem;
    box-shadow: 0 .5rem 1.2rem rgba(0, 0, 0, .1);
    overflow: hidden;
  }
  .about-card .card-img-top {
    height: 300px;
    object-fit: cover;
  }
  
  /* ÉQUIPE */
  .btn-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  .horizontal-team-card {
    transition: transform .25s ease, box-shadow .25s ease;
  }
  .horizontal-team-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 .75rem 1.5rem rgba(0, 0, 0, .15);
  }
  .horizontal-team-card img {
    border-radius: 50%;
    object-fit: cover;
    width: 120px;
    height: 120px;
  }
  </style>  